'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface HeroSectionProps {
  isLoggedIn: boolean
}

export default function HeroSection({ isLoggedIn }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* سرتیتر */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          سامانه هوشمند سازمان‌دهی
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            دبیران مدارس
          </span>
        </h1>

        {/* توضیحات */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          سامانه‌ای مدرن و جامع برای سازمان‌دهی، تخصیص و مدیریت دبیران در سطح مدرسه، شهر و استان
        </p>

        {/* دکمه‌های عمل */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/register" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                شروع کنید
                <ArrowLeft size={20} />
              </Link>
              <Link href="/auth/login" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
                ورود
              </Link>
            </>
          ) : (
            <Link href="/dashboard" className="btn-primary inline-flex items-center justify-center gap-2 text-lg px-8 py-4">
              رفتن به داشبورد
              <ArrowLeft size={20} />
            </Link>
          )}
        </div>

        {/* تصویر یا بنر */}
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 md:p-12">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-gray-600">داشبورد تحلیلی و بصری برای تمام سطوح مدیریت</p>
        </div>
      </div>
    </section>
  )
}
