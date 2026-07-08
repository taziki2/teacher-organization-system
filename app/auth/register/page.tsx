'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

type UserRole = 'TEACHER' | 'SCHOOL_ADMIN' | 'CITY_ADMIN' | 'STATE_ADMIN'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'TEACHER' as UserRole,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('رمزهای عبور مطابقت ندارند')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })

      // ذخیره توکن
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // ریدایرکت به داشبورد
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* هدر */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ثبت‌نام جدید</h1>
            <p className="text-gray-600">حساب کاربری خود را ایجاد کنید</p>
          </div>

          {/* فرم ثبت‌نام */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* نمایش خطا */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* نام */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                نام کامل
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="نام شما"
                required
              />
            </div>

            {/* ایمیل */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* نقش */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                نقش
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input-field"
              >
                <option value="TEACHER">دبیر</option>
                <option value="SCHOOL_ADMIN">مدیر مدرسه</option>
                <option value="CITY_ADMIN">مدیر شهری</option>
                <option value="STATE_ADMIN">مدیر استانی</option>
              </select>
            </div>

            {/* رمز عبور */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {/* تأیید رمز عبور */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                تأیید رمز عبور
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            {/* دکمه ثبت‌نام */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'درحال ثبت‌نام...' : 'ثبت‌نام'}
            </button>
          </form>

          {/* لینک ورود */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              قبلاً حساب کاربری دارید؟{' '}
              <Link href="/auth/login" className="text-blue-600 font-semibold hover:text-blue-700">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
