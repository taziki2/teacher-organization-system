'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* لوگو */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-900">دبیران</span>
            </Link>
          </div>

          {/* لینک‌های میانی - نسخه دسکتاپ */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 transition">
              ویژگی‌ها
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">
              نحوه کار
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              تماس
            </Link>
          </div>

          {/* دکمه‌های دسترسی - نسخه دسکتاپ */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
              ورود
            </Link>
            <Link href="/auth/register" className="btn-primary">
              ثبت‌نام
            </Link>
          </div>

          {/* دکمه منو موبایل */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* منو موبایل */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-4 pb-4 space-y-3">
            <Link href="#features" className="block text-gray-700 hover:text-blue-600">
              ویژگی‌ها
            </Link>
            <Link href="#how-it-works" className="block text-gray-700 hover:text-blue-600">
              نحوه کار
            </Link>
            <Link href="#contact" className="block text-gray-700 hover:text-blue-600">
              تماس
            </Link>
            <div className="pt-2 border-t space-y-2">
              <Link href="/auth/login" className="block btn-secondary text-center">
                ورود
              </Link>
              <Link href="/auth/register" className="block btn-primary text-center">
                ثبت‌نام
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
