import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import prisma from "@/lib/prisma";
import { MessageSquare, TrendingUp, Users, Wrench } from "lucide-react";
import * as Icons from "lucide-react";

async function getForumData() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      threads: {
        take: 1,
        orderBy: { updatedAt: "desc" },
        include: {
          author: { select: { name: true, image: true } },
        },
      },
      _count: {
        select: { threads: true },
      },
    },
  });

  const totalThreads = await prisma.thread.count();
  const totalUsers = await prisma.user.count();
  const recentThreads = await prisma.thread.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, handle: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { posts: true } },
    },
  });

  return { categories, totalThreads, totalUsers, recentThreads };
}

export default async function ForumPage() {
  const { categories, totalThreads, totalUsers, recentThreads } = await getForumData();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" />
            <Link href="/" className="font-bold text-xl text-foreground">
              RepairLoader
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </Link>
            <Link href="/forum" className="text-sm text-foreground font-medium">
              Forum
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/forum/new">New Thread</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalThreads}</p>
                  <p className="text-sm text-muted-foreground">Discussions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalUsers}</p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{categories.length}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Forum Categories</h1>
              <p className="text-muted-foreground">
                Get help, share knowledge, and connect with the community
              </p>
            </div>

            <div className="space-y-3">
              {categories.map((category) => {
                const IconComponent = category.icon
                  ? (Icons as any)[category.icon]
                  : MessageSquare;
                const latestThread = category.threads[0];

                return (
                  <Link key={category.id} href={`/forum/c/${category.slug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-foreground">
                                {category.name}
                              </h3>
                              <Badge variant="secondary">
                                {category._count.threads}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {category.desc}
                            </p>
                            {latestThread && (
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Latest:</span>
                                <span className="font-medium text-foreground truncate">
                                  {latestThread.title}
                                </span>
                                <span>•</span>
                                <span>{latestThread.author.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Recent Threads */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Recent Discussions
                </CardTitle>
                <CardDescription>Latest activity in the forum</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentThreads.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No threads yet. Be the first to start a discussion!
                    </p>
                  ) : (
                    recentThreads.map((thread) => (
                      <Link
                        key={thread.id}
                        href={`/forum/t/${thread.id}-${thread.slug}`}
                        className="block group"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {thread.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline" className="text-xs">
                              {thread.category.name}
                            </Badge>
                            <span>•</span>
                            <span>{thread.author.name || thread.author.handle}</span>
                            <span>•</span>
                            <span>{thread._count.posts} replies</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Start a new discussion</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/forum/new">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Create Thread
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
