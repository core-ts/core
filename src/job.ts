import { DateRange, Filter, SearchResult, TimeRange } from "./model";

export interface Attachment {
  originalFilename: string;
  filename: string;
  url: string;
  size: number;
}

export interface Article {
  id: string
  slug: string
  title: string
  description?: string
  publishedAt?: Date
  tags?: string[]
  thumbnail?: string
  status?: string
  createdAt?: Date
  authorId?: string
  savedAt?: Date
}
export interface ArticleFilter extends Filter {
  id?: string
  slug?: string
  title?: string
  description?: string
  status?: string
  publishedAt: TimeRange
  tags?: string[]
  authorId?: string
  userId?: string
  isSaved?: boolean
}
export interface ArticleRepository {
  search(filter: ArticleFilter, limit: number, page?: number, fields?: string[]): Promise<SearchResult<Article>>
  load(slug: string, userId?: string): Promise<Article | null>
  getIdBySlug(slug: string): Promise<string>
}

export interface Achievement {
  subject: string;
  description: string;
}
export interface Skill {
  skill: string;
  hirable: boolean;
}
export interface UserFilter extends Filter {
  userId?: string;
  username?: string;
  email?: string;
  displayName?: string;
  dateOfBirth?: DateRange;
  status?: string[]|string;
  interests?: string[];
  skills?: Skill[];
  achievements?: Achievement[];
}
export interface RoleFilter extends Filter {
  roleId?: string;
  roleName?: string;
  status?: string[]|string;
  remark?: string;
  description?: string;
}

export interface ReviewComment {
  commentId: string;
  id: string;
  author: string;
  userId: string;
  comment: string;
  time: Date;
  updatedAt?: Date;
  histories?: ShortComment[];
  userURL?: string;
  authorURL?: string;
}
export interface ShortComment {
  comment: string;
  time: Date;
}

export interface ReviewCommentFilter extends Filter {
  commentId?: string;
  id?: string;
  author?: string;
  userId?: string;
  comment?: string;
  time?: DateRange;
  updatedAt?: DateRange;
}
export interface Info {
  id: string;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  count: number;
  score: number;
}
export interface Info10 {
  id: string;
  rate: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  rate6: number;
  rate7: number;
  rate8: number;
  rate9: number;
  rate10: number;
  count: number;
  score: number;
}
export interface InfoRepository<ID> {
  exist(id: ID, ctx?: any): Promise<boolean>;
}

export interface Company {
  id: string
  slug: string
  name: string
  overview: string
  website?: string
  industry?: string
  size?: string
  logo?: string
  coverURL?: string
  status: string

  followerCount?: number
  followingAt?: Date
  followedAt?: Date
}

export interface Job {
  id: string
  slug: string
  title: string
  description: string
  publishedAt?: Date
  expiredAt?: Date
  position?: string
  quantity?: number
  location?: string
  applicantCount?: number
  skills?: string[]
  minSalary?: number
  maxSalary?: number
  companyId?: string
  status: string
}
export interface JobFilter extends Filter {
  id?: string
  slug?: string
  title?: string
  description?: string
  publishedAt?: TimeRange
  expiredAt?: TimeRange
  skills?: string[]
  location?: string
  quantity?: number
  applicantCount?: number
  companyId?: string
  status?: string
}
