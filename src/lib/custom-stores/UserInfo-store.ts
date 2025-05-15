
import { writable } from 'svelte/store';

export type User = {
  username: string;
  email: string;
  avatar?: string;
};

export const user = writable<User | null>(null);
