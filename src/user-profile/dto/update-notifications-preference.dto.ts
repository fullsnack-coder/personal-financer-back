import { IsBoolean } from 'class-validator';

export default class UpdateNotificationsPreferenceDTO {
  @IsBoolean()
  enableNotifications: boolean;
}
