import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import clientPromise from '../../../lib/mongodb'

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  try {
    // Upload file to Vercel Blob
    const blob = await put(file.name, file, { access: 'public' })

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('your_database_name')

    // Store file metadata in MongoDB
    const result = await db.collection('images').insertOne({
      filename: file.name,
      contentType: file.type,
      size: file.size,
      url: blob.url,
      uploadedAt: new Date()
    })

    return NextResponse.json({ success: true, id: result.insertedId, url: blob.url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 })
  }
}