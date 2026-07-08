import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // بررسی ورودی‌ها
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'تمام فیلدها الزامی هستند' },
        { status: 400 }
      )
    }

    // بررسی وجود کاربر
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'این ایمیل قبلاً ثبت شده است' },
        { status: 400 }
      )
    }

    // هش کردن رمز عبور
    const hashedPassword = await bcrypt.hash(password, 10)

    // ایجاد کاربر
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as any,
      },
    })

    // اگر دبیر است، رکورد Teacher هم ایجاد کن
    if (role === 'TEACHER') {
      await prisma.teacher.create({
        data: {
          userId: user.id,
        },
      })
    }

    // ایجاد توکن
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json(
      {
        message: 'ثبت‌نام موفق',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('خطا در ثبت‌نام:', error)
    return NextResponse.json(
      { message: 'خطا در سرور' },
      { status: 500 }
    )
  }
}
