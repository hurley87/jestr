import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TokenCard } from "@/components/token-card"
import { JestCard } from "@/components/jest-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Mock data for demonstration
const launchedTokens = [
  {
    id: "1",
    name: "Circus Token",
    ticker: "CIRCUS",
    image: "/placeholder.svg?height=300&width=300",
    creator: {
      username: "circusfun",
      platform: "x" as const,
      profileUrl: "https://twitter.com/circusfun",
    },
    contributors: Array(8)
      .fill(null)
      .map((_, i) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${i}`,
      })),
    marketcap: 1250000,
  },
  {
    id: "2",
    name: "Jestr Coin",
    ticker: "JEST",
    image: "/placeholder.svg?height=300&width=300",
    creator: {
      username: "jestrworld",
      platform: "farcaster" as const,
      profileUrl: "https://warpcast.com/jestrworld",
    },
    contributors: Array(12)
      .fill(null)
      .map((_, i) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${i}`,
      })),
    marketcap: 980000,
  },
  {
    id: "3",
    name: "Pixel Finance",
    ticker: "PIXEL",
    image: "/placeholder.svg?height=300&width=300",
    creator: {
      username: "pixeldev",
      platform: "x" as const,
      profileUrl: "https://twitter.com/pixeldev",
    },
    contributors: Array(5)
      .fill(null)
      .map((_, i) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${i}`,
      })),
    marketcap: 750000,
  },
  {
    id: "4",
    name: "GameBoy Token",
    ticker: "GBT",
    image: "/placeholder.svg?height=300&width=300",
    creator: {
      username: "retrodev",
      platform: "farcaster" as const,
      profileUrl: "https://warpcast.com/retrodev",
    },
    contributors: Array(9)
      .fill(null)
      .map((_, i) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${i}`,
      })),
    marketcap: 520000,
  },
]

const activeJests = [
  {
    id: "1",
    name: "Solana Circus",
    ticker: "SCIRC",
    image: "/placeholder.svg?height=48&width=48",
    creator: {
      username: "circusfun",
      platform: "x" as const,
      profileUrl: "https://twitter.com/circusfun",
    },
    launchAmount: 10,
    currentAmount: 7.5,
    endTime: new Date(Date.now() + 35 * 60 * 1000), // 35 minutes from now
    contributionAmount: 0.25,
  },
  {
    id: "2",
    name: "Pixel Game",
    ticker: "PXLG",
    image: "/placeholder.svg?height=48&width=48",
    creator: {
      username: "pixeldev",
      platform: "x" as const,
      profileUrl: "https://twitter.com/pixeldev",
    },
    launchAmount: 10,
    currentAmount: 4.25,
    endTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
    contributionAmount: 0.25,
  },
  {
    id: "3",
    name: "Retro Finance",
    ticker: "RETRO",
    image: "/placeholder.svg?height=48&width=48",
    creator: {
      username: "retrodev",
      platform: "farcaster" as const,
      profileUrl: "https://warpcast.com/retrodev",
    },
    launchAmount: 10,
    currentAmount: 2.75,
    endTime: new Date(Date.now() + 55 * 60 * 1000), // 55 minutes from now
    contributionAmount: 0.25,
  },
  {
    id: "4",
    name: "Mario World",
    ticker: "MARIO",
    image: "/placeholder.svg?height=48&width=48",
    creator: {
      username: "mariodev",
      platform: "x" as const,
      profileUrl: "https://twitter.com/mariodev",
    },
    launchAmount: 10,
    currentAmount: 1.5,
    endTime: new Date(Date.now() + 60 * 60 * 1000), // 60 minutes from now
    contributionAmount: 0.25,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-6 mx-auto">
        {/* Launched Tokens Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-pixel text-xl text-white">Top Tokens</h2>
            <Link href="/tokens">
              <Button variant="outline" className="text-jestr-blue border-jestr-blue bg-black group">
                <span className="group-hover:text-white cursor-pointer">View All</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {launchedTokens.map((token) => (
              <TokenCard key={token.id} {...token} />
            ))}
          </div>
        </section>

        {/* Active Pre-sales Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-pixel text-xl text-white">Active Pre-sales</h2>
            <Button variant="outline" className="text-jestr-purple bg-black border-jestr-purple group">
              <span className="group-hover:text-white">Create Pre-sale</span>
            </Button>
          </div>

          <div className="space-y-3">
            {activeJests.map((jest) => (
              <JestCard key={jest.id} {...jest} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

