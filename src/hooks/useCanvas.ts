import { useEffect, useState, RefObject } from 'react'

const useCanvas = (ref: RefObject<HTMLCanvasElement>) => {
  const [lines, setLines] = useState<{ p1: number[]; p2: number[] }[]>([
    { p1: [], p2: [] },
  ])

  const handleClick = (e: MouseEvent) => {
    const canvas = ref.current
    if (!canvas) return
    const newPoint: number[] = [e.clientX, e.clientY]

    setLines(lines => {
      const newLines = structuredClone(lines)
      const lastIndex = newLines.length - 1
      const lastPoint = newLines[lastIndex]

      if (lastPoint.p1.length === 0) {
        newLines[lastIndex].p1 = newPoint

        return newLines
      } else {
        newLines[lastIndex].p2 = newPoint
        return [...newLines, { p1: [], p2: [] }]
      }
    })
  }

  const setCanvasWidthHeight = (canvas: HTMLCanvasElement) => {
    canvas.height = canvas.clientHeight
    canvas.width = canvas.clientWidth
  }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    setCanvasWidthHeight(canvas)

    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', () => setCanvasWidthHeight(canvas))

    return () => {
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', () => setCanvasWidthHeight(canvas))
    }
  }, [ref])

  // Draw
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    //Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.lineCap = 'round'
    ctx.strokeStyle = '#55A1E4'
    ctx.lineWidth = 2

    lines.forEach(line => {
      ctx.beginPath()
      ctx.moveTo(line.p1[0], line.p1[1])
      ctx.lineTo(line.p2[0], line.p2[1])
      ctx.stroke()
      ctx.closePath()
    })
  }, [lines])

  return { lines } // Return any values or functions needed by the component
}

export default useCanvas
