import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen container mx-auto px-20'>
        <Header />
        <Outlet />
      </main>

      <div className='w-full p-10 text-center bg-gray-800 mt-10'>
        404 bugs not found 😎
      </div>
    </div>
  )
}
