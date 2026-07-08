'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import StepsSection from '@/components/StepsSection'

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // بررسی وضعیت ورود
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeaturesSection />
      <StepsSection />
    </div>
  )
}
