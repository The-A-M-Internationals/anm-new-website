"use client";

import { useIntlayer } from "next-intlayer";
import AgentScale from "./AgentScale";
import type { Txt } from "./useAgentReveal";

/** D. Where we are starting: the modules in order, the first one largest */
export default function AgentModules() {
  const c = useIntlayer("featuresAgent").starting;
  const rows = (c.modules as { name: Txt; status: Txt }[]).map((m) => ({ label: m.status.value, title: m.name.value }));
  return <AgentScale id="where-we-start" title={c.title.value} intro={c.text.value} rows={rows} />;
}
