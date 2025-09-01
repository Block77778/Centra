"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

export default function TeamPage() {
  const { toast } = useToast()

  const handleGetStarted = () => {
    window.location.href = "/#newsletter-section"
  }

  const handleLinkedInClick = (name: string) => {
    toast({
      title: "LinkedIn Profile",
      description: `${name}'s LinkedIn profile would open here in a real application.`,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background">
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
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <a href="/" className="text-foreground hover:text-[#1C60FF] transition-colors duration-200">
                  Home
                </a>
                <a
                  href="/#newsletter-section"
                  className="text-foreground hover:text-[#1C60FF] transition-colors duration-200"
                >
                  Buy Centra
                </a>
                <a
                  href="/team"
                  className="text-foreground hover:text-[#1C60FF] font-medium transition-colors duration-200"
                >
                  Meet the Team
                </a>
                <a href="/developers" className="text-foreground hover:text-[#1C60FF] transition-colors duration-200">
                  Developer Hub
                </a>
                <a href="/community" className="text-foreground hover:text-[#1C60FF] transition-colors duration-200">
                  Community
                </a>
                <a href="/faq" className="text-foreground hover:text-[#1C60FF] transition-colors duration-200">
                  FAQs
                </a>
                <a href="/blog" className="text-foreground hover:text-[#1C60FF] transition-colors duration-200">
                  Blog
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGetStarted}
                className="text-sm bg-transparent hover:bg-gray-50 hover:border-[#1C60FF] transition-all duration-200"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Transparency & Trust</p>
            <h1 className="text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
              Meet the Team & Open Source Contributors
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Building the future of money with transparency, expertise, and community collaboration.
            </p>
          </div>

          {/* Leadership Profiles */}
          <div className="mb-20">
            <h2 className="text-2xl font-medium text-foreground mb-8 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border border-border bg-background hover:shadow-xl hover:scale-105 transition-all duration-300 text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1C60FF] to-[#1C60FF] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-medium">
                  AS
                </div>
                <CardTitle className="text-xl font-medium text-foreground mb-2">Alex Smith</CardTitle>
                <p className="text-muted-foreground mb-4">CEO & Co-Founder</p>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Former Goldman Sachs VP with 15 years in fintech. Led digital transformation initiatives at three
                  Fortune 500 companies.
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLinkedInClick("Alex Smith")}
                  className="bg-transparent hover:bg-gray-50 hover:border-[#1C60FF] transition-all duration-200"
                >
                  LinkedIn Profile
                </Button>
              </Card>

              <Card className="border border-border bg-background hover:shadow-xl hover:scale-105 transition-all duration-300 text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1C60FF] to-[#1C60FF] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-medium">
                  MJ
                </div>
                <CardTitle className="text-xl font-medium text-foreground mb-2">Maria Johnson</CardTitle>
                <p className="text-muted-foreground mb-4">CTO & Co-Founder</p>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Former Ethereum core developer. PhD in Cryptography from MIT. Built scalable blockchain infrastructure
                  for 10M+ users.
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLinkedInClick("Maria Johnson")}
                  className="bg-transparent hover:bg-gray-50 hover:border-[#1C60FF] transition-all duration-200"
                >
                  LinkedIn Profile
                </Button>
              </Card>

              <Card className="border border-border bg-background hover:shadow-xl hover:scale-105 transition-all duration-300 text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1C60FF] to-[#1C60FF] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-medium">
                  DL
                </div>
                <CardTitle className="text-xl font-medium text-foreground mb-2">David Lee</CardTitle>
                <p className="text-muted-foreground mb-4">Head of Economics</p>
                <CardDescription className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Former Federal Reserve economist. Published researcher on monetary policy and digital currencies.
                  Harvard Economics PhD.
                </CardDescription>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLinkedInClick("David Lee")}
                  className="bg-transparent hover:bg-gray-50 hover:border-[#1C60FF] transition-all duration-200"
                >
                  LinkedIn Profile
                </Button>
              </Card>
            </div>
          </div>

          {/* Advisors & Partners */}
          <div className="mb-20">
            <h2 className="text-2xl font-medium text-foreground mb-8 text-center">Advisors & Partners</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">A16Z</span>
                </div>
                <p className="text-sm text-muted-foreground">Strategic Investor</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">CB</span>
                </div>
                <p className="text-sm text-muted-foreground">Coinbase Ventures</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">P</span>
                </div>
                <p className="text-sm text-muted-foreground">Paradigm</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-muted-foreground">SV</span>
                </div>
                <p className="text-sm text-muted-foreground">Sequoia Ventures</p>
              </div>
            </div>
          </div>

          {/* Open Source Contributor Wall */}
          <div>
            <h2 className="text-2xl font-medium text-foreground mb-8 text-center">Open Source Contributors</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { username: "cryptodev", commits: 247 },
                { username: "blockbuilder", commits: 189 },
                { username: "defimaster", commits: 156 },
                { username: "chaincode", commits: 134 },
                { username: "webthree", commits: 98 },
                { username: "smartdev", commits: 87 },
                { username: "noderunner", commits: 76 },
                { username: "gasoptim", commits: 65 },
                { username: "soliditydev", commits: 54 },
                { username: "rustchain", commits: 43 },
                { username: "goblock", commits: 32 },
                { username: "pythonweb3", commits: 21 },
              ].map((contributor, index) => (
                <Card
                  key={index}
                  className="border border-border bg-background hover:shadow-sm transition-shadow text-center p-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1C60FF] to-[#1C60FF] rounded-full mx-auto mb-3 flex items-center justify-center text-white text-sm font-medium">
                    {contributor.username.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">@{contributor.username}</p>
                  <p className="text-xs text-muted-foreground">{contributor.commits} commits</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
