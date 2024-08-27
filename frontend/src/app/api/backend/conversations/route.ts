import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import * as backend from '../backend';

import { reqBody } from './route.schema';

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { 
      persona,
      question,
      email,
    } = reqBody.parse(body);


    console.log(`route.ts: email is ${email}`)
    // console.log(`${body} for question ${question}`)
    try {
      if (typeof email === 'undefined') {
        // Handle the case where myVar is undefined
        const { text, additional_context } = await backend.getStructuredAnswer(persona, question, "")
        return NextResponse.json({ answer: text, additional_context });
      } else {
        const { text, additional_context } = await backend.getStructuredAnswer(persona, question, email)
        return NextResponse.json({ answer: text, additional_context });
      }
    } catch (error) {
      console.log(`${error}`)
      return NextResponse.json({ error: 'Internal error', errorMessage: JSON.stringify(error) }, { status: 500 });
    }
  } catch (error) {
    const res = { error: 'Invalid body' };

    if (error instanceof z.ZodError) {
      Object.assign(res, { detail: error.issues });
    }

    return NextResponse.json(res, { status: 400 });
  }
}
