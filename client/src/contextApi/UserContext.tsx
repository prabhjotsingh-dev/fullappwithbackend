import { createContext, type Dispatch, type SetStateAction, } from 'react';

interface User {
  name: string;
  id: null | number;
}

export const UserContext = createContext<{
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
} | null>(null);



