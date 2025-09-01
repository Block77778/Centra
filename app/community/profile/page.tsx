"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Share2,
  Edit,
  MapPin,
  Calendar,
  LinkIcon,
  Users,
  TrendingUp,
  BookOpen,
  Code,
  Home,
  ArrowLeft,
  Camera,
  Save,
  X,
  RefreshCw,
} from "lucide-react"
import PersistentCTA from "../../../components/PersistentCTA"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  username: string
  display_name: string
  bio?: string
  location?: string
  website?: string
  avatar_url?: string
  created_at: string
}

interface Post {
  id: string
  content: string
  created_at: string
  likes_count?: number
  comments_count?: number
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
  })
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        await fetchProfile(user.id)
        await fetchUserPosts(user.id)
      } else {
        // Redirect to login if not authenticated
        window.location.href = "/auth/login"
      }
      setLoading(false)
    }
    getUser()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error

      setProfile(profile)
      setEditForm({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
      })
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive",
      })
    }
  }

  const fetchUserPosts = async (userId: string) => {
    try {
      const { data: posts, error } = await supabase
        .from("posts")
        .select(`
          *,
          likes (count),
          comments (count)
        `)
        .eq("author_id", userId)
        .order("created_at", { ascending: false })

      if (error) throw error

      const postsWithStats =
        posts?.map((post) => ({
          ...post,
          likes_count: post.likes?.[0]?.count || 0,
          comments_count: post.comments?.[0]?.count || 0,
        })) || []

      setUserPosts(postsWithStats)
    } catch (error) {
      console.error("[v0] Error fetching user posts:", error)
    }
  }

  const handleSaveProfile = async () => {
    if (!user || !profile) return

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: editForm.display_name,
          bio: editForm.bio,
          location: editForm.location,
          website: editForm.website,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      // Update local state
      setProfile({
        ...profile,
        display_name: editForm.display_name,
        bio: editForm.bio,
        location: editForm.location,
        website: editForm.website,
      })

      setIsEditing(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    if (profile) {
      setEditForm({
        display_name: profile.display_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
      })
    }
    setIsEditing(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold">Profile Not Found</h2>
            <p className="text-muted-foreground">Please sign in to view your profile</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <PersistentCTA />

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/community"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Feed
              </Link>
              <div className="text-xl font-bold text-primary">Profile</div>
            </div>

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
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-t-lg relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#1C60FF]/20 to-[#1C60FF]/5" />
              {isEditing && (
                <Button variant="secondary" size="sm" className="absolute top-4 right-4">
                  <Camera className="w-4 h-4 mr-2" />
                  Change Cover
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 relative">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-background">
                      <AvatarImage src={profile.avatar_url || "/user-profile-illustration.png"} />
                      <AvatarFallback className="text-2xl">{profile.display_name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="pb-4">
                    {!isEditing ? (
                      <>
                        <h1 className="text-2xl font-bold text-foreground">{profile.display_name}</h1>
                        <p className="text-muted-foreground">@{profile.username}</p>
                        <p className="text-foreground mt-2 max-w-md">{profile.bio || "No bio yet."}</p>
                      </>
                    ) : (
                      <div className="space-y-2 min-w-[300px]">
                        <Input
                          value={editForm.display_name}
                          onChange={(e) => setEditForm({ ...editForm, display_name: e.target.value })}
                          placeholder="Display name"
                          className="font-bold text-lg"
                        />
                        <Input value={`@${profile.username}`} disabled className="text-muted-foreground" />
                        <Textarea
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          placeholder="Bio"
                          className="resize-none"
                          rows={3}
                        />
                      </div>
                    )}

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      {!isEditing ? (
                        <>
                          {profile.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {profile.location}
                            </div>
                          )}
                          {profile.website && (
                            <div className="flex items-center gap-1">
                              <LinkIcon className="w-4 h-4" />
                              <a
                                href={profile.website}
                                className="text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {profile.website.replace(/^https?:\/\//, "")}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Joined{" "}
                            {new Date(profile.created_at).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="flex gap-2 w-full">
                          <Input
                            value={editForm.location}
                            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            placeholder="Location"
                            className="flex-1"
                          />
                          <Input
                            value={editForm.website}
                            onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                            placeholder="Website"
                            className="flex-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 sm:mt-0">
                  {!isEditing ? (
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleCancelEdit}
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">{userPosts.length}</div>
                  <div className="text-sm text-muted-foreground">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">Following</div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {userPosts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
                  <p className="text-muted-foreground mb-4">Share your thoughts with the community!</p>
                  <Button asChild>
                    <Link href="/community">Create Your First Post</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              userPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={profile.avatar_url || "/user-profile-illustration.png"} />
                          <AvatarFallback>{profile.display_name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{profile.display_name}</h3>
                            <span className="text-sm text-muted-foreground">@{profile.username}</span>
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                              Community Member
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">{post.content}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes_count || 0}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments_count || 0}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">No liked posts yet</h3>
                <p className="text-muted-foreground">Posts you like will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">No comments yet</h3>
                <p className="text-muted-foreground">Your comments on posts will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-foreground mb-2">Activity coming soon</h3>
                <p className="text-muted-foreground">Your activity timeline will be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
