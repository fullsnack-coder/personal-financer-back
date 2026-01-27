import { Controller, Get } from '@nestjs/common';
import {
  toHumanReadableBytes,
  toHumanReadableUptime,
} from './common/utils/formatters';

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
}
