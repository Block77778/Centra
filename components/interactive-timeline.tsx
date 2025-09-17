"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TimelineProps {
  className?: string
}

const timelineBlocks = [
  { id: 1, label: "History of Money", position: 0 },
  { id: 2, label: "10,000 BCE", position: 16.67 },
  { id: 3, label: "3,000 BCE", position: 33.33 },
  { id: 4, label: "600 BCE", position: 50 },
  { id: 5, label: "1000 CE", position: 66.67 },
  { id: 6, label: "1944-2025", position: 83.33 },
]

const desktopBlocks = timelineBlocks.slice(0, 3) // Reduced from 5 to 4 blocks for desktop to eliminate black space
const mobileBlocks = timelineBlocks.slice(0, 6) // Increased from 5 to 6 blocks for mobile so it doesn't end before image ends

export function InteractiveTimeline({ className }: TimelineProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentBlock, setCurrentBlock] = useState(0)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartBlock, setDragStartBlock] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getCurrentBlocks = () => (isMobile ? mobileBlocks : desktopBlocks)

  const getCurrentPosition = () => {
    const blocks = getCurrentBlocks()
    return blocks[currentBlock]?.position || 0
  }

  const navigateToBlock = (blockIndex: number) => {
    const blocks = getCurrentBlocks()
    const clampedIndex = Math.max(0, Math.min(blocks.length - 1, blockIndex))
    setCurrentBlock(clampedIndex)
  }

  const nextBlock = () => {
    const blocks = getCurrentBlocks()
    if (currentBlock < blocks.length - 1) {
      navigateToBlock(currentBlock + 1)
    }
  }

  const prevBlock = () => {
    if (currentBlock > 0) {
      navigateToBlock(currentBlock - 1)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragStartBlock(currentBlock)
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !timelineRef.current) return

    const dragDistance = e.clientX - dragStartX
    const threshold = 100 // pixels needed to trigger block change

    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? -1 : 1
      const newBlock = dragStartBlock + direction
      const blocks = getCurrentBlocks()

      if (newBlock >= 0 && newBlock < blocks.length && newBlock !== currentBlock) {
        setCurrentBlock(newBlock)
        setDragStartX(e.clientX)
        setDragStartBlock(newBlock)
      }
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !timelineRef.current) return

      const dragDistance = e.clientX - dragStartX
      const threshold = 100

      if (Math.abs(dragDistance) > threshold) {
        const direction = dragDistance > 0 ? -1 : 1
        const newBlock = dragStartBlock + direction
        const blocks = getCurrentBlocks()

        if (newBlock >= 0 && newBlock < blocks.length && newBlock !== currentBlock) {
          setCurrentBlock(newBlock)
          setDragStartX(e.clientX)
          setDragStartBlock(newBlock)
        }
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
      document.body.style.cursor = "grabbing"
      document.body.style.userSelect = "none"
    } else {
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, dragStartX, dragStartBlock, currentBlock, isMobile])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragStartBlock(currentBlock)
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !timelineRef.current) return

    const dragDistance = e.touches[0].clientX - dragStartX
    const threshold = 80 // Slightly lower threshold for touch

    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? -1 : 1
      const newBlock = dragStartBlock + direction
      const blocks = getCurrentBlocks()

      if (newBlock >= 0 && newBlock < blocks.length && newBlock !== currentBlock) {
        setCurrentBlock(newBlock)
        setDragStartX(e.touches[0].clientX)
        setDragStartBlock(newBlock)
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className={className}>
      {/* Desktop Interactive Timeline */}
      <div className="hidden lg:block">
        <div
          ref={containerRef}
          className="relative bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ height: "69vh", minHeight: "555px", maxHeight: "690px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={timelineRef}
            className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${getCurrentPosition() * 1.0}%)`,
              width: "400%",
            }}
          >
            <Image
              src="/history-timeline.jpg"
              alt="Interactive Timeline - The History of Money from 10,000 BCE to 2025"
              fill
              className="object-contain object-left"
              priority
              draggable={false}
            />
          </div>

          <button
            onClick={prevBlock}
            disabled={currentBlock === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-black/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextBlock}
            disabled={currentBlock === desktopBlocks.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-black/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {desktopBlocks.map((block, index) => (
              <button
                key={block.id}
                onClick={() => navigateToBlock(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBlock ? "bg-blue-400 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Timeline */}
      <div className="lg:hidden">
        <div
          className="relative w-full bg-black overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ height: "60vh", minHeight: "500px" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${getCurrentPosition() * 1.0}%)`,
              width: "600%",
            }}
          >
            <Image
              src="/history-timeline.jpg"
              alt="The History of Money Timeline from 10,000 BCE to 2025"
              fill
              className="object-contain object-left"
              priority
              draggable={false}
            />
          </div>

          <button
            onClick={prevBlock}
            disabled={currentBlock === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-black/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextBlock}
            disabled={currentBlock === mobileBlocks.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-black/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {mobileBlocks.map((block, index) => (
              <button
                key={block.id}
                onClick={() => navigateToBlock(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBlock ? "bg-blue-400 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
