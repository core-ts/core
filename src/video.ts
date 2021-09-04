export interface ListResult<T> {
  list?: T[];
  total?: number;
  limit?: number;
  nextPageToken?: string;
}
export interface ChannelSM {
  keyword?: string;
  order?: string; // date, rating, relevance, title, videoCount (for channels), viewCount (for live broadcast)
  nextPageToken?: string;
  forMine?: boolean;
  channelId?: string;
  channelType?: string; // any, show
  publishedAfter?: Date;
  publishedBefore?: Date;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string; // moderate, none, strict
  topicId?: string;
}
export interface PlaylistSM {
  keyword?: string;
  order?: string; // date, rating, relevance, title, videoCount (for channels), viewCount (for live broadcast)
  nextPageToken?: string;
  forMine?: boolean;
  channelId?: string;
  channelType?: string; // any, show
  publishedAfter?: Date;
  publishedBefore?: Date;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string; // moderate, none, strict
}
export interface ItemSM {
  keyword?: string;
  type?: string; // video, channel, playlist
  videoDuration?: string; // any, long (more than 20 minutes), medium (from 4 minutes to 20 minutes), short (less than 4 minutes)
  order?: string; // date, rating, relevance, title, videoCount (for channels), viewCount (for live broadcast)
  nextPageToken?: string;
  relatedToVideoId?: string;
  forMine?: boolean;
  channelId?: string;
  channelType?: string; // any, show
  eventType?: string; // completed, live, upcoming
  publishedAfter?: Date;
  publishedBefore?: Date;
  regionCode?: string;
  relevanceLanguage?: string;
  safeSearch?: string; // moderate, none, strict
  topicId?: string;
  videoCaption?: string; // any, closedCaption, none
  videoCategoryId?: string;
  videoDefinition?: string; // any, high, standard
  videoDimension?: string; // 2d, 3d, any
  videoEmbeddable?: string; // any, true
  videoLicense?: string; // any, creativeCommon, youtube
  videoSyndicated?: string; // any, true
  videoType?: string; // any, episode, movie
}
export interface Item extends Title, Thumbnail, ChannelInfo {
  kind?: string; // video, channel, playlist
  id?: string;
  liveBroadcastContent?: string; // upcoming, live, none
  publishTime: Date;
}
export interface ItemInfo extends Title, Thumbnail, ChannelInfo, LocalizedTitle {
  kind?: string;
  id?: string;
}
export interface VideoCategory {
  id: string;
  title: string;
  assignable?: boolean;
  channelId?: string;
}
export interface Channel extends ItemInfo {
  customUrl?: string;
  country?: string;
  likes?: string;
  favorites?: string;
  uploads?: string;
  timestamp?: Date;
  count?: number;
  itemCount?: number;
  playlistCount?: number;
  playlistItemCount?: number;
  playlistVideoCount?: number;
  playlistVideoItemCount?: number;
}
export interface Playlist extends ItemInfo, BigThumbnail {
  count?: number;
  itemCount?: number;
}
export interface PlaylistItemInfo {
  playlistId?: string;
  position?: number;
  videoOwnerChannelId?: string;
  videoOwnerChannelTitle?: string;
}
export interface PlaylistVideo extends ItemInfo, BigThumbnail, PlaylistItemInfo {
}
export interface VideoInfo {
  tags?: string[];
  categoryId?: string;
  liveBroadcastContent?: string;
  defaultLanguage?: string;
  defaultAudioLanguage?: string;
}
export interface Video extends ItemInfo, BigThumbnail, VideoDetail, VideoInfo {
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
export interface Thumbnail {
  thumbnail?: string;
  mediumThumbnail?: string;
  highThumbnail?: string;
}
export interface BigThumbnail {
  standardThumbnail?: string;
  maxresThumbnail?: string;
}
export interface ThumbnailInfo {
  url: string;
  width: number;
  height: number;
}
export interface Thumbnails {
  default: ThumbnailInfo;
  medium: ThumbnailInfo;
  high: ThumbnailInfo;
  standard?: ThumbnailInfo;
  maxres?: ThumbnailInfo;
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
export interface ChannelInfo {
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
export interface ChannelDetail {
  relatedPlaylists: RelatedPlaylists;
}
export interface RelatedPlaylists {
  likes?: string;
  favorites?: string;
  uploads?: string;
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
export interface BaseSnippet extends Title, ChannelInfo {
  thumbnails: Thumbnails;
  localized: Title;
}
export interface SearchSnippet extends Title, ChannelInfo {
  thumbnails: Thumbnails;
  liveBroadcastContent?: string;
  publishTime?: Date;
}
export interface SearchId {
  kind?: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}
export interface PlaylistSnippet extends BaseSnippet {
  itemCount: number;
}
export interface ChannelSnippet extends Title, BaseSnippet {
  customUrl?: string;
  country?: string;
}
export interface YoutubeKind {
  kind: string;
}
export interface ResourceId extends YoutubeKind {
  videoId: string;
}
export interface PlaylistVideoSnippet extends PlaylistItemInfo, BaseSnippet {
  resourceId: ResourceId;
}
export interface VideoSnippet extends BaseSnippet, VideoInfo {
}
export interface YoutubeListResult<T> extends YoutubeKind {
  etag: string;
  items: T[];
  pageInfo: PageInfo;
  nextPageToken?: string;
}
export interface ListItem<ID, T, D> extends YoutubeKind {
  id: ID;
  etag?: string;
  snippet?: T;
  contentDetails?: D;
}
export interface CategorySnippet {
  title: string;
  assignable: boolean;
  channelId: string;
}

export interface TopLevelCommentSnippet {
  videoId: string;
  topLevelComment: TopLevelComment;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
}
export interface TopLevelComment {
  kind: string;
  etag: string;
  id: string;
  snippet: TopLevelCommentSubSnippet;
}
export interface TopLevelCommentSubSnippet extends CommentInfo, YoutubeAuthor {
  videoId: string;
}

export interface CommentThead extends Author, CommentInfo {
  videoId: string;
  canReply: boolean;
  totalReplyCount: number;
  isPublic: boolean;
  nextPageToken?: string;
}

export interface Comment extends Author, CommentInfo {
  parentId: string;
}
export interface AuthorChannelId {
  value: string;
}
export interface AuthorInfo {
  authorDisplayName: string;
  authorChannelUrl: string;
  authorProfileImageUrl: string;
}
export interface Author extends AuthorInfo {
  authorChannelId: string;
}
export interface YoutubeAuthor extends AuthorInfo {
  authorChannelId: AuthorChannelId;
}
export interface CommentInfo {
  id: string;
  textDisplay: string;
  textOriginal: string;
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: Date;
  updatedAt: Date;
}
export interface CommentSnippet extends CommentInfo, YoutubeAuthor {
  parentId: string;
}

export interface ChannelSync {
  id: string;
  uploads?: string;
  timestamp?: Date;
  level?: number;
}
export interface PlaylistCollection {
  id: string;
  videos: string[];
}
export interface SyncRepository {
  getChannelSync(channelId: string): Promise<ChannelSync>;
  saveChannel(channel: Channel): Promise<number>;
  savePlaylist(playlist: Playlist): Promise<number>;
  savePlaylists(playlist: Playlist[]): Promise<number>;
  saveChannelSync(channel: ChannelSync): Promise<number>;
  saveVideos(videos: Video[]): Promise<number>;
  savePlaylistVideos(playlistId: string, videos: string[]): Promise<number>;
  getVideoIds(id: string[]): Promise<string[]>;
}
export interface SyncClient {
  getChannel(id: string): Promise<Channel>;
  getPlaylist(id: string): Promise<Playlist>;
  getChannelPlaylists(channelId: string, max?: number, nextPageToken?: string): Promise<ListResult<Playlist>>;
  getPlaylistVideos(playlistId: string, max?: number, nextPageToken?: string): Promise<ListResult<PlaylistVideo>>;
  getVideos(ids: string[], noSnippet?: boolean): Promise<Video[]>;
}
export interface SyncService {
  syncChannel(channelId: string): Promise<number>;
  syncChannels(channelIds: string[]): Promise<number>;
  syncPlaylist(playlistId: string, level?: number): Promise<number>;
  syncPlaylists(playlistIds: string[], level?: number): Promise<number>;
}

export interface VideoService {
  getCagetories(regionCode?: string): Promise<VideoCategory[]>;
  getChannels(ids: string[]): Promise<Channel[]>;
  getChannel(id: string): Promise<Channel>;
  getChannelPlaylists(channelId: string, max?: number, nextPageToken?: string): Promise<ListResult<Playlist>>;
  getPlaylists(ids: string[]): Promise<Playlist[]>;
  getPlaylist(id: string): Promise<Playlist>;
  getChannelVideos(channelId: string, max?: number, nextPageToken?: string): Promise<ListResult<PlaylistVideo>>;
  getPlaylistVideos(playlistId: string, max?: number, nextPageToken?: string): Promise<ListResult<PlaylistVideo>>;
  getPopularVideos(regionCode?: string, videoCategoryId?: string, max?: number, nextPageToken?: string): Promise<ListResult<Video>>;
  getPopularVideosByRegion(regionCode?: string, max?: number, nextPageToken?: string): Promise<ListResult<Video>>;
  getPopularVideosByCategory(videoCategoryId?: string, max?: number, nextPageToken?: string): Promise<ListResult<Video>>;
  getVideos(ids: string[], noSnippet?: boolean): Promise<Video[]>;
  getVideo(id: string, noSnippet?: boolean): Promise<Video>;
  search(sm: ItemSM, max?: number, nextPageToken?: string|number): Promise<ListResult<Item>>;
  getRelatedVideos?(videoId: string, max?: number, nextPageToken?: string): Promise<ListResult<Item>>;
  searchVideos?(sm: ItemSM, max?: number, nextPageToken?: string|number): Promise<ListResult<Item>>;
  searchPlaylists?(sm: PlaylistSM, max?: number, nextPageToken?: string|number): Promise<ListResult<Playlist>>;
  searchChannels?(sm: ChannelSM, max?: number, nextPageToken?: string|number): Promise<ListResult<Channel>>;
  /**
   * @param videoId
   * @param order relevance, time (default)
   * @param nextPageToken
   */
  getCommentThreads?(videoId: string, order?: string, max?: number, nextPageToken?: string): Promise<ListResult<CommentThead>>;
  getComments?(id: string, max?: number, nextPageToken?: string): Promise<ListResult<Comment>>;
}
export interface CacheItem<T> {
  item: T;
  timestamp: Date;
}
export interface Cache<T> {
  [key: string]: CacheItem<T>;
}
