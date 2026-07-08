import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    // بررسی توکن
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'توکن ارائه نشده است' },
        { status: 401 }
      )
    }

    const token = authHeader.slice(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { message: 'توکن نامعتبر است' },
        { status: 401 }
      )
    }

    // دریافت تمام دبیران
    const teachers = await prisma.teacher.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            score: true,
          },
        },
        specialties: {
          include: {
            subject: true,
          },
        },
        assignments: true,
      },
    })

    return NextResponse.json(
      {
        message: 'دریافت لیست دبیران موفق',
        data: teachers,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('خطا در دریافت لیست دبیران:', error)
    return NextResponse.json(
      { message: 'خطا در سرور' },
      { status: 500 }
    )
  }
}
