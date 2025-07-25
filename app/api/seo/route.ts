import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url') || 'https://mylanatlani.com';
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Extraction des meta tags
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta name="description" content="(.*?)"/i);
    const robotsMatch = html.match(/<meta name="robots" content="(.*?)"/i);
    
    return NextResponse.json({
      url,
      title: titleMatch ? titleMatch[1] : null,
      description: descriptionMatch ? descriptionMatch[1] : null,
      robots: robotsMatch ? robotsMatch[1] : null,
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'analyse' }, { status: 500 });
  }
} 