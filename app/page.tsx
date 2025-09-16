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
import { InteractiveTimeline } from "@/components/interactive-timeline"

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

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#1C60FF] rounded-lg p-8 max-w-md w-full text-white relative animate-fade-in-up">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl mb-4">Ready to join the future of money?</h3>
            <p className="text-white/90 mb-6">Start using Centra today and be part of the financial revolution.</p>
            <form onSubmit={handlePopupSubmit} className="space-y-4">
              <Input
                name="popup-email"
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black border-0 h-12"
                required
              />
              <Button type="submit" className="w-full bg-white text-[#1C60FF] hover:bg-white/90 h-12 text-lg">
                Start using Centra
              </Button>
            </form>
          </div>
        </div>
      )}

      <nav
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Image
                  src="/centra-wordmark.png"
                  alt="Centra"
                  width={120}
                  height={36}
                  className="hover:scale-110 transition-transform duration-200"
                />
              </div>
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <a
                  href="/about"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Learn about Centra
                </a>
                <a
                  href="#"
                  onClick={scrollToNewsletter}
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Buy Centra
                </a>
                <a
                  href="/team"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Meet the Team
                </a>
                <a
                  href="/developers"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Developer Hub
                </a>
                <a
                  href="/community"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Community
                </a>
                <a
                  href="/faq"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  FAQs
                </a>
                <a
                  href="/blog"
                  className="text-foreground hover:text-[#1C60FF] focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded px-3 py-2 transition-all duration-200 whitespace-nowrap"
                >
                  Blog
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToNewsletter}
                className="text-sm bg-transparent hover:bg-[#1C60FF]/10 hover:border-[#1C60FF] transition-all duration-200 flex items-center gap-2 whitespace-nowrap"
              >
                <Image
                  src="/centra-icon.png"
                  alt="Purchase Centra"
                  width={20}
                  height={20}
                  className="hover:scale-110 transition-transform duration-200"
                />
                Purchase
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="/about"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Learn about Centra
                </a>
                <a
                  href="#"
                  onClick={() => {
                    scrollToNewsletter()
                    setMobileMenuOpen(false)
                  }}
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                >
                  Buy Centra
                </a>
                <a
                  href="/team"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Meet the Team
                </a>
                <a
                  href="/developers"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Developer Hub
                </a>
                <a
                  href="/community"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Community
                </a>
                <a
                  href="/faq"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQs
                </a>
                <a
                  href="/blog"
                  className="block px-3 py-2 text-foreground hover:text-[#1C60FF] hover:bg-[#1C60FF]/10 rounded-md transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section className="relative h-[85vh] overflow-hidden" role="banner">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
          aria-label="Background video showing AI and cybersecurity technology"
        >
          <source
            src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          <source
            src="/placeholder.mp4?height=1440&width=2560&query=AI artificial intelligence cybersecurity digital protection neural networks data encryption futuristic technology holographic interface"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="text-center text-white max-w-6xl animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-8 leading-tight tracking-tight">
              Centra:
              <br />
              <span className="bg-gradient-to-r from-[#1C60FF] via-[#1C60FF] to-[#1C60FF] bg-clip-text text-transparent font-medium animate-gradient">
                The Currency
              </span>
              <br />
              of All People
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 font-light leading-relaxed max-w-4xl mx-auto">
              A stable, transparent, and borderless alternative to broken fiat systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={scrollToNewsletter}
                className="bg-white text-black hover:bg-white/90 hover:scale-105 px-10 py-4 text-lg font-medium transition-all duration-300 shadow-lg"
              >
                Join the Movement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToFeatures}
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-4 text-lg font-medium backdrop-blur-sm bg-transparent transition-all duration-300"
              >
                Read the Vision
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
              Money is Failing Us.
            </h2>
          </div>

          {/* Desktop: 4 columns horizontal layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {/* Inflation Card */}
            <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/professional-business-person-reviewing-financial-d.jpg"
                  alt="Professional reviewing financial documents with concern about inflation"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground mb-3 font-semibold">Inflation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Centra is the only currency designed for all people, worldwide. It can not be devalued, it can not be
                  printed by entities for their own purposes; it can not be corrupted.
                </p>
              </div>
            </Card>

            {/* Political Control Card */}
            <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/professional-business-meeting-discussing-financial.jpg"
                  alt="Business professionals discussing financial policy and monetary control"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground mb-3 font-semibold">Political Control</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Debt is no longer a trap. With Centra, borrowing is honest: a one-time flat fee instead of endless
                  compounding interest. Credit becomes fair, predictable, and open to all.
                </p>
              </div>
            </Card>

            {/* Financial Exclusion Card */}
            <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/diverse-group-of-people-working-together-on-financ.jpg"
                  alt="Diverse professionals working on financial inclusion initiatives"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground mb-3 font-semibold">Financial Exclusion</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Centra ends inflation, ends hidden taxation, and ends all barriers to access. Centra moves freely
                  across borders in seconds, meaning every person holds equal power in the global economy.
                </p>
              </div>
            </Card>

            {/* Borders Card */}
            <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group">
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <Image
                  src="/global-business-professionals-collaborating-across.jpg"
                  alt="Global professionals collaborating on borderless financial solutions"
                  width={320}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-foreground mb-3 font-semibold">Borders</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Centra is not built by one founder or one company. Centra only exists based on demand and adoption of
                  the people. Centra is money that belongs to you, community, and only the community can make it real.
                </p>
              </div>
            </Card>
          </div>

          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {/* Inflation Card - Mobile */}
              <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl flex-shrink-0 w-80 snap-start group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src="/professional-business-person-reviewing-financial-d.jpg"
                    alt="Professional reviewing financial documents with concern about inflation"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-3 font-semibold">Inflation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Centra is the only currency designed for all people, worldwide. It can not be devalued, it can not
                    be printed by entities for their own purposes; it can not be corrupted.
                  </p>
                </div>
              </Card>

              {/* Political Control Card - Mobile */}
              <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl flex-shrink-0 w-80 snap-start group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src="/professional-business-meeting-discussing-financial.jpg"
                    alt="Business professionals discussing financial policy and monetary control"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-3 font-semibold">Political Control</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Debt is no longer a trap. With Centra, borrowing is honest: a one-time flat fee instead of endless
                    compounding interest. Credit becomes fair, predictable, and open to all.
                  </p>
                </div>
              </Card>

              {/* Financial Exclusion Card - Mobile */}
              <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl flex-shrink-0 w-80 snap-start group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src="/diverse-group-of-people-working-together-on-financ.jpg"
                    alt="Diverse professionals working on financial inclusion initiatives"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-3 font-semibold">Financial Exclusion</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Centra ends inflation, ends hidden taxation, and ends all barriers to access. Centra moves freely
                    across borders in seconds, meaning every person holds equal power in the global economy.
                  </p>
                </div>
              </Card>

              {/* Borders Card - Mobile */}
              <Card className="border border-border bg-background hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl flex-shrink-0 w-80 snap-start group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                  <Image
                    src="/global-business-professionals-collaborating-across.jpg"
                    alt="Global professionals collaborating on borderless financial solutions"
                    width={320}
                    height={240}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-foreground mb-3 font-semibold">Borders</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Centra is not built by one founder or one company. Centra only exists based on demand and adoption
                    of the people. Centra is money that belongs to you, community, and only the community can make it
                    real.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20" id="features-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 leading-tight">Built on Fundamental Principles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Centra is built on three fundamental principles that ensure financial freedom and equality for everyone.
            </p>
          </div>

          {/* Tabbed Interface */}
          <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-xl">
            {/* Tab Navigation */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab("stability")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "stability"
                    ? "bg-[#1C60FF] text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                }`}
              >
                STABILITY
              </button>
              <button
                onClick={() => setActiveTab("transparency")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "transparency"
                    ? "bg-[#1C60FF] text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                }`}
              >
                TRANSPARENCY
              </button>
              <button
                onClick={() => setActiveTab("equality")}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                  activeTab === "equality"
                    ? "bg-[#1C60FF] text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                }`}
              >
                EQUALITY
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {activeTab === "stability" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">
                            Fixed supply, non-inflationary design
                          </h4>
                          <p className="text-muted-foreground">
                            Ensures your money maintains its value over time with mathematical certainty.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">Protected from manipulation</h4>
                          <p className="text-muted-foreground">
                            Cannot be printed or devalued by any entity for their own purposes.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">Predictable monetary policy</h4>
                          <p className="text-muted-foreground">
                            Clear rules that cannot be changed arbitrarily by central authorities.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "transparency" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">
                            All transactions visible and verifiable
                          </h4>
                          <p className="text-muted-foreground">
                            Complete transparency eliminates corruption and hidden manipulation.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">Open-source and auditable</h4>
                          <p className="text-muted-foreground">
                            Every line of code can be reviewed and verified by the community.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">Real-time monitoring</h4>
                          <p className="text-muted-foreground">
                            Track all network activity and monetary policy in real-time.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "equality" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">
                            Accessible to everyone, everywhere
                          </h4>
                          <p className="text-muted-foreground">
                            Regardless of location, status, or financial background.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">No barriers to entry</h4>
                          <p className="text-muted-foreground">
                            No minimum balances, credit checks, or institutional gatekeepers.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-[#1C60FF] rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg text-foreground mb-2 font-semibold">Equal power in global economy</h4>
                          <p className="text-muted-foreground">
                            Every person holds the same rights and capabilities with their money.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side - Financial interface mockup */}
                <div className="flex justify-center">
                  <div className="relative">
                    {activeTab === "stability" && (
                      <img
                        src="/Stability-image.png"
                        alt="Financial stability - balanced scales with currency"
                        className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                      />
                    )}
                    {activeTab === "transparency" && (
                      <img
                        src="/transparency-image.jpg"
                        alt="Financial transparency - businessman viewing financial data"
                        className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                      />
                    )}
                    {activeTab === "equality" && (
                      <img
                        src="/Equality-image.png"
                        alt="Financial equality - people using mobile financial services"
                        className="w-80 h-96 object-cover rounded-2xl shadow-2xl"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Button
                  size="lg"
                  onClick={() => {
                    const solutionSection = document.getElementById("centra-solution")
                    solutionSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="bg-[#1C60FF] text-white hover:bg-[#1C60FF]/90 hover:scale-105 px-8 py-3 transition-all duration-300"
                >
                  See How Centra Fixes This
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    window.location.href = "/developers"
                  }}
                  className="border-[#1C60FF] text-[#1C60FF] hover:bg-[#1C60FF]/10 px-8 py-3 transition-all duration-300 bg-transparent"
                >
                  Learn How Centra Works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-0">
        <InteractiveTimeline />
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-6xl mx-auto px-6 pt-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl text-foreground mb-6">What Fiat Can Never Offer</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Compare the limitations of traditional fiat currency with Centra's innovative solutions for a better
              financial future.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border border-border bg-background hover:shadow-xl hover:scale-105 transition-all duration-300 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-muted to-muted/80 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏦</span>
                </div>
                <div>
                  <h4 className="text-2xl text-foreground">Fiat Currency Problems</h4>
                  <p className="text-muted-foreground">Current system limitations</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Inflation erodes purchasing power over time",
                    description: "Central banks print unlimited money, devaluing your savings",
                  },
                  {
                    title: "Central bank manipulation and control",
                    description: "Monetary policy serves institutions, not people",
                  },
                  {
                    title: "Lack of transparency in monetary policy",
                    description: "Hidden operations and backroom financial deals",
                  },
                  {
                    title: "Unequal access to financial systems",
                    description: "Billions excluded from basic financial services",
                  },
                ].map((problem, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-foreground mb-1">{problem.title}</p>
                      <p className="text-muted-foreground text-sm">{problem.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border border-border bg-gradient-to-br from-[#1C60FF]/5 to-[#1C60FF]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1C60FF]/20 to-[#1C60FF]/30 rounded-full flex items-center justify-center">
                  <Image
                    src="/centra-icon.png"
                    alt="Centra"
                    width={56}
                    height={56}
                    className="hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <div>
                  <h4 className="text-2xl text-[#1C60FF]">Centra Solutions</h4>
                  <p className="text-[#1C60FF]/80">Revolutionary improvements</p>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "Fixed supply prevents inflation and devaluation",
                    description: "Your wealth is preserved with mathematical certainty",
                  },
                  {
                    title: "Decentralized governance by the community",
                    description: "Democratic decision-making puts power in people's hands",
                  },
                  {
                    title: "Complete transparency in all transactions",
                    description: "Every operation is publicly verifiable on the blockchain",
                  },
                  {
                    title: "Equal access for everyone, everywhere",
                    description: "No barriers, no discrimination, universal financial inclusion",
                  },
                ].map((solution, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#1C60FF] rounded-full mt-3 flex-shrink-0" />
                    <div>
                      <p className="text-[#1C60FF] mb-1">{solution.title}</p>
                      <p className="text-[#1C60FF]/80 text-sm">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => window.open("/explainer", "_blank")}
              className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 h-14 px-8 text-lg transition-all duration-300 shadow-lg"
            >
              Compare the Future
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-muted/20 to-background" id="why-now-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl text-foreground mb-8 leading-tight">The Time for Change is Now.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Short punch lines about inflation, collapsing trust, digital shift.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Punchy statements */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#1C60FF] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-foreground leading-relaxed">
                    <strong>Centra is different; it never loses value.</strong>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#1C60FF] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-foreground leading-relaxed">
                    <strong>What you hold today keeps its worth tomorrow.</strong>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#1C60FF] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-foreground leading-relaxed">
                    <strong>Borrowing is no longer a punishment.</strong>
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-[#1C60FF] rounded-full mt-2 flex-shrink-0" />
                  <p className="text-lg text-foreground leading-relaxed">
                    <strong>With Centra, credit is honest, a simple flat fee instead of compounding interest.</strong>
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  size="lg"
                  onClick={() => {
                    const newsletterSection = document.getElementById("newsletter-section")
                    newsletterSection?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="bg-[#1C60FF] text-white hover:bg-[#1C60FF]/90 hover:scale-105 px-8 py-4 text-lg transition-all duration-300 shadow-lg"
                >
                  Be Early. Be Part of History.
                </Button>
              </div>
            </div>

            {/* Right side - Minimalist flow diagram */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm space-y-6">
                {/* Fiat Failures */}
                <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                      <TrendingDown className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Fiat Failures</h3>
                      <p className="text-sm text-muted-foreground">Inflation • Manipulation • Exclusion</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* Blockchain Innovation */}
                <div className="bg-background border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                      <Blocks className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Blockchain Innovation</h3>
                      <p className="text-sm text-muted-foreground">Transparency • Decentralization</p>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <ArrowDown className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* Centra Launch */}
                <div className="bg-[#1C60FF] border border-[#1C60FF] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                      <Image
                        src="/centra-icon.png"
                        alt="Centra"
                        width={24}
                        height={24}
                        className="hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Centra Launch</h3>
                      <p className="text-sm text-white/80">The Future of Money</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/global-community-borderless-currency-worldwide-fin.jpg"
            alt="Global community connected digitally representing worldwide financial inclusion"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="mb-8">
            <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-4">THE CENTRA MISSION</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              One World. One Currency.
              <br />
              <span className="text-[#1C60FF]">One Future.</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed text-white/90 mb-12">
            <p>
              Centra was founded because money should serve people, not trap them. For too long we have lived in a
              system that inflates away our savings, hides taxes in plain sight, and pushes billions into endless debt.
            </p>
            <p>
              Centra is not just a currency. It is a chance to give everyone worldwide the same freedom, the same
              access, and the same opportunity to build a future without fear of losing it all.
            </p>
            <p>
              Centra is not built by one founder or one company. Centra only exists based on demand and adoption of the
              people. Centra is money that belongs to you, community, and only the community can make it real.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => {
              const newsletterSection = document.getElementById("newsletter-section")
              newsletterSection?.scrollIntoView({ behavior: "smooth" })
            }}
            className="bg-[#1C60FF] text-white hover:bg-[#1C60FF]/90 hover:scale-105 px-10 py-4 text-lg font-medium transition-all duration-300 shadow-lg"
          >
            Join the Movement
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Closing Section: Final Call-to-Action */}
      <section className="py-32 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-6xl mx-auto text-center">
          {/* Bold Statement */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-12">
            Centra isn't coming. It's here. <br />
            And it belongs to the world.
          </h2>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* CTA 1 */}
            <div className="bg-muted/50 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-2xl p-8 flex flex-col justify-between">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Get Started with Centra</h3>
              <p className="text-muted-foreground mb-6">Download the Centra wallet app and start your journey today.</p>
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

      <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-muted/40" id="newsletter-section">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl text-foreground mb-6">Subscribe to Centra newsletter</h3>
          <p className="text-xl text-muted-foreground mb-12">
            Get the latest updates on Centra ID, new features, and community news.
          </p>
          <form className="flex gap-6 max-w-lg mx-auto" onSubmit={handleNewsletterSubmit}>
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <Input
              id="email-input"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 text-lg border-2 focus:border-[#1C60FF] transition-colors duration-200"
              required
              aria-describedby="email-description"
            />
            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 hover:scale-105 h-14 px-8 text-lg transition-all duration-300 shadow-lg"
              aria-describedby="email-description"
            >
              Subscribe
            </Button>
          </form>
          <p id="email-description" className="sr-only">
            Subscribe to receive updates about Centra and new features
          </p>
        </div>
      </section>

      <footer className="border-t border-border py-16 px-6" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <Image
              src="/centra-wordmark.png"
              alt="Centra"
              width={200}
              height={60}
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-foreground mb-4">Centra App</h4>
              <nav className="space-y-2 text-sm text-muted-foreground" aria-label="Centra App links">
                <div>
                  <a
                    href="/download"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Download
                  </a>
                </div>
                <div>
                  <a
                    href="/features"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Features
                  </a>
                </div>
                <div>
                  <a
                    href="/support"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Support
                  </a>
                </div>
              </nav>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Developers</h4>
              <nav className="space-y-2 text-sm text-muted-foreground" aria-label="Developers links">
                <div>
                  <a
                    href="/developers"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Documentation
                  </a>
                </div>
                <div>
                  <a
                    href="/api"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    API
                  </a>
                </div>
              </nav>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Company</h4>
              <nav className="space-y-2 text-sm text-muted-foreground" aria-label="Company links">
                <div>
                  <a
                    href="/about"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    About
                  </a>
                </div>
                <div>
                  <a
                    href="/blog"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Blog
                  </a>
                </div>
              </nav>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Legal</h4>
              <nav className="space-y-2 text-sm text-muted-foreground" aria-label="Legal links">
                <div>
                  <a
                    href="/terms"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Terms
                  </a>
                </div>
                <div>
                  <a
                    href="/privacy"
                    className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  >
                    Privacy
                  </a>
                </div>
              </nav>
            </div>
          </div>
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-muted-foreground mb-4 md:mb-0">© 2024 Centra. All rights reserved.</div>
              <nav className="flex space-x-6 text-sm text-muted-foreground" aria-label="Social media links">
                <a
                  href="https://x.com/Centracurrency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  aria-label="Follow us on X (Twitter)"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://www.facebook.com/centracurrency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  aria-label="Follow us on Facebook"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/company/centracurrency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  aria-label="Connect on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.instagram.com/centracurrency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground focus:outline-none focus:ring-2 focus:ring-[#1C60FF] rounded"
                  aria-label="Follow us on Instagram"
                >
                  Instagram
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
