import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { JestTimer } from "@/components/jest-timer"
import Image from "next/image"
import Link from "next/link"
import { formatSOL } from "@/lib/utils"
import { ArrowLeft, Share2, ExternalLink } from "lucide-react"

interface JestDetailProps {
  params: Promise<{
    id: string
  }>
}

export default async function JestDetail({ params }: JestDetailProps) {
  const { id } = await params

  // Mock data for demonstration
  const jestData = {
    id,
    name: "Solana Circus",
    ticker: "SCIRC",
    image: "/placeholder.svg?height=200&width=200",
    creator: {
      username: "circusfun",
      platform: "x" as const,
      profileUrl: "https://twitter.com/circusfun",
    },
    launchAmount: 10,
    currentAmount: 7.5,
    endTime: new Date(Date.now() + 35 * 60 * 1000), // 35 minutes from now
    contributionAmount: 0.25,
    contributors: Array(15)
      .fill(null)
      .map((_, i) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${i}`,
      })),
    userContribution: 0.5, // Mock user's contribution
    postUrl: "https://twitter.com/circusfun/status/1234567890",
  }

  const progress = (jestData.currentAmount / jestData.launchAmount) * 100

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8 mx-auto">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <Card className={`gameboy-container overflow-hidden`}>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative h-40 w-40 mx-auto md:mx-0 rounded-lg overflow-hidden border-4 border-black">
                <Image src={jestData.image || "/placeholder.svg"} alt={jestData.name} fill className="object-cover" />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="font-pixel text-xl text-white">{jestData.name}</h1>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-jestr-yellow font-medium">${jestData.ticker}</span>
                    <span className="mx-2 text-sm text-muted-foreground">by</span>
                    <Link
                      href={jestData.creator.profileUrl}
                      className="text-sm text-jestr-blue hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @{jestData.creator.username}
                    </Link>
                    <span className="ml-2 text-sm text-muted-foreground">
                      on {jestData.creator.platform === "x" ? "X" : "Farcaster"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1 min-w-[120px]">
                    <p className="text-xs text-muted-foreground">Time Remaining</p>
                    <JestTimer endTime={jestData.endTime} />
                  </div>

                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1 min-w-[120px]">
                    <p className="text-xs text-muted-foreground">Your Contribution</p>
                    <p className="font-pixel text-jestr-green text-lg">{formatSOL(jestData.userContribution)}</p>
                  </div>

                  <div className="bg-jestr-background/50 rounded-lg p-3 flex-1 min-w-[120px]">
                    <p className="text-xs text-muted-foreground">Total Raised</p>
                    <p className="font-pixel text-white text-lg">{formatSOL(jestData.currentAmount)}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-jestr-purple hover:bg-jestr-purple/80 font-pixel text-sm py-2 h-auto"
                  >
                    Contribute {formatSOL(jestData.contributionAmount)}
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="border-jestr-blue text-jestr-blue hover:bg-jestr-blue/10"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>

                  <Link href={jestData.postUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-jestr-blue text-jestr-blue hover:bg-jestr-blue/10"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View Original Post</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-pixel text-jestr-green">{progress.toFixed(0)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-6 bg-jestr-background border-2 border-black"
                indicatorClassName="bg-jestr-green"
              />

              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground">Raised: </span>
                  <span className="font-medium">{formatSOL(jestData.currentAmount)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Goal: </span>
                  <span className="font-medium">{formatSOL(jestData.launchAmount)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-pixel text-sm text-white mb-3">Contributors</h3>
              <div className="flex flex-wrap gap-2">
                {jestData.contributors.map((contributor, index) => (
                  <div
                    key={index}
                    className="relative h-8 w-8 rounded-full border-2 border-jestr-card overflow-hidden"
                    title={contributor.username}
                  >
                    <Image
                      src={contributor.avatar || "/placeholder.svg"}
                      alt={contributor.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-jestr-background/50 rounded-lg p-4">
              <h3 className="font-pixel text-sm text-white mb-2">About This Pre-sale</h3>
              <p className="text-sm text-muted-foreground">
                This is a pre-sale for {jestData.name} ({jestData.ticker}). The goal is to raise{" "}
                {formatSOL(jestData.launchAmount)} within the time limit. If the goal is reached, the token will be
                launched and distributed to contributors proportionally to their contribution. If the goal is not
                reached, all contributions will be refunded.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

