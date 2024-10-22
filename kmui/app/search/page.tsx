"use client"

import React, { useState } from 'react'
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { usePlayerStore } from '../store/playerStore'

interface SearchResult {
  id: string
  title: string
  artist: string
  cover: string
  url: string // Add the missing 'url' property
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const setCurrentTrack = usePlayerStore(state => state.setCurrentTrack)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (!Array.isArray(data)) {
        console.error('Unexpected API response:', data)
        throw new Error('Unexpected API response format')
      }

      setSearchResults(data)
    } catch (error) {
      console.error('Error searching:', error)
      setError('An error occurred while searching. Please try again.')
      setSearchResults([])
    }
  }

  const handlePlay = (track: SearchResult) => {
    setCurrentTrack(track)
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Search for Music</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center bg-input rounded-full p-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-foreground mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Search for songs or artists"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-primary hover:bg-primary/90 border-primary hover:border-primary/90 text-sm border-4 text-primary-foreground py-1 px-2 rounded-full transition duration-300 ease-in-out"
            type="submit"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((result) => (
          <div key={result.id} className="bg-card rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <Image 
              src={result.cover} 
              alt={`${result.title} cover`} 
              width={192} 
              height={192} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{result.title}</h3>
              <p className="text-muted-foreground">{result.artist}</p>
              <button 
                onClick={() => handlePlay(result)}
                className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
