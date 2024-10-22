import { create } from 'zustand'

interface PlayerState {
  currentTrack: {
    id: string
    title: string
    artist: string
    url: string
    cover: string
  } | null
  setCurrentTrack: (track: PlayerState['currentTrack']) => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),
}))