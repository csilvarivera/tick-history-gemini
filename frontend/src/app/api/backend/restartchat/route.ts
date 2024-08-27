import { NextRequest, NextResponse } from 'next/server';
import * as backend from '@/app/api/backend/backend';
import { reqBody } from './route.schema';

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email } = reqBody.parse(body);
    console.log(`in route.ts() - email is ${email}`)

    const { text } = await backend.restartChat(email)
    return NextResponse.json({ answer: text });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error', errorMessage: JSON.stringify(error) }, { status: 500 });
  }
}