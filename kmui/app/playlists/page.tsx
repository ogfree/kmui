'use client'

import React, { useState } from 'react'
import { PlayIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

const PlaylistsPage: React.FC = () => {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Summer Hits', description: 'Best songs for summer', songCount: 25, imageUrl: 'https://example.com/playlist1.jpg' },
    { id: 2, name: 'Workout Mix', description: 'Energetic tracks for your workout', songCount: 18, imageUrl: 'https://example.com/playlist2.jpg' },
    { id: 3, name: 'Chill Vibes', description: 'Relaxing tunes for your downtime', songCount: 30, imageUrl: 'https://example.com/playlist3.jpg' },
  ])

  const [editingPlaylist, setEditingPlaylist] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const startEditing = (playlist: any) => {
    setEditingPlaylist(playlist.id)
    setEditName(playlist.name)
    setEditDescription(playlist.description)
  }

  const saveEdit = (id: number) => {
    setPlaylists(playlists.map(playlist => 
      playlist.id === id ? { ...playlist, name: editName, description: editDescription } : playlist
    ))
    setEditingPlaylist(null)
  }

  const deletePlaylist = (id: number) => {
    setPlaylists(playlists.filter(playlist => playlist.id !== id))
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-card rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <img src={playlist.imageUrl} alt={playlist.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              {editingPlaylist === playlist.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full mb-2 p-2 border rounded bg-input text-foreground"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full mb-2 p-2 border rounded bg-input text-foreground"
                  />
                  <button
                    onClick={() => saveEdit(playlist.id)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-1">{playlist.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                  <p className="text-sm text-muted-foreground mb-4">{playlist.songCount} songs</p>
                  <div className="flex justify-between items-center">
                    <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center">
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Play
                    </button>
                    <div>
                      <button
                        onClick={() => startEditing(playlist)}
                        className="text-muted-foreground hover:text-foreground transition duration-150 ease-in-out mr-2"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deletePlaylist(playlist.id)}
                        className="text-destructive hover:text-destructive/90 transition duration-150 ease-in-out"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlaylistsPage