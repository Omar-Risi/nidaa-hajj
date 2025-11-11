import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all news
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        date: 'desc',
      },
    });

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// POST - Create new news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, content, images, titleEn, contentEn } = body;

    console.log('Received data:', { title, date, content, images, titleEn, contentEn });

    // Validate input
    if (!title || !date || !content) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Create news
    const news = await prisma.news.create({
      data: {
        title,
        date: new Date(date),
        content,
        images: images || [],
        titleEn: titleEn || null,
        contentEn: contentEn || null,
      },
    });

    console.log('News created successfully:', news);

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// PUT - Update existing news
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, date, content, images, titleEn, contentEn } = body;

    console.log('Update request received:', { id, title, date, content, titleEn, contentEn });

    if (!id) {
      return NextResponse.json(
        { error: 'معرف الخبر مطلوب' },
        { status: 400 }
      );
    }

    if (!title || !date || !content) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        date: new Date(date),
        content,
        images: images || [],
        titleEn: titleEn || null,
        contentEn: contentEn || null,
      },
    });

    console.log('News updated successfully:', news);

    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('Error updating news:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// DELETE - Delete news by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'معرف الخبر مطلوب' },
        { status: 400 }
      );
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'تم حذف الخبر بنجاح' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
