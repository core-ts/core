export interface Article {
  id?: string;
  title?: string;
  description?: string;
  body?: string;
  tags?: string[];
  status?: string;
}
export interface Location {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  longitude?: number;
  latitude?: number;
  imageURL?: string;
  customUrl?: string;
  info?: LocationInfo;
}
export interface LocationInfo {
  id?: string; // locationID
  viewCount: number;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}
export interface Event {
  id?: string;
  name?: string;
  type?: string;
  startTime: Date;
  endTime: Date;
  longitude?: number;
  latitude?: number;
  locationId?: string;
}
export interface Bookable {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  capacity?: number;
  imageURL?: string;
  locationId?: string;
}
export interface Booking {
  bookingId: string;
  userId: string;
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  status?: string;
}
