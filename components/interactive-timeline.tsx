"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TimelineProps {
  className?: string
}

const timelineBlocks = [
  { id: 0, label: "History of Money", position: 0 },
  { id: 1, label: "10,000 BCE - Barter Systems", position: 14 },
  { id: 2, label: "3,000 BCE - Precious Metals", position: 28 },
  { id: 3, label: "600 BCE - Coinage", position: 42 },
  { id: 4, label: "1000 CE - Paper Money", position: 56 },
  { id: 5, label: "1944 - Gold Standard", position: 70 },
  { id: 6, label: "1971 - Fiat Currency", position: 84 },
  { id: 7, label: "2009 - Cryptocurrency", position: 98 },
]

export function InteractiveTimeline({ className }: TimelineProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [currentBlock, setCurrentBlock] = useState(0)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartBlock, setDragStartBlock] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const getCurrentPosition = () => {
    return timelineBlocks[currentBlock].position
  }

  const navigateToBlock = (blockIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(timelineBlocks.length - 1, blockIndex))
    setCurrentBlock(clampedIndex)
  }

  const nextBlock = () => {
    if (currentBlock < timelineBlocks.length - 1) {
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

      if (newBlock >= 0 && newBlock < timelineBlocks.length && newBlock !== currentBlock) {
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

        if (newBlock >= 0 && newBlock < timelineBlocks.length && newBlock !== currentBlock) {
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
  }, [isDragging, dragStartX, dragStartBlock, currentBlock])

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

      if (newBlock >= 0 && newBlock < timelineBlocks.length && newBlock !== currentBlock) {
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
          style={{ height: "45vh", minHeight: "350px", maxHeight: "450px" }} // Reduced height to eliminate empty black space
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
              transform: `translateX(-${getCurrentPosition() * 0.85}%)`, // Adjusted transform calculation to properly align image sections with blocks
              width: "280%",
            }}
          >
            <Image
              src="/history-timeline.jpg"
              alt="Interactive Timeline - The History of Money from 10,000 BCE to 2025"
              fill
              className="object-cover object-left"
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
            disabled={currentBlock === timelineBlocks.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-3 border border-white/20 text-white hover:bg-black/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="flex items-center space-x-3 text-white text-sm">
              <span className="font-medium">{timelineBlocks[currentBlock].label}</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {timelineBlocks.map((block, index) => (
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

      <div className="lg:hidden space-y-6 p-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div
            className="relative w-full overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            style={{ height: "220px" }} // Reduced mobile height
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${getCurrentPosition() * 0.75}%)`, // Adjusted mobile transform for better alignment
                width: "220%",
              }}
            >
              <Image
                src="/history-timeline.jpg"
                alt="The History of Money Timeline from 10,000 BCE to 2025"
                fill
                className="object-cover object-left"
                priority
                draggable={false}
              />
            </div>

            <button
              onClick={prevBlock}
              disabled={currentBlock === 0}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextBlock}
              disabled={currentBlock === timelineBlocks.length - 1}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm rounded-full p-2 text-white disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-white text-xs">{timelineBlocks[currentBlock].label}</span>
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-4">
            {timelineBlocks.map((block, index) => (
              <button
                key={block.id}
                onClick={() => navigateToBlock(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentBlock ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
