'use client'

import React, { useState, useRef, useEffect } from 'react'
import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import { usePlayerStore } from '../app/store/playerStore'
import Script from 'next/script'

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const Player: React.FC = () => {
  const { currentTrack, setCurrentTrack } = usePlayerStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(100)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentTrack) {
      if (playerRef.current) {
        playerRef.current.loadVideoById(currentTrack.id)
      } else {
        window.onYouTubeIframeAPIReady = () => {
          playerRef.current = new window.YT.Player(containerRef.current, {
            height: '0',
            width: '0',
            videoId: currentTrack.id,
            events: {
              onReady: (event: any) => {
                event.target.playVideo()
              },
              onStateChange: (event: any) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true)
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false)
                }
              },
              onError: (event: any) => {
                setError(`YouTube player error: ${event.data}`)
              }
            }
          })
        }
      }
    }
  }, [currentTrack])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = playerRef.current.getCurrentTime()
        const duration = playerRef.current.getDuration()
        setProgress((currentTime / duration) * 100)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo()
      } else {
        playerRef.current.playVideo()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      const newTime = (parseInt(e.target.value) / 100) * playerRef.current.getDuration()
      playerRef.current.seekTo(newTime)
      setProgress(parseInt(e.target.value))
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume)
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute()
        playerRef.current.setVolume(volume)
        setIsMuted(false)
      } else {
        playerRef.current.mute()
        setIsMuted(true)
      }
    }
  }

  if (!currentTrack) {
    return null
  }

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" />
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div ref={containerRef} />
        <div className="container mx-auto px-4 py-2">
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={currentTrack.cover} alt="Video thumbnail" className="w-12 h-12 rounded-md" />
              <div>
                <h3 className="text-sm font-semibold">{currentTrack.title}</h3>
                <p className="text-xs text-muted-foreground">{currentTrack.artist}</p>
              </div>
            </div>
            <div className="flex-1 mx-4">
              <input
                type="range"
                value={progress}
                onChange={handleProgressChange}
                className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-muted-foreground hover:text-foreground focus:outline-none">
                <BackwardIcon className="h-5 w-5" />
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 focus:outline-none"
              >
                {isPlaying ? (
                  <PauseIcon className="h-6 w-6" />
                ) : (
                  <PlayIcon className="h-6 w-6" />
                )}
              </button>
              <button className="text-muted-foreground hover:text-foreground focus:outline-none">
                <ForwardIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground focus:outline-none">
                {isMuted ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-secondary rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player