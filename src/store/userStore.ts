/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  persist(
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
        isLoggedIn: false,
      }),
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'user-storage', // 로컬 스토리지 키 이름
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }), // 저장할 상태 지정
    }
  )
);
