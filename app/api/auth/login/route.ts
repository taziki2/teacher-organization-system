import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // بررسی ورودی‌ها
    if (!email || !password) {
      return NextResponse.json(
        { message: 'ایمیل و رمز عبور الزامی هستند' },
        { status: 400 }
      )
    }

    // پیدا کردن کاربر
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'ایمیل یا رمز عبور نادرست است' },
        { status: 401 }
      )
    }

    // بررسی رمز عبور
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'ایمیل یا رمز عبور نادرست است' },
        { status: 401 }
      )
    }

    // ایجاد توکن
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json(
      {
        message: 'ورود موفق',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('خطا در ورود:', error)
    return NextResponse.json(
      { message: 'خطا در سرور' },
      { status: 500 }
    )
  }
}
