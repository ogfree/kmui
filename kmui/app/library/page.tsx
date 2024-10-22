'use client'

import React, { useState } from 'react'
//@ts-ignore
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid'

const LibraryPage: React.FC = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'My Favorites', songCount: 25, imageUrl: 'https://example.com/playlist1.jpg' },
    { id: 2, name: 'Workout Mix', songCount: 18, imageUrl: 'https://example.com/playlist2.jpg' },
    { id: 3, name: 'Chill Vibes', songCount: 30, imageUrl: 'https://example.com/playlist3.jpg' },
  ])

  const createNewPlaylist = () => {
    const newPlaylist = {
      id: playlists.length + 1,
      name: `New Playlist ${playlists.length + 1}`,
      songCount: 0,
      imageUrl: 'https://example.com/default-playlist.jpg'
    }
    setPlaylists([...playlists, newPlaylist])
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          onClick={createNewPlaylist}
          className="bg-card rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer flex flex-col items-center justify-center h-64"
        >
          <PlusIcon className="h-16 w-16 text-primary mb-2" />
          <p className="text-lg font-semibold">Create New Playlist</p>
        </div>
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-card rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <img src={playlist.imageUrl} alt={playlist.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{playlist.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{playlist.songCount} songs</p>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center">
                <PlayIcon className="w-5 h-5 mr-2" />
                Play
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LibraryPage