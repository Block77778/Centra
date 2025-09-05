"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Menu, X, Check, ArrowDown, TrendingDown, Blocks } from "lucide-react"
import PersistentCTA from "@/components/PersistentCTA"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function CentraHomepage() {
  const [email, setEmail] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("stability")

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to Centra newsletter.",
      })
      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const popupEmail = formData.get("popup-email") as string

    if (!popupEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Welcome to the future!",
        description: "Thank you for joining Centra. We'll be in touch soon.",
      })
      setShowPopup(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById("newsletter-section")
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <PersistentCTA />

      {/* ---------- Your existing content stays here ---------- */}
      {/* (navbar, hero, sections, newsletter, etc.) */}

      {/* Closing Section: Final Call-to-Action */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          {/* Bold Statement */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12">
            Centra isn’t coming. It’s here. <br />And it belongs to the world.
          </h2>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* CTA 1 */}
            <div className="bg-muted/50 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Get Started with Centra</h3>
              <p className="text-muted-foreground mb-6">
                Download the Centra wallet app and start your journey today.
              </p>
              <a
                href="/download"
                className="text-[#1C60FF] font-medium hover:underline flex items-center justify-center gap-2"
              >
                Get started →
              </a>
            </div>

            {/* CTA 2 */}
            <div className="bg-background border border-border hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Discover the Whitepaper</h3>
              <p className="text-muted-foreground mb-6">
                Dive deeper into the Centra vision with our whitepaper and interactive explainer.
              </p>
              <a
                href="/whitepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C60FF] font-medium hover:underline flex items-center justify-center gap-2"
              >
                Read now →
              </a>
            </div>

            {/* CTA 3 */}
            <div className="bg-muted/50 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Join the Community</h3>
              <p className="text-muted-foreground mb-6">
                Be part of the movement. Connect with Centra believers worldwide.
              </p>
              <a
                href="https://discord.gg/yourcommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1C60FF] font-medium hover:underline flex items-center justify-center gap-2"
              >
                Join now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer stays at the very end ---------- */}
      <footer className="border-t border-border py-16 px-6" role="contentinfo">
        {/* Your existing footer code */}
      </footer>
    </div>
  )
}
