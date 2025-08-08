import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';

// Verify admin token
function verifyAdminToken(request: NextRequest): boolean {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.substring(7);
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const onSale = searchParams.get('onSale') === 'true';

    let query = supabase.from('products').select('*');

    // Apply filters
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }
    if (category) {
      query = query.eq('category', category);
    }
    if (featured) {
      query = query.eq('featured', true);
    }
    if (onSale) {
      query = query.eq('on_sale', true);
    }

    const { data: products, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch products' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      products: products || [],
      count: products?.length || 0
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin token
    if (!verifyAdminToken(request)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return NextResponse.json(
        { success: false, message: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    // Prepare product data
    const productData = {
      name: data.name,
      description: data.description || '',
      price: parseFloat(data.price),
      sale_price: data.sale_price ? parseFloat(data.sale_price) : null,
      on_sale: data.on_sale || false,
      category: data.category,
      images: data.images || [],
      tags: data.tags || [],
      inventory: parseInt(data.inventory) || 0,
      sku: data.sku || `SKU_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      weight: data.weight ? parseFloat(data.weight) : null,
      dimensions: data.dimensions || null,
      is_active: data.is_active !== false,
      featured: data.featured || false,
      metadata: data.metadata || {}
    };

    const { data: newProduct, error } = await supabaseAdmin
      .from('products')
      .insert([productData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create product' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: newProduct
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create product' },
      { status: 500 }
    );
  }
}