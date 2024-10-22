'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, MagnifyingGlassIcon, BookmarkIcon, HeartIcon, QueueListIcon } from '@heroicons/react/24/outline'

const Sidebar: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Search', href: '/search', icon: MagnifyingGlassIcon },
    { name: 'Your Library', href: '/library', icon: BookmarkIcon },
    { name: 'Liked Songs', href: '/liked', icon: HeartIcon },
    { name: 'Playlists', href: '/playlists', icon: QueueListIcon },
  ]

  return (
    <div className="bg-card text-card-foreground w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <Link href="/" className="text-primary flex items-center space-x-2 px-4">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 19V6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772 15 6V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12H9M15 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-2xl font-extrabold">Harmony</span>
      </Link>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground rounded-md p-2 ${
                pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar