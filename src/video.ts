export interface Video extends Title, VideoDetail {
  id: string;
}
export interface VideoDetail {
  duration: number;
  dimension: string;
  caption: boolean;
  licensedContent: boolean;
  projection: number;
}
export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}
export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}
export interface Title {
  title: string;
  description: string;
  publishedAt: Date;
}
export interface BaseChannel {
  channelId?: string;
  channelTitle?: string;
}
export interface ListDetail {
  itemCount: number;
}
export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}
export interface VideoItemDetail {
  videoId: string;
  videoPublishedAt: Date;
}
export interface YoutubeVideoDetail {
  duration: string;
  dimension: string;
  caption: string;
  licensedContent: boolean;
  projection: string;
}
export interface YoutubeItem {
  kind: string;
}
export interface ResourceId extends YoutubeItem {
  videoId: string;
}
export interface YoutubePlaylistItem extends Title, BaseChannel {
  playlistId?: string;
  position?: number;
  resourceId: ResourceId;
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
}
export interface YoutubePlaylist extends Title, BaseChannel {
  localized?: Title;
}
export interface ListResult<T> extends YoutubeItem {
  etag: string;
  items: T[];
  pageInfo: PageInfo;
}
export interface ListItem<T, D> extends YoutubeItem {
  etag: string;
  id: string;
  snippet: T;
  contentDetails: D;
}
