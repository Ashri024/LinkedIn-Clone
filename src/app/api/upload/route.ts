import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// let apiCall = 0;
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB for videos

export async function POST(request: NextRequest) {
  // console.log('/route/upload: ', ++apiCall);
  try {
    const formData = await request.formData();
    const fileBlob = formData.get('file') as Blob;

    if (!fileBlob) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (fileBlob.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size too large. Max 100MB allowed.' }, { status: 400 });
    }

    const buffer = await fileBlob.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Detect resource type
    const mimeType = fileBlob.type;
    let resourceType: 'image' | 'video' = 'image';
    if (mimeType.startsWith('video/')) {
      resourceType = 'video';
    }

    const result = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64}`,
      {
        folder: 'nextjs-uploads',
        resource_type: resourceType,
      }
    );

    return NextResponse.json(result, { status: 200 });

  } catch (err) {
    console.error("Upload error:", err);
    const cloudinaryErr = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: cloudinaryErr }, { status: 500 });
  }
}
