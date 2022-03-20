import {EmailData} from './model/EmailData';

export interface MailConfig {
  provider?: string;
  from: EmailData;
  key: string;
  smtp?: SmtpConfig;
}
export interface Address {
  name: string;
  address: string;
}
export interface SmtpConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}
