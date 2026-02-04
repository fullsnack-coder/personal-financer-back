import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  toHumanReadableBytes,
  toHumanReadableUptime,
} from './utils/formatters';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { StatisticsService } from './services/statistics.service';
import { SearchStatisticDto } from './dto/search-statistic.dto';
import { CurrentSession } from '@/auth/decorators/current-session.decorator';
import type { SessionPayload } from '@/types/auth';

@Controller()
export class CommonController {
  constructor(private statisticsService: StatisticsService) {}

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
}
