"use client";

import { MyUserContextProvider } from "@/hooks/userUser";

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
