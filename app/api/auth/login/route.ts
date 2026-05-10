import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({ where: { username } });
        if (!admin) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const token = signToken({ id: admin.id });
        return NextResponse.json({ token, admin: { id: admin.id, username: admin.username } });
    } catch (error: any) {
        return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
    }
}
