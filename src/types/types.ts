export interface Payload {
  id: number;
  name: string;
  email: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface Post {
  id: number;
  postContent: string;
  postImage: string;
  publishTime: string;
  publishDate: string;
  userId: number;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface PostResponse {
  data: {
    post: Post;
  };
  success: boolean;
  error: string | null;
  message: string;
}
