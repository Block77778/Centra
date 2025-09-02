"use client"

import { useCallback } from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Bell,
  Mail,
  Home,
  Compass,
  Settings,
  Plus,
  MoreHorizontal,
  Menu,
  X,
  Users,
  TrendingUp,
  BookOpen,
  Code,
  ImageIcon,
  Send,
  RefreshCw,
} from "lucide-react"
import PersistentCTA from "../../components/PersistentCTA"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRealtimePosts, useRealtimeComments } from "@/hooks/use-realtime"
import { createClient } from "@/lib/supabase/client"

export default function CentraSocialPage() {
  const { posts: realtimePosts, loading: postsLoading, refetch: refetchPosts } = useRealtimePosts()
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [newPost, setNewPost] = useState("")
  const [newPostTitle, setNewPostTitle] = useState("")
  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({})
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({})
  const [notifications, setNotifications] = useState<string[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [followedUsers, setFollowedUsers] = useState<string[]>([])
  const { toast } = useToast()

  const [liveStats, setLiveStats] = useState({
    activeMembers: 0,
    postsThisMonth: 0,
    totalPosts: 0,
    contributors: 0,
  })

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alex Chen",
      handle: "@alexchen",
      avatar: "/asian-male-developer.png",
      level: "Core Contributor",
      time: "2h",
      title: "Thoughts on Centra's inflation-proof mechanism",
      content:
        "I've been analyzing the fixed supply model and its implications for long-term stability. The mathematical approach seems sound, but I'd love to hear thoughts on potential edge cases...",
      image: "/cryptocurrency-chart-analysis.png",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["Economics", "Discussion"],
      category: "Discussion",
      liked: false,
      commentsList: [
        {
          id: 1,
          user: "Sarah Kim",
          handle: "@sarahkim",
          avatar: "/asian-female-designer.png",
          content: "Great analysis! Have you considered the impact on transaction fees?",
          time: "1h",
        },
        {
          id: 2,
          user: "David Rodriguez",
          handle: "@daviddev",
          avatar: "/hispanic-male-developer.png",
          content: "This is exactly what we need for long-term stability.",
          time: "45m",
        },
      ],
    },
    {
      id: 2,
      user: "Sarah Kim",
      handle: "@sarahkim",
      avatar: "/asian-female-designer.png",
      level: "Community Member",
      time: "5h",
      title: "Feature Request: Mobile wallet improvements",
      content:
        "The current mobile experience could use some UX improvements. Here are some mockups I created for better transaction flow...",
      image: "/mobile-wallet-ui-mockup.png",
      likes: 18,
      comments: 12,
      shares: 5,
      tags: ["Feature Request", "UX"],
      category: "Ideas",
      liked: false,
      commentsList: [
        {
          id: 1,
          user: "Alex Chen",
          handle: "@alexchen",
          avatar: "/asian-male-developer.png",
          content: "Love the mockups! The swipe gesture for quick send is brilliant.",
          time: "3h",
        },
      ],
    },
    {
      id: 3,
      user: "David Rodriguez",
      handle: "@daviddev",
      avatar: "/hispanic-male-developer.png",
      level: "Developer",
      time: "1d",
      title: "Built a Centra price tracker - open source",
      content:
        "Just finished building a real-time price tracking dashboard for Centra. Code is available on GitHub, would love feedback and contributions!",
      image: null,
      likes: 31,
      comments: 15,
      shares: 8,
      tags: ["Project", "Open Source"],
      category: "Announcements",
      liked: false,
      commentsList: [
        {
          id: 1,
          user: "Crypto Mike",
          handle: "@cryptomike",
          avatar: "/crypto-user.png",
          content: "This is awesome! Just starred the repo. Will contribute soon.",
          time: "12h",
        },
        {
          id: 2,
          user: "DeFi Sarah",
          handle: "@defisarah",
          avatar: "/defi-user.png",
          content: "Can you add support for multiple exchanges?",
          time: "8h",
        },
      ],
    },
  ])

  const simulatedPosts = [
    {
      user: "Crypto Mike",
      handle: "@cryptomike",
      avatar: "/crypto-user.png",
      level: "Community Member",
      title: "Market analysis: Centra's performance this week",
      content:
        "Looking at the charts, Centra has shown remarkable stability compared to other cryptocurrencies. The fixed supply model is really proving its worth!",
      tags: ["Analysis", "Market"],
      category: "Discussion",
    },
    {
      user: "DeFi Sarah",
      handle: "@defisarah",
      avatar: "/defi-user.png",
      level: "Developer",
      title: "New DeFi integration proposal",
      content:
        "I've been working on a proposal for integrating Centra with major DeFi protocols. This could open up new opportunities for yield farming and liquidity provision.",
      tags: ["DeFi", "Proposal"],
      category: "Ideas",
    },
    {
      user: "Blockchain Dev",
      handle: "@blockdev",
      avatar: "/developer-working.png",
      level: "Core Contributor",
      title: "Smart contract audit results",
      content:
        "Just completed the security audit for the latest smart contract updates. Everything looks solid - no critical vulnerabilities found!",
      tags: ["Security", "Development"],
      category: "Announcements",
    },
  ]

  const handleFollowUser = (handle: string) => {
    if (followedUsers.includes(handle)) {
      setFollowedUsers(followedUsers.filter((user) => user !== handle))
      toast({
        title: "Unfollowed",
        description: `You unfollowed ${handle}`,
      })
    } else {
      setFollowedUsers([...followedUsers, handle])
      toast({
        title: "Following",
        description: `You are now following ${handle}`,
      })
    }
  }

  const handleSidebarNavigation = (section: string) => {
    toast({
      title: `${section} Section`,
      description: `${section} section would open here in a real application.`,
    })
  }

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "All") return true
    return post.category === activeFilter
  })

  const addRandomActivity = useCallback(() => {
    const activities = [
      "New post from community member",
      "Someone liked your post",
      "New comment on trending discussion",
      "User joined the community",
      "New feature announcement",
    ]

    const randomActivity = activities[Math.floor(Math.random() * activities.length)]
    setNotifications((prev) => [randomActivity, ...prev.slice(0, 4)])

    // Randomly update post engagement
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (Math.random() < 0.3) {
          // 30% chance to update each post
          const likeChange = Math.random() < 0.7 ? 1 : 0
          const commentChange = Math.random() < 0.4 ? 1 : 0
          return {
            ...post,
            likes: post.likes + likeChange,
            comments: post.comments + commentChange,
          }
        }
        return post
      }),
    )
  }, [])

  const addSimulatedPost = useCallback(() => {
    const randomPost = simulatedPosts[Math.floor(Math.random() * simulatedPosts.length)]
    const newPost = {
      id: Date.now(),
      ...randomPost,
      time: "now",
      likes: Math.floor(Math.random() * 10),
      comments: Math.floor(Math.random() * 5),
      shares: Math.floor(Math.random() * 3),
      liked: false,
      commentsList: [],
      image: null,
    }

    setPosts((prevPosts) => [newPost, ...prevPosts])
    setNotifications((prev) => [`New post: ${newPost.title}`, ...prev.slice(0, 4)])
  }, [simulatedPosts])

  useEffect(() => {
    const activityInterval = setInterval(addRandomActivity, 15000) // Every 15 seconds
    const postInterval = setInterval(addSimulatedPost, 45000) // Every 45 seconds

    return () => {
      clearInterval(activityInterval)
      clearInterval(postInterval)
    }
  }, [addRandomActivity, addSimulatedPost])

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const supabase = createClient()

        // Get total users count
        const { count: usersCount } = await supabase.from("profiles").select("*", { count: "exact", head: true })

        // Get posts this month
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: postsThisMonth } = await supabase
          .from("posts")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfMonth.toISOString())

        // Get total posts
        const { count: totalPosts } = await supabase.from("posts").select("*", { count: "exact", head: true })

        // Get contributors (users who have posted)
        const { data: contributors } = await supabase.from("posts").select("author_id").not("author_id", "is", null)

        const uniqueContributors = new Set(contributors?.map((p) => p.author_id) || []).size

        setLiveStats({
          activeMembers: usersCount || 0,
          postsThisMonth: postsThisMonth || 0,
          totalPosts: totalPosts || 0,
          contributors: uniqueContributors,
        })
      } catch (error) {
        console.error("Error fetching live stats:", error)
      }
    }

    if (user) {
      fetchLiveStats()
    }
  }, [user])

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create posts.",
        variant: "destructive",
      })
      return
    }

    if (newPost.trim() || newPostTitle.trim()) {
      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newPost,
            title: newPostTitle,
          }),
        })

        if (response.ok) {
          setNewPost("")
          setNewPostTitle("")
          setIsCreatingPost(false)
          toast({
            title: "Post Created",
            description: "Your post has been published successfully.",
          })
          refetchPosts()
        } else {
          throw new Error("Failed to create post")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to create post. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      })

      if (response.ok) {
        refetchPosts() // Refresh to get updated like counts
      } else {
        throw new Error("Failed to toggle like")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to comment.",
        variant: "destructive",
      })
      return
    }

    const commentText = newComment[postId]?.trim()
    if (commentText) {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentText,
          }),
        })

        if (response.ok) {
          setNewComment((prev) => ({
            ...prev,
            [postId]: "",
          }))
          refetchPosts() // Refresh to get updated comment counts
          toast({
            title: "Comment Added",
            description: "Your comment has been posted.",
          })
        } else {
          throw new Error("Failed to add comment")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add comment. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleComment = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleShare = (postId: string) => {
    console.log("[v0] Share clicked for post:", postId)
    setNotifications((prev) => ["You shared a post", ...prev.slice(0, 4)])
    toast({
      title: "Post Shared",
      description: "Post has been shared to your timeline.",
    })
  }

  const refreshFeed = () => {
    refetchPosts()
    setNotifications((prev) => ["Feed refreshed", ...prev.slice(0, 4)])
    toast({
      title: "Feed Refreshed",
      description: "Latest posts have been loaded.",
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold">Join Centra Community</h2>
            <p className="text-muted-foreground">Sign in to connect with the community</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/auth/signup">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (postsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading community posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PersistentCTA />

      {/* ... existing header code ... */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/centra-wordmark.png"
                alt="Centra Social"
                width={120}
                height={36}
                className="hover:scale-110 transition-transform duration-200"
              />
            </Link>

            {/* Desktop Navigation Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
              <Link
                href="/team"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Team
              </Link>
              <Link
                href="/developers"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Code className="w-4 h-4" />
                Developers
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Blog
              </Link>
              <Link
                href="/faq"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                FAQ
              </Link>
            </nav>

            {/* ... existing header content ... */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search Centra Social..."
                  className="pl-10 bg-muted border-0 focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => (window.location.href = "/")}
              >
                <Home className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => toast({ title: "Explore", description: "Explore section coming soon!" })}
              >
                <Compass className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Button>
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-3">Recent Activity</h3>
                      <div className="space-y-2">
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <div key={index} className="text-sm text-muted-foreground p-2 bg-muted rounded">
                              {notification}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">No new notifications</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary"
                onClick={() => toast({ title: "Messages", description: "Messages section coming soon!" })}
              >
                <Mail className="w-5 h-5" />
              </Button>
              <Link href="/community/profile">
                <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                  <AvatarImage src="/user-profile-illustration.png" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-muted-foreground hover:text-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* ... existing mobile menu ... */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-border bg-card">
              <nav className="py-4 space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  Home
                </Link>
                <Link
                  href="/team"
                  className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Users className="w-4 h-4" />
                  Team
                </Link>
                <Link
                  href="/developers"
                  className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Code className="w-4 h-4" />
                  Developers
                </Link>
                <Link
                  href="/blog"
                  className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </Link>
                <Link
                  href="/faq"
                  className="flex items-center gap-3 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <TrendingUp className="w-4 h-4" />
                  FAQ
                </Link>
                <div className="px-4 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search Centra Social..."
                      className="pl-10 bg-muted border-0 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* ... existing sidebar ... */}
          <aside className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-foreground">Quick Links</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-primary"
                  onClick={() => (window.location.href = "/")}
                >
                  <Home className="w-4 h-4 mr-3" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-primary"
                  onClick={() => toast({ title: "Explore", description: "Explore section coming soon!" })}
                >
                  <Compass className="w-4 h-4 mr-3" />
                  Explore
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-primary"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-primary"
                  onClick={() => toast({ title: "Settings", description: "Settings section coming soon!" })}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-semibold text-foreground">Suggested Users</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Crypto Mike", handle: "@cryptomike", avatar: "/crypto-user.png" },
                  { name: "DeFi Sarah", handle: "@defisarah", avatar: "/defi-user.png" },
                  { name: "Blockchain Dev", handle: "@blockdev", avatar: "/developer-working.png" },
                ].map((suggestedUser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={suggestedUser.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{suggestedUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{suggestedUser.name}</p>
                        <p className="text-xs text-muted-foreground">{suggestedUser.handle}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (followedUsers.includes(suggestedUser.handle)) {
                          setFollowedUsers(followedUsers.filter((u) => u !== suggestedUser.handle))
                          toast({
                            title: "Unfollowed",
                            description: `You unfollowed ${suggestedUser.handle}`,
                          })
                        } else {
                          setFollowedUsers([...followedUsers, suggestedUser.handle])
                          toast({
                            title: "Following",
                            description: `You are now following ${suggestedUser.handle}`,
                          })
                        }
                      }}
                      className={
                        followedUsers.includes(suggestedUser.handle)
                          ? "bg-muted text-muted-foreground hover:bg-muted/80"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }
                    >
                      {followedUsers.includes(suggestedUser.handle) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-3">
            {/* Feed Header with Refresh */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Latest Posts</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={refreshFeed}
                className="flex items-center gap-2 bg-transparent"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>

            {/* ... existing create post section ... */}
            <Card className="mb-6">
              <CardContent className="p-4">
                {!isCreatingPost ? (
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/user-profile-illustration.png" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input
                        placeholder="What's on your mind about Centra?"
                        className="bg-muted border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                        onClick={() => setIsCreatingPost(true)}
                        readOnly
                      />
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setIsCreatingPost(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="/user-profile-illustration.png" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input
                          placeholder="Post title (optional)"
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          className="bg-muted border-0 focus:ring-2 focus:ring-primary mb-2"
                        />
                        <Textarea
                          placeholder="What's on your mind about Centra?"
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="bg-muted border-0 focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() =>
                            toast({
                              title: "Photo Upload",
                              description: "Photo upload coming soon!",
                            })
                          }
                        >
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Photo
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsCreatingPost(false)
                            setNewPost("")
                            setNewPostTitle("")
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          onClick={handleCreatePost}
                          disabled={!newPost.trim() && !newPostTitle.trim()}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border">
              {["All", "Discussion", "Ideas", "Questions", "Announcements"].map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(tab)}
                  className={`pb-2 px-1 transition-colors ${
                    activeFilter === tab
                      ? "border-b-2 border-primary text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {realtimePosts.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
                </Card>
              ) : (
                realtimePosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.profiles?.avatar_url || "/placeholder.svg"} />
                            <AvatarFallback>{post.profiles?.display_name?.[0] || "U"}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">
                                {post.profiles?.display_name || "Unknown User"}
                              </h3>
                              <span className="text-sm text-muted-foreground">
                                @{post.profiles?.username || "unknown"}
                              </span>
                              <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                                Community Member
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(post.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-4">{post.content}</p>

                      {post.image_url && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={post.image_url || "/placeholder.svg"}
                            alt="Post content"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`transition-colors ${
                              post.user_has_liked
                                ? "text-red-500 hover:text-red-600"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className={`w-4 h-4 mr-1 ${post.user_has_liked ? "fill-current" : ""}`} />
                            {post.likes_count || 0}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`transition-colors ${
                              showComments[post.id] ? "text-primary" : "text-muted-foreground hover:text-primary"
                            }`}
                            onClick={() => handleComment(post.id)}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments_count || 0}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-primary"
                            onClick={() => handleShare(post.id)}
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>

                      {/* Comments Section */}
                      {showComments[post.id] && (
                        <div className="mt-4 pt-4 border-t border-border">
                          {/* Add Comment Input */}
                          <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="/user-profile-illustration.png" />
                              <AvatarFallback>You</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Input
                                placeholder="Write a comment..."
                                value={newComment[post.id] || ""}
                                onChange={(e) =>
                                  setNewComment((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                className="bg-muted border-0 focus:ring-2 focus:ring-primary"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    handleAddComment(post.id)
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={() => handleAddComment(post.id)}
                                disabled={!newComment[post.id]?.trim()}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          <CommentsSection postId={post.id} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ... existing footer section ... */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Centra Social Stats</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                label: "Active Members",
                value: liveStats.activeMembers.toLocaleString(),
                icon: "👥",
                color: "text-[#1C60FF]",
              },
              {
                label: "Posts This Month",
                value: liveStats.postsThisMonth.toLocaleString(),
                icon: "💬",
                color: "text-secondary",
              },
              {
                label: "Total Posts",
                value: liveStats.totalPosts.toLocaleString(),
                icon: "📝",
                color: "text-[#1C60FF]",
              },
              {
                label: "Contributors",
                value: liveStats.contributors.toLocaleString(),
                icon: "🛠️",
                color: "text-secondary",
              },
            ].map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CommentsSection({ postId }: { postId: string }) {
  const { comments, loading } = useRealtimeComments(postId)

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading comments...</div>
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.profiles?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>{comment.profiles?.display_name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-foreground">
                {comment.profiles?.display_name || "Unknown User"}
              </span>
              <span className="text-xs text-muted-foreground">@{comment.profiles?.username || "unknown"}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-foreground">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
