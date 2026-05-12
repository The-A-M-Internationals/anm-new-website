import type { Metadata } from 'next'
import SuccessStoriesPage from './SuccessStoriesPage'


export const metadata: Metadata = {
  title: 'Success Stories | A&M Internationals',
  description: 'Discover how A&M Internationals has helped organizations across industries achieve measurable transformation through our success stories.',
}

export default function Page() {
  return (
    <SuccessStoriesPage />
  )
}