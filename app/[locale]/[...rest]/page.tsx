import { notFound } from "next/navigation";

/** Any address that matches no page lands here and shows the site's 404 page (not-found.tsx). */
export default function UnknownPage() {
  notFound();
}
