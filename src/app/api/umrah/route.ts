import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const offers = await prisma.umrahOffer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error('Error fetching umrah offers:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, duration, accommodation, features, image, images, pricing } = body;

    if (!title || !description || !duration || !accommodation || !image || !pricing) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    const offer = await prisma.umrahOffer.create({
      data: {
        title,
        description,
        duration,
        accommodation,
        features: features || [],
        image,
        images: images || [],
        pricing,
      },
    });

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error('Error creating umrah offer:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرف العرض مطلوب' }, { status: 400 });
    }

    await prisma.umrahOffer.delete({ where: { id } });
    return NextResponse.json({ message: 'تم حذف العرض بنجاح' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting umrah offer:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
