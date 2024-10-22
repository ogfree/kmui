'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

type AuthContextType = {
  user: User | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in with Google', error)
    }
  }

  const signOutUser = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out', error)
    }
  }

  const value = {
    user,
    signIn,
    signOut: signOutUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}