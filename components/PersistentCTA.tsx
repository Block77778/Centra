"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

export function PersistentCTA() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1C60FF] to-[#1C60FF] text-white shadow-lg border-t border-[#1C60FF]/20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="font-medium text-lg">Ready to join the future of money?</p>
              <p className="text-sm text-white/80">Start using Centra today and be part of the financial revolution.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              size="lg"
              className="bg-white text-[#1C60FF] hover:bg-white/90 font-medium px-6"
              aria-label="Start using Centra"
            >
              Start using Centra
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white p-2"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersistentCTA
