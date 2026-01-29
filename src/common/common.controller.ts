import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  toHumanReadableBytes,
  toHumanReadableUptime,
} from './utils/formatters';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Controller()
export class CommonController {
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
}
