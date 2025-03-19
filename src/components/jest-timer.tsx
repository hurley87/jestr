"use client"

import { useState, useEffect } from "react"
import { formatTimeRemaining } from "@/lib/utils"

interface JestTimerProps {
  endTime: Date
  className?: string
  initialTimeRemaining?: string
}

export function JestTimer({ 
  endTime, 
  className = "",
  initialTimeRemaining
}: JestTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>(
    initialTimeRemaining || formatTimeRemaining(endTime)
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(endTime))
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <p className={`font-pixel text-jestr-yellow text-lg ${className}`}>
      {timeRemaining}
    </p>
  )
} 