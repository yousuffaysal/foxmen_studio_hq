import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AdminPayload {
    id: string;
}

export function verifyAuth(request: NextRequest): AdminPayload {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
        throw new Error('No token provided');
    }
    const token = authHeader.split(' ')[1];
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
}

export function signToken(payload: AdminPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
