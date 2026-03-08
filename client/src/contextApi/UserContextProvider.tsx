import { useState, type ReactNode } from 'react';
import { UserContext } from './UserContext';

// Define the shape of your context
interface User {
  name: string;
  id: null | number;
}



export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ name: 'Guest', id: null });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};