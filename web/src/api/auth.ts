import { AxiosResponse } from 'axios';
import { client, openClient } from './client';
import { authTokenKey } from '../utils/constants';

export interface UserParams {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
}

async function handleUserResponse(
  response: AxiosResponse<UserResponse>
): Promise<UserResponse> {
  const authToken = (response.headers as any).authorization;
  if (authToken) {
    window.localStorage.setItem(authTokenKey, authToken);
  }
  return response.data;
}

export async function signup(user: UserParams) {
  const response = await openClient.post('users', { user });
  return handleUserResponse(response);
}

export async function login(user: UserParams) {
  const response = await openClient.post('users/sign_in', { user });
  return handleUserResponse(response);
}

export function logout() {
  window.localStorage.removeItem(authTokenKey);
}

export async function getProfile(): Promise<UserResponse> {
  const { data } = await client.get('profile');
  return data;
}
