'use client'

import React from 'react'
import { Menu, User, Home, Search, ShoppingCart, History } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Layout({ children }) {
    const currentPath = usePathname();
  return (
    <div className="max-w-md mx-auto bg-gray-100 h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-red-800 p-4 flex items-center justify-between shadow-md">
        {/* <button aria-label="Open menu" className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md">
          <Menu className="w-6 h-6" />
        </button> */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-red rounded-full flex items-center justify-center text-orange-600 font-bold text-xl mr-2">
            <Image src="/images/whitePreperlyLogo.svg" alt="Logo" width={100} height={100} />
          </div>
          <Link href="/home" aria-label="Go to home">
          <h1 className="text-2xl font-bold text-white">PREPERLY</h1>
          </Link>
        </div>
        <Link href="/profile" aria-label="Go to profile">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-red-800" />
          </div>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>

      {/* Navigation Bar */}
      <nav className="bg-white border-t border-gray-200 py-2">
        <ul className="flex justify-around">
          <li>
            <Link href="/home" className={`flex flex-col items-center ${currentPath === '/home' ? 'text-red-500' : 'text-gray-500'}`}>
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
          </li>
          <li>
            <Link href="/cart" className={`flex flex-col items-center ${currentPath === '/cart' ? 'text-red-500' : 'text-gray-500'}`}>
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs mt-1">Cart</span>
            </Link>
          </li>
          <li>
            <Link href="/history" className={`flex flex-col items-center ${currentPath === '/history' ? 'text-red-500' : 'text-gray-500'}`}>
              <History className="w-6 h-6" />
              <span className="text-xs mt-1">History</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}