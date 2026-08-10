'use client'

import { useRef, useState, useEffect } from 'react'
import { Eraser } from 'lucide-react'

export default function SignaturePad({
  onSign,
  onCancel,
  signing,
  signerName,
}: {
  onSign: (data: string) => void
  onCancel: () => void
  signing: boolean
  signerName: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * 2
    canvas.height = rect.height * 2
    ctx.scale(2, 2)
    ctx.strokeStyle = '#FFB000'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    if (!isDrawing) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    setHasDrawn(true)
  }

  function stopDrawing() {
    setIsDrawing(false)
  }

  function clearCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  function handleSign() {
    const canvas = canvasRef.current
    if (!canvas || !hasDrawn) return
    const data = canvas.toDataURL('image/png')
    onSign(data)
  }

  return (
    <div className="space-y-4">
      <div className="bg-[var(--dark-2)] border border-[var(--gray)] rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[var(--text-muted)]">Draw your signature below</p>
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <Eraser className="w-3 h-3" />
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full h-32 bg-[var(--dark-3)] rounded border border-[var(--gray)] cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Signing as: <span className="text-white">{signerName}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={signing}
          className="flex-1 py-2.5 border border-[var(--gray)] text-[var(--text-muted)] rounded-lg hover:border-white hover:text-white transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSign}
          disabled={!hasDrawn || signing}
          className="flex-1 py-2.5 bg-[var(--gold)] text-black font-semibold rounded-lg hover:bg-[var(--gold-dim)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {signing ? 'Signing...' : 'Confirm & Sign'}
        </button>
      </div>

      <p className="text-xs text-[var(--text-muted)] text-center">
        By signing, you agree that this electronic signature is legally binding under the Electronic Transactions Act of the Laws of Kenya (Section 27 of the Agreement).
      </p>
    </div>
  )
}
