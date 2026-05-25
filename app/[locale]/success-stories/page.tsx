import type { Metadata } from 'next'
import SuccessStoriesPage from './SuccessStoriesPage'


export const metadata: Metadata = {
  title: 'Success Stories | The A&M internationals',
  description: 'Discover how The A&M internationals has helped organizations across industries achieve measurable transformation through our success stories.',
}

export default function Page() {
  return (
    <SuccessStoriesPage />
  )
}