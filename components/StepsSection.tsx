'use client'

import { CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '1',
    title: 'ثبت‌نام',
    description: 'حساب کاربری خود را ایجاد کنید',
  },
  {
    number: '2',
    title: 'تنظیم مدرسه',
    description: 'اطلاعات مدرسه و سازمان را وارد کنید',
  },
  {
    number: '3',
    title: 'افزودن دبیران',
    description: 'اطلاعات دبیران و تخصص‌های آن‌ها را ثبت کنید',
  },
  {
    number: '4',
    title: 'تخصیص کلاس‌ها',
    description: 'دبیران را به کلاس‌های مختلف اختصاص دهید',
  },
  {
    number: '5',
    title: 'مراقبت و تحلیل',
    description: 'از نمودارها و گزارش‌ها برای بهبود استفاده کنید',
  },
]

export default function StepsSection() {
  return (
    <section id="how-it-works" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* سرتیتر */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            نحوه کار
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            فقط پنج مرحله ساده برای شروع
          </p>
        </div>

        {/* مراحل */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              {/* شماره مرحله */}
              <div className="flex-shrink-0 mr-6">
                <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-600 text-white font-bold text-lg">
                  {step.number}
                </div>
              </div>

              {/* محتوای مرحله */}
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>

              {/* آیکون چک */}
              <div className="flex-shrink-0 ml-4">
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
