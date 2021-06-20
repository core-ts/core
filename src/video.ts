export interface Item extends Title, LocalizedTitle, BaseThumbnail, BaseChannel {
  id: string;
  kind?: string;
}
export interface Playlist extends Item {
  itemCount: number;
}
export interface BasePlaylistItem {
  playlistId?: string;
  position?: number;
  videoOwnerChannelId?: string;
  videoOwnerChannelTitle?: string;
}
export interface PlaylistVideo extends Item, BasePlaylistItem {
}
export interface BaseVideo {
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}
export interface Video extends Item, VideoDetail, BaseVideo {
  url?: string;
  videoOwnerChannelId?: string;
  videoOwnerChannelTitle?: string;
}
export interface VideoDetail {
  duration: number;
  dimension: string;
  definition: number; // 0: 144, 1: 240, 2: 360, 3: 480, 4: 720, 5: 1080, 6: 1440, 7: 2160
  caption: boolean;
  licensedContent: boolean;
  projection: string;
}
export interface BaseThumbnail {
  thumbnail?: string;
  mediumThumbnail?: string;
  highThumbnail?: string;
  standardThumbnail?: string;
  maxresThumbnail?: string;
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
  title?: string;
  description?: string;
  publishedAt?: Date;
}
export interface LocalizedTitle {
  localizedTitle?: string;
  localizedDescription?: string;
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
  definition: string;
  caption: string;
  licensedContent: boolean;
  projection: string;
}
export interface BaseSnippet extends Title, BaseChannel {
  thumbnails: Thumbnails;
  localized: Title;
}
export interface PlaylistSnippet extends BaseSnippet {
  itemCount: number;
}
export interface YoutubeKind {
  kind: string;
}
export interface ResourceId extends YoutubeKind {
  videoId: string;
}
export interface PlaylistVideoSnippet extends BasePlaylistItem, BaseSnippet {
  resourceId: ResourceId;
}
export interface VideoSnippet extends BaseSnippet, BaseVideo {
}
export interface ListResult<T> extends YoutubeKind {
  etag: string;
  items: T[];
  pageInfo: PageInfo;
}
export interface ListItem<T, D> extends YoutubeKind {
  id: string;
  etag?: string;
  snippet?: T;
  contentDetails: D;
}
