'use client'

import React from 'react'
import { useAuth } from './AuthProvider'
import { useTheme } from '../app/contexts/ThemeContext'
import { UserIcon, SunIcon, MoonIcon, SparklesIcon, BugAntIcon } from '@heroicons/react/24/solid'

const Header: React.FC = () => {
  const { user, signIn, signOut } = useAuth()
  const { theme, setTheme } = useTheme()

  const themes = [
    { name: 'light', icon: SunIcon },
    { name: 'dark', icon: MoonIcon },
    { name: 'synthwave', icon: SparklesIcon },
    { name: 'forest', icon: BugAntIcon },
  ]

  return (
    <header className="bg-card text-card-foreground sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Harmony</h1>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {themes.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => setTheme(name as any)}
                  className={`p-2 rounded-full ${
                    theme === name ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{user.displayName}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-sm font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header