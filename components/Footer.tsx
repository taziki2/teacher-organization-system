'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* درباره ما */}
          <div>
            <h3 className="text-lg font-bold mb-4">درباره ما</h3>
            <p className="text-gray-400 text-sm">
              سامانه سازمان‌دهی دبیران برای مدارس ایران
            </p>
          </div>

          {/* لینک‌های مفید */}
          <div>
            <h3 className="text-lg font-bold mb-4">لینک‌های مفید</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  درباره
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  قوانین
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* تماس */}
          <div>
            <h3 className="text-lg font-bold mb-4">تماس</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ایمیل: info@teachers.ir</li>
              <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
              <li>آدرس: تهران، ایران</li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h3 className="text-lg font-bold mb-4">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                f
              </a>
              <a href="#" className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center hover:bg-sky-500 transition">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                I
              </a>
            </div>
          </div>
        </div>

        {/* خط جدا کننده */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © ۱۴۰۳ سامانه سازمان‌دهی دبیران. تمامی حقوق محفوظ است.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition">
                شرایط استفاده
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">
                حریم خصوصی
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
