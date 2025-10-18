import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all hajj offers
export async function GET() {
  try {
    const offers = await prisma.hajjOffer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(offers, { status: 200 });
  } catch (error) {
    console.error('Error fetching hajj offers:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// POST - Create new hajj offer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, duration, accommodation, features, image, images, sections } = body;

    console.log('Received data:', { title, description, duration, accommodation, features, image, images, sections });

    // Validate input
    if (!title || !description || !duration || !accommodation || !image || !sections) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    // Create hajj offer
    const offer = await prisma.hajjOffer.create({
      data: {
        title,
        description,
        duration,
        accommodation,
        features: features || [],
        image,
        images: images || [],
        sections,
      },
    });

    console.log('Hajj offer created successfully:', offer);

    return NextResponse.json(offer, { status: 201 });
  } catch (error) {
    console.error('Error creating hajj offer:', error);
    console.error('Error details:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// DELETE - Delete hajj offer by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'معرف العرض مطلوب' },
        { status: 400 }
      );
    }

    await prisma.hajjOffer.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'تم حذف العرض بنجاح' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hajj offer:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}
