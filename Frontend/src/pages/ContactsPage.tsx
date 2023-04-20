import React from 'react'
import { useAuth } from '../hooks/auth'

export const ContactsPage = () => {
  const { Logout } = useAuth();
  return (
    <>
      <div className='text-white text-5xl'>ContactsPage</div>
      <button className='text-white text-2xl border mt-5' onClick={Logout}>
          LogOut
      </button>
    </> 
  )
}
