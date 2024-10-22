'use client'

import React, { useState } from 'react'
import { PlayIcon, HeartIcon } from '@heroicons/react/solid'

const LikedSongsPage: React.FC = () => {
  const [likedSongs, setLikedSongs] = useState([
    { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1', duration: '3:45' },
    { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2', duration: '4:20' },
    { id: 3, title: 'Song 3', artist: 'Artist 3', album: 'Album 3', duration: '3:10' },
  ])

  const removeLikedSong = (id: number) => {
    setLikedSongs(likedSongs.filter(song => song.id !== id))
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Liked Songs</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center">
          <PlayIcon className="w-5 h-5 mr-2" />
          Play All
        </button>
      </div>
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Artist</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Album</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {likedSongs.map((song) => (
              <tr key={song.id} className="hover:bg-muted/50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap">{song.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{song.artist}</td>
                <td className="px-6 py-4 whitespace-nowrap">{song.album}</td>
                <td className="px-6 py-4 whitespace-nowrap">{song.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => removeLikedSong(song.id)}
                    className="text-destructive hover:text-destructive/90 transition duration-150 ease-in-out"
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LikedSongsPage