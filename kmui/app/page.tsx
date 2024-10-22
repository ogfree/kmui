import Link from 'next/link'
import Image from 'next/image'

const featuredPlaylists = [
  { id: 1, name: 'Chill Vibes', imageUrl: '/placeholder.svg?height=192&width=192' },
  { id: 2, name: 'Workout Mix', imageUrl: '/placeholder.svg?height=192&width=192' },
  { id: 3, name: 'Study Session', imageUrl: '/placeholder.svg?height=192&width=192' },
  { id: 4, name: 'Party Anthems', imageUrl: '/placeholder.svg?height=192&width=192' },
]

const recentlyPlayed = [
  { id: 1, name: 'Song 1', artist: 'Artist 1', imageUrl: '/placeholder.svg?height=128&width=128' },
  { id: 2, name: 'Song 2', artist: 'Artist 2', imageUrl: '/placeholder.svg?height=128&width=128' },
  { id: 3, name: 'Song 3', artist: 'Artist 3', imageUrl: '/placeholder.svg?height=128&width=128' },
  { id: 4, name: 'Song 4', artist: 'Artist 4', imageUrl: '/placeholder.svg?height=128&width=128' },
]

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Harmony</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Playlists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div key={playlist.id} className="bg-card rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
              <Image src={playlist.imageUrl} alt={playlist.name} width={192} height={192} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{playlist.name}</h3>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-full transition duration-300 ease-in-out flex items-center">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyPlayed.map((song) => (
            <div key={song.id} className="bg-card rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <Image src={song.imageUrl} alt={song.name} width={128} height={128} className="w-full h-32 object-cover" />
              <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{song.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link href="/search" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
            Search for Music
          </Link>
          <Link href="/library" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-4 px-6 rounded-lg text-center transition duration-300 ease-in-out transform hover:scale-105">
            Your Library
          </Link>
        </div>
      </section>
    </div>
  )
}