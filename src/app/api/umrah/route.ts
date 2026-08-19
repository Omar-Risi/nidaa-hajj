import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, newRowDefaults, touchedAt } from '@/lib/supabase';

const TABLE = 'umrah_offers';

export async function GET() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from(TABLE)
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching umrah offers:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      title, description, duration, accommodation, features, image, images, pricing,
      titleEn, descriptionEn, durationEn, accommodationEn, featuresEn 
    } = body;

    if (!title || !description || !duration || !accommodation || !image || !pricing) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from(TABLE)
      .insert({
        ...newRowDefaults(),
        title,
        description,
        duration,
        accommodation,
        features: features || [],
        image,
        images: images || [],
        pricing,
        titleEn: titleEn || null,
        descriptionEn: descriptionEn || null,
        durationEn: durationEn || null,
        accommodationEn: accommodationEn || null,
        featuresEn: featuresEn || [],
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating umrah offer:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, title, description, duration, accommodation, features, image, images, pricing,
      titleEn, descriptionEn, durationEn, accommodationEn, featuresEn 
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'معرف العرض مطلوب' }, { status: 400 });
    }

    if (!title || !description || !duration || !accommodation || !image || !pricing) {
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from(TABLE)
      .update({
        ...touchedAt(),
        title,
        description,
        duration,
        accommodation,
        features: features || [],
        image,
        images: images || [],
        pricing,
        titleEn: titleEn || null,
        descriptionEn: descriptionEn || null,
        durationEn: durationEn || null,
        accommodationEn: accommodationEn || null,
        featuresEn: featuresEn || [],
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: 'العرض غير موجود' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error updating umrah offer:', error);
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

    const { error } = await getSupabaseAdmin().from(TABLE).delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: 'تم حذف العرض بنجاح' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting umrah offer:', error);
    return NextResponse.json({ error: 'حدث خطأ في الخادم' }, { status: 500 });
  }
}
