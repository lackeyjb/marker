import { client } from './client';

export interface CreateParams {
  url: string;
  user_id: number;
}

export interface Bookmark extends CreateParams {
  id: number;
}

export function create(params: CreateParams) {
  return client.post<Bookmark>('bookmarks', params);
}
