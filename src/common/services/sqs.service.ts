import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class SQSService {
  private readonly sqsClient: SQSClient;
  constructor(private readonly configService: ConfigService) {
    this.sqsClient = new SQSClient({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  sendMessage(queueUrl: string, messageBody: string) {
    const sendMessageCommand = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    });

    return this.sqsClient.send(sendMessageCommand);
  }
}
