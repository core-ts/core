import {MailData} from '../model/MailData';

export interface MailService {
  send(mail: MailData): Promise<boolean>;
}
