import { DateRange, Filter, TimeRange } from "./model";

export interface Attachment {
  originalFilename: string;
  filename: string;
  url: string;
  size: number;
}

export interface Achievement {
  subject: string;
  description: string;
}
export interface Skill {
  skill: string;
  hirable: boolean;
}

export interface Role {
  roleId: string
  roleName: string
  status: string
  remark: string
  privileges?: string[]
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

export interface RateSummary {
  rate: number
  rate1: number
  rate2: number
  rate3: number
  rate4: number
  rate5: number
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

export interface User {
  id: string
  username: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  displayName?: string
  status?: string
  imageURL?: string
  coverURL?: string
  headline?: string
  bio?: string
  website?: string
  occupation?: string
  company?: string
  location?: string

  followedAt?: Date
  followerCount?: number
  followingCount?: number
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
  status: string
  companyId?: string
  companyName?: string
  logo?: string
  savedAt?: Date
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
  userId?: string
  isSaved?: boolean
}
