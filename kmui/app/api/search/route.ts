import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY // Make sure to set this in your .env.local file
})

async function searchYouTube(query: string) {
  try {
    const response = await youtube.search.list({
      part: ['id', 'snippet'],
      q: query,
      type: ['video'],
      videoCategoryId: '10', // Music category
      maxResults: 10
    })

    return response.data.items?.map(item => ({
      id: item.id?.videoId || '',
      title: item.snippet?.title || '',
      artist: item.snippet?.channelTitle || '',
      cover: item.snippet?.thumbnails?.high?.url || ''
    })) || []
  } catch (error) {
    console.error('Error searching YouTube:', error)
    throw error
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  
  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const results = await searchYouTube(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error('Error searching music:', error)
    return NextResponse.json({ error: 'An error occurred while searching' }, { status: 500 })
  }
}