"use client";

import { useIntlayer } from "next-intlayer";
import AgentScale from "./AgentScale";
import type { Txt } from "./useAgentReveal";

/** F. Roadmap: four stages, the current one first and largest */
export default function AgentRoadmap() {
  const c = useIntlayer("featuresAgent").roadmap;
  const rows = (c.stages as { title: Txt; when: Txt; text: Txt }[]).map((s) => ({ label: s.when.value, title: s.title.value, text: s.text.value }));
  return <AgentScale id="roadmap" title={c.title.value} rows={rows} tag={c.current.value} />;
}
