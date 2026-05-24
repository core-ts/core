import {DateRange, Filter, NumberRange} from './model';

export interface Article {
  id: string
  slug: string
  title: string
  description?: string
  content?: string
  publishedAt?: Date
  tags?: string[]
  thumbnail?: string
  status?: string
  createdAt?: Date
  authorId?: string
  savedAt?: Date
}
export interface ArticleFilter extends Filter {
  id?: string;
  title?: string;
  type?: string;
  tags?: string[];
  status?: string[]|string;
}

export interface Location {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  status?: string;
  imageURL?: string;
  latitude?: number;
  longitude?: number;
  customURL?: string;
  info?: LocationInfo;
}
export interface LocationInfo {
  id?: string;
  viewCount: number;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}
export interface LocationFilter extends Filter {
  id?: string;
  name?: string;
  type?: string;
  status?: string[]|string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export interface Event {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  status?: string;
  imageURL?: string;
  startTime?: Date;
  endTime?: Date;
  latitude?: number;
  longitude?: number;
  customURL?: string;
  locationId?: string;
}
export interface EventFilter extends Filter {
  id?: string;
  name?: string;
  type?: string;
  status?: string[]|string;
  startTime?: Date|DateRange;
  endTime?: Date|DateRange;
  latitude?: number;
  longitude?: number;
  locationId?: string[]|string;
}

export interface Bookable {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  status?: string;
  imageURL?: string;
  customURL?: string;
  capacity?: number;
  locationId?: string;
}
export interface BookableFilter extends Filter {
  id?: string;
  name?: string;
  type?: string;
  status?: string[]|string;
  capacity?: number|NumberRange;
  locationId?: string[]|string;
}

export interface Booking {
  bookingId?: string;
  id?: string;
  userId?: string;
  name?: string;
  type?: string;
  description?: string;
  subject: string;
  startTime: Date;
  endTime: Date;
  status?: string;
}
export interface BookingFilter extends Filter {
  bookingId?: string;
  id?: string;
  userId?: string;
  name?: string;
  type?: string;
  description?: string;
  subject?: string;
  startTime?: Date|DateRange;
  endTime?: Date|DateRange;
  status?: string;
}

export interface Tour {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  status?: string;
  imageURL?: string;
  startTime?: Date;
  endTime?: Date;
  locations: string[]|Location[];
  customURL?: string;
}
export interface TourFilter extends Filter {
  id?: string;
  name?: string;
  type?: string;
  status?: string[]|string;
  startTime?: Date|DateRange;
  endTime?: Date|DateRange;
  locations?: string[];
}
export interface Rate {
  id: string;
  locationId: string;
  rateTime: Date;
  userId: string;
  rate: number;
  review: string;
  version?: number;
}
