/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface User {
  createdAt: string;
  email: string;
  id: string;
  image: string;
  name: string;
}

interface UserStore {
  isLoggedIn: boolean;
  login: any;
  logout: any;
  removeUser: () => void;
  updateUser: (newUser: User) => void;
  user: User;
}

export const userStore = create<UserStore>()(
    (set) => ({
      user: {
        id: '',
        name: '',
        email: '',
        image: '',
        createdAt: '',
      },
      isLoggedIn: false,
      updateUser: (newUser) => set({ user: newUser }),
      removeUser: () => set({
        user: { id: '', name: '', email: '', image: '', createdAt: '' },
        // isLoggedIn: false,
      }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    })
);