import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()

  console.log(cookieStore);
  
  // Clear the session cookie
  cookieStore.delete('token')

  return NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}