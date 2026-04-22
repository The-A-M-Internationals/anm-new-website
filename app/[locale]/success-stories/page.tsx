import type { Metadata } from 'next'
import SuccessStoriesPage from './SuccessStoriesPage'


export const metadata: Metadata = {
  title: 'Success Stories | A&M International',
  description: 'Discover how A&M International has helped organizations across industries achieve measurable transformation through our success stories.',
}

export default function Page() {
  return (
    <SuccessStoriesPage />
  )
}