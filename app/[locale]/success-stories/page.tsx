import type { Metadata } from 'next'
import SuccessStoriesPage from './SuccessStoriesPage'
import { getCollection } from '@/lib/cms/server'


export const metadata: Metadata = {
  title: 'Success Stories | The A&M Internationals',
  description: 'Discover how The A&M Internationals has helped organizations across industries achieve measurable transformation through our success stories.',
}

export default async function Page() {
  // Admin-edited Our Work projects (built-in card if none saved)
  const ourWork = await getCollection('ourWork')
  return (
    <SuccessStoriesPage docs={ourWork} />
  )
}

// Our Work comes from Firebase: rebuild this page at most once a minute so edits show up
export const revalidate = 60;
