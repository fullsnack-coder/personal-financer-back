import { Controller, Get } from '@nestjs/common';

@Controller()
export class CommonController {
  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}
