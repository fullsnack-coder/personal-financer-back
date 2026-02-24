import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  toHumanReadableBytes,
  toHumanReadableUptime,
} from './utils/formatters';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { StatisticsService } from './services/statistics.service';
import { SearchStatisticDto } from './dto/search-statistic.dto';
import { CurrentSession } from '@/auth/decorators/current-session.decorator';
import type { SessionPayload } from '@/types/auth';
import { AccountsService } from '@/accounts/accounts.service';
import SQSService from './services/sqs.service';
import { ConfigService } from '@nestjs/config';
import { AutomatedTasksGuard } from './guards/automated-tasks.guard';

@Controller()
export class CommonController {
  constructor(
    private readonly statisticsService: StatisticsService,
    private readonly accountsService: AccountsService,
    private readonly sqsService: SQSService,
    private readonly configService: ConfigService,
  ) {}

  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      memoryUsage: {
        rss: toHumanReadableBytes(process.memoryUsage().rss),
        heapTotal: toHumanReadableBytes(process.memoryUsage().heapTotal),
        heapUsed: toHumanReadableBytes(process.memoryUsage().heapUsed),
        external: toHumanReadableBytes(process.memoryUsage().external),
        arrayBuffers: toHumanReadableBytes(process.memoryUsage().arrayBuffers),
      },
      uptime: toHumanReadableUptime(process.uptime()),
    };
  }

  @Get('available-currencies')
  @UseGuards(AuthGuard)
  getAvailableCurrencies() {
    return {
      currencies: [
        {
          code: 'USD',
        },
        {
          code: 'PEN',
        },
      ],
    };
  }

  @Get('statistics')
  @UseGuards(AuthGuard)
  async getStatistics(
    @Query() searchStatisticsDto: SearchStatisticDto,
    @CurrentSession() { id: userId }: SessionPayload,
  ) {
    const expensesIncome = await this.statisticsService.getExpensesIncome(
      searchStatisticsDto,
      userId,
    );

    return {
      expensesIncome,
    };
  }

  @Post('daily-reminder')
  @UseGuards(AutomatedTasksGuard)
  async sendDailyReminder() {
    const users =
      await this.accountsService.findUsersWithPushNotificationsEnabled();

    const userIds = users.map((user) => user.id);

    const notificationsQueueUrl = this.configService.get<string>(
      'AWS_SQS_NOTIFICATIONS_QUEUE_URL',
    );

    await this.sqsService.sendMessage(
      notificationsQueueUrl as string,
      JSON.stringify({ userIds }),
    );

    return {
      message: 'Daily reminder notifications have been queued successfully',
    };
  }
}
