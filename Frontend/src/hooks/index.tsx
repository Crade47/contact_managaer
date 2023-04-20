import { UserProvider } from "./auth";

import type { ReactNode } from 'react'

const AppProvider = ({children}:{children:ReactNode}) => {

  return (
    <>
        <UserProvider>{children}</UserProvider>
    </>
  )
}

export default AppProvider;
