'use client'

import { Users, Target, BarChart3, Shield, Zap, Clock } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'مدیریت دبیران',
    description: 'ثبت و مدیریت اطلاعات دبیران، تخصص‌های آن‌ها و سوابق شغلی',
  },
  {
    icon: Target,
    title: 'تخصیص هوشمند',
    description: 'تخصیص خودکار دبیران بر اساس تخصص و امتیاز',
  },
  {
    icon: BarChart3,
    title: 'گزارش‌های تفصیلی',
    description: 'نمودارها و گزارش‌های جامع برای تصمیم‌گیری بهتر',
  },
  {
    icon: Shield,
    title: 'امنیت بالا',
    description: 'رمزگذاری و امنیت سطح بالا برای حفاظت از داده‌ها',
  },
  {
    icon: Zap,
    title: 'سریع و آسان',
    description: 'رابط کاربری ساده و عملکرد سریع',
  },
  {
    icon: Clock,
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم پشتیبانی آماده کمک در هر زمان',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* سرتیتر */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ویژگی‌های برجسته
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            تمامی ابزارهای لازم برای سازمان‌دهی بهتر
          </p>
        </div>

        {/* شبکه ویژگی‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
