import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, newRowDefaults, touchedAt } from '@/lib/supabase';

// GET - Fetch all news
export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('news')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
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

    // Validate input
    if (!title || !date || !content) {
      return NextResponse.json(
        { error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseAdmin()
      .from('news')
      .insert({
        ...newRowDefaults(),
        title,
        date: new Date(date).toISOString(),
        content,
        images: images || [],
        titleEn: titleEn || null,
        contentEn: contentEn || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
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

    const { data, error } = await getSupabaseAdmin()
      .from('news')
      .update({
        ...touchedAt(),
        title,
        date: new Date(date).toISOString(),
        content,
        images: images || [],
        titleEn: titleEn || null,
        contentEn: contentEn || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json(
        { error: 'الخبر غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating news:', error);
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

    const { error } = await getSupabaseAdmin().from('news').delete().eq('id', id);

    if (error) throw error;

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
