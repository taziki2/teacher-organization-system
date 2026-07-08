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

export async function POST(request: NextRequest) {
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

    const { teacherId, classId, schoolId } = await request.json()

    // بررسی ورودی‌ها
    if (!teacherId || !classId || !schoolId) {
      return NextResponse.json(
        { message: 'تمام فیلدها الزامی هستند' },
        { status: 400 }
      )
    }

    // بررسی وجود دبیر
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    })

    if (!teacher) {
      return NextResponse.json(
        { message: 'دبیر یافت نشد' },
        { status: 404 }
      )
    }

    // بررسی وجود کلاس
    const classExists = await prisma.class.findUnique({
      where: { id: classId },
    })

    if (!classExists) {
      return NextResponse.json(
        { message: 'کلاس یافت نشد' },
        { status: 404 }
      )
    }

    // بررسی وجود تخصیص قبلی
    const existingAssignment = await prisma.teacherAssignment.findUnique({
      where: {
        teacherId_classId: {
          teacherId,
          classId,
        },
      },
    })

    if (existingAssignment) {
      return NextResponse.json(
        { message: 'این دبیر قبلاً به این کلاس تخصیص داده شده است' },
        { status: 400 }
      )
    }

    // ایجاد تخصیص
    const assignment = await prisma.teacherAssignment.create({
      data: {
        teacherId,
        classId,
        schoolId,
        status: 'PENDING',
      },
    })

    return NextResponse.json(
      {
        message: 'تخصیص موفق',
        data: assignment,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('خطا در تخصیص:', error)
    return NextResponse.json(
      { message: 'خطا در سرور' },
      { status: 500 }
    )
  }
}
