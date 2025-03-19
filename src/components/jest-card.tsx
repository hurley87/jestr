"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { formatTimeRemaining } from "@/lib/utils"

interface JestCardProps {
  id: string
  name: string
  ticker: string
  image: string
  creator: {
    username: string
    platform: "x" | "farcaster"
    profileUrl: string
  }
  launchAmount: number
  currentAmount: number
  endTime: Date
  contributionAmount: number
  onContribute?: () => void
}

export function JestCard({
  id,
  name,
  ticker,
  image,
  creator,
  launchAmount,
  currentAmount,
  endTime,
  contributionAmount,
  onContribute,
}: JestCardProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("")
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const progress = (currentAmount / launchAmount) * 100

  const handleContribute = () => {
    setAnimate(true)
    setTimeout(() => setAnimate(false), 500)
    if (onContribute) onContribute()
  }

  return (
    <Link href={`/jest/${id}`}>
      <Card
        className={`gameboy-container overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${animate ? "animate-shake" : ""}`}
      >
        <CardContent className="p-3 space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-pixel text-jestr-green">{progress.toFixed(0)}%</span>
            </div>
            <Progress
              value={progress}
              className="h-3 bg-jestr-background border border-black [&>[data-slot=progress-indicator]]:bg-jestr-green"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-black">
              <Image src={image || `/placeholder.svg?height=48&width=48`} alt={name} fill className="object-cover" />
            </div>

            <div className="flex-1">
              <h3 className="font-pixel text-sm text-white truncate">{name}</h3>
              <div className="flex items-center">
                <span className="text-xs text-jestr-yellow font-medium">${ticker}</span>
                <span className="mx-1 text-xs text-muted-foreground">by</span>
                <span className="text-xs text-jestr-blue">@{creator.username}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Raised: </span>
              <span className="font-medium">{currentAmount} SOL</span>
            </div>
            <div>
              <span className="text-muted-foreground">Goal: </span>
              <span className="font-medium">{launchAmount} SOL</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-xs">
              <span className="text-muted-foreground">Time left: </span>
              <span className="font-pixel text-jestr-yellow">{timeRemaining}</span>
            </div>

            <Button
              className="bg-jestr-purple hover:bg-jestr-purple/80 font-pixel text-xs py-1 h-7 text-black"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleContribute()
              }}
            >
              Contribute {contributionAmount} SOL
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

