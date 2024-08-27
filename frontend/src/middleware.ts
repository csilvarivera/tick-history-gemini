import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  response.headers.set('Access-Control-Allow-Headers', '*');

  return response;
}