import JobApplyPage, { type Job } from "./JobApplyPage";
import { notFound } from "next/navigation";
import { getEntry } from "@/lib/cms/server";

// The job comes from Firebase: refresh at most once a minute so edits show up
export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = await getEntry("jobs", id);
  if (entry === null) notFound();   // no such opening: a real "page not found", not an empty application form
  const initialJob = entry === undefined ? undefined : entry === null ? null : (entry.data as Job);
  return <JobApplyPage id={id} initialJob={initialJob} />;
}
