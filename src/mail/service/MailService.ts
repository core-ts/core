import {MailData} from '../model/MailData';

export interface MailService {
  sendMail(mail: MailData): Promise<boolean>;
}
