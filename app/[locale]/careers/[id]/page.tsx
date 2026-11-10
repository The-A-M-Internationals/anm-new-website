import JobApplyPage, { type Job } from "./JobApplyPage";
import { getEntry } from "@/lib/cms/server";

// The job comes from Firebase: refresh at most once a minute so edits show up
export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry("jobs", id);
  const initialJob = entry === undefined ? undefined : entry === null ? null : (entry.data as Job);
  return <JobApplyPage id={id} initialJob={initialJob} />;
}
