import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TokenCard } from "@/components/token-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Mock data for demonstration
const allTokens = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: `${i + 1}`,
    name: `Token ${i + 1}`,
    ticker: `TKN${i + 1}`,
    image: `/placeholder.svg?height=300&width=300`,
    creator: {
      username: `creator${i + 1}`,
      platform: (i % 2 === 0 ? "x" : "farcaster") as "x" | "farcaster",
      profileUrl: i % 2 === 0 ? `https://twitter.com/creator${i + 1}` : `https://warpcast.com/creator${i + 1}`,
    },
    contributors: Array(Math.floor(Math.random() * 15) + 3)
      .fill(null)
      .map((_, j) => ({
        avatar: `/placeholder.svg?height=24&width=24`,
        username: `user${j}`,
      })),
    marketcap: Math.floor(Math.random() * 1000000) + 100000,
  }))

export default function TokensPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8 mx-auto">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Home</span>
        </Link>

        <h1 className="font-pixel text-2xl text-white mb-8">All Launched Tokens</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTokens.map((token) => (
            <TokenCard key={token.id} {...token} />
          ))}
        </div>


      </main>

      <Footer />
    </div>
  )
}

