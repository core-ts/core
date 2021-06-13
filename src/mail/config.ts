import {MailData} from './model/MailData';

export interface SendGridConfig {
  from: MailData;
  key: string;
}
