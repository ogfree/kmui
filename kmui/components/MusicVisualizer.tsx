'use client'

import React, { useRef, useEffect } from 'react'

interface MusicVisualizerProps {
  audioElement: HTMLAudioElement | null
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ audioElement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!audioElement || !canvasRef.current) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    const source = audioContext.createMediaElementSource(audioElement)
    source.connect(analyser)
    analyser.connect(audioContext.destination)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const draw = () => {
      requestAnimationFrame(draw)

      analyser.getByteFrequencyData(dataArray)

      ctx.fillStyle = 'rgb(0, 0, 0)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2

        ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
    }

    draw()

    return () => {
      source.disconnect()
      analyser.disconnect()
    }
  }, [audioElement])

  return <canvas ref={canvasRef} className="w-full h-16" />
}

export default MusicVisualizer