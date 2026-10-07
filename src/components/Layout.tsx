import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
        <Navbar/>
        <div className='w-10/12 mx-auto my-5'>
            <Outlet/>
        </div>
    </div>
  )
}
