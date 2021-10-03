interface StringMap {
  [key: string]: string;
}
export interface Message<T, ID, R> {
  id?: ID;
  data?: T;
  attributes?: StringMap;
  timestamp?: Date;
  raw?: R;
}
export interface Publisher<T, ID> {
  publish(data: T, attributes?: StringMap, id?: ID): Promise<boolean|void>;
}
export interface Sender<T, ID> {
  send(data: T, attributes?: StringMap, id?: ID): Promise<boolean|void>;
}
export interface Writer<T, ID> {
  write(data: T, attributes?: StringMap, id?: ID): Promise<boolean|void>;
}

export interface SimpleSubscriber<T> {
  subscribe(data: T, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface Subscriber<T, ID, R> {
  subscribe(data: Message<T, ID, R>, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface SimpleConsumer<T> {
  consume(data: T, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface Consumer<T, ID, R> {
  consume(data: Message<T, ID, R>, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface SimpleReader<T> {
  read(data: T, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface Consumer<T, ID, R> {
  read(data: Message<T, ID, R>, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface SimpleReceiver<T> {
  receive(data: T, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
export interface Receiver<T, ID, R> {
  receive(data: Message<T, ID, R>, attributes?: StringMap, err?: any): Promise<boolean|void>;
}
