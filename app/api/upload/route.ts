
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const imgBBKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "7eab2a6a17e2b25079c27dc0b2a0f6ef";
        const imgBBFormData = new FormData();
        imgBBFormData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
            method: 'POST',
            body: imgBBFormData,
        });

        const data = await response.json();

        if (data.success) {
            return NextResponse.json({ url: data.data.url });
        } else {
            console.error('ImgBB Error:', data);
            return NextResponse.json({ error: 'Failed to upload to ImgBB provider: ' + (data.error?.message || 'Unknown error') }, { status: 500 });
        }

    } catch (error) {
        console.error('Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
