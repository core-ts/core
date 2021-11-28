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
export interface Producer<T, R, ID> {
  produce(data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Publisher<T, R, ID> {
  publish(data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Sender<T, R, ID> {
  send(data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Writer<T, R, ID> {
  write(data: T, attributes?: StringMap, id?: ID): Promise<R>;
}

export interface Producer<T, R, ID> {
  produce(to: string, data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Publisher<T, R, ID> {
  publish(to: string, data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Sender<T, R, ID> {
  send(to: string, data: T, attributes?: StringMap, id?: ID): Promise<R>;
}
export interface Writer<T, R, ID> {
  write(to: string, data: T, attributes?: StringMap, id?: ID): Promise<R>;
}

export interface SimpleConsumer<T, R> {
  consume(handle: (data: T, attributes?: StringMap, raw?: R) => Promise<number>): void;
}
export interface SimpleSubscriber<T, R> {
  subscribe(handle: (data: T, attributes?: StringMap, raw?: R) => Promise<number>): void;
}
export interface SimpleReceiver<T, R> {
  receive(handle: (data: T, attributes?: StringMap, raw?: R) => Promise<number>): void;
}
export interface SimpleReader<T, R> {
  read(handle: (data: T, attributes?: StringMap, raw?: R) => Promise<number>): void;
}

export interface MessageConsumer<T, ID, R> {
  consume(data: Message<T, ID, R>): void;
}
export interface MessageSubscriber<T, ID, R> {
  subscribe(handle: (data: Message<T, ID, R>) => Promise<number>): void;
}
export interface MessageReceiver<T, ID, R> {
  receive(handle: (data: Message<T, ID, R>) => Promise<number>): void;
}
export interface MessageReader<T, ID, R> {
  read(handle: (data: Message<T, ID, R>) => Promise<number>): void;
}
