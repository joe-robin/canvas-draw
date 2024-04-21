'use client'

import useCanvas from '@/hooks/useCanvas'
import { useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useCanvas(canvasRef)

  return (
    <>
      <canvas className='absolute inset-0 h-full w-full' ref={canvasRef} />
      <div className='absolute left-1/2 -translate-x-1/2 w-fit flex gap-3 p-2 border-2 border-violet-800'>
        <span> Line</span>
        <span>Squre</span>
      </div>
    </>
  )
}
