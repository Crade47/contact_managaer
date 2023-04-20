import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth"
import type { ReactNode } from "react"

export const ProtectRoute = () => {
    
    const { cookies } = useAuth();
  return cookies.token ? <Outlet/> : <Navigate to='/login'/> 
}
