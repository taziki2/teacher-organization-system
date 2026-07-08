'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      })

      // ذخیره توکن
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // ریدایرکت به داشبورد
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ورود. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* هدر */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">سامانه دبیران</h1>
            <p className="text-gray-600">به سامانه خود خوش آمدید</p>
          </div>

          {/* فرم ورود */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* نمایش خطا */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* ایمیل */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* رمز عبور */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {/* دکمه ورود */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'درحال ورود...' : 'ورود'}
            </button>
          </form>

          {/* لینک ثبت‌نام */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              حساب کاربری ندارید؟{' '}
              <Link href="/auth/register" className="text-blue-600 font-semibold hover:text-blue-700">
                ثبت‌نام کنید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
