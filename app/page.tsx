import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, MessageSquare, Info, Network, HardDrive, Zap } from "lucide-react";

export default function Home() {
  const tools = [
    {
      name: "System Info",
      desc: "Check your system specifications instantly",
      icon: Info,
      href: "/tools/system-info",
    },
    {
      name: "Network Doctor",
      desc: "Diagnose internet connection issues",
      icon: Network,
      href: "/tools/network-doctor",
    },
    {
      name: "Disk Health",
      desc: "Monitor your drive's health status",
      icon: HardDrive,
      href: "/tools/disk-health",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">RepairLoader</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-sm hover:text-primary transition-colors">
              Tools
            </Link>
            <Link href="/forum" className="text-sm hover:text-primary transition-colors">
              Forum
            </Link>
            <Link href="/guides" className="text-sm hover:text-primary transition-colors">
              Guides
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          <Zap className="w-3 h-3 mr-1" />
          Beta Launch
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Fix Tech Problems.
          <br />
          Share Solutions.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Free diagnostic tools, expert community, and step-by-step guides to solve Windows, Mac, and Linux issues.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/tools">
              <Wrench className="w-4 h-4 mr-2" />
              Browse Tools
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/forum">
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask a Question
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Popular Diagnostic Tools</h2>
          <p className="text-muted-foreground">
            Run instantly in your browser. No installation required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Card key={tool.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <tool.icon className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-xl">{tool.name}</CardTitle>
                <CardDescription>{tool.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href={tool.href}>Run Tool</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RepairLoader. Open-source tech repair platform.</p>
        </div>
      </footer>
    </div>
  );
}
