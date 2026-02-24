import { IsString } from 'class-validator';

export default class RegisterDeviceDTO {
  @IsString()
  deviceToken: string;
}
