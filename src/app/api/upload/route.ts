// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
let apiCall = 0;
export async function POST(request: NextRequest) {
  console.log('/route/upload: ', ++apiCall);
    try {
      const formData = await request.formData();
      const fileBlob = formData.get('file') as Blob;
  
      if (!fileBlob) {
        return NextResponse.json({ error: 'No file' }, { status: 400 });
      }
  
      const buffer = await fileBlob.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
  
      const result = await cloudinary.uploader.upload(`data:${fileBlob.type};base64,${base64}`, {
        folder: "nextjs-uploads",
      });
  
      return NextResponse.json(result, { status: 200 });
    } catch (err) {
      console.error("Upload error:", err);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  }
  