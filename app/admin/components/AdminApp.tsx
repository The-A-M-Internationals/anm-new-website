"use client";

import { useState } from "react";
import { SCHEMAS } from "@/lib/admin/schemas";
import { useAdmin } from "./useAdmin";
import LoginForm from "./LoginForm";
import CollectionEditor from "./CollectionEditor";

/** Admin portal: sign-in gate, then one tab per editable part of the site */
export default function AdminApp() {
  const { state, signOut, testMode } = useAdmin();
  const [tab, setTab] = useState(SCHEMAS[0].id);

  if (state.status === "loading") {
    return <p className="flex min-h-screen items-center justify-center text-sm text-slate-500">Loading…</p>;
  }
  if (state.status === "signedOut") return <LoginForm />;
  if (state.status === "notAdmin") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-sm rounded-xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
          <h1 className="text-lg font-bold text-[#050E30]">No admin access</h1>
          <p className="mt-2 text-sm text-slate-600">{state.email} is signed in but isn&apos;t on the admin list. Ask the site owner to add it.</p>
          <button onClick={signOut} className="mt-5 cursor-pointer rounded-lg bg-[#050E30] px-5 py-2 text-sm font-bold text-white transition-all duration-150 ease-in-out hover:bg-[#0B1E4F]">Sign out</button>
        </div>
      </main>
    );
  }

  const schema = SCHEMAS.find((s) => s.id === tab) ?? SCHEMAS[0];
  return (
    <div className="min-h-screen">
      {testMode && (
        <p className="bg-amber-100 px-4 py-2 text-center text-sm font-medium text-amber-900">
          Test mode on this computer: no login, but changes still go to the real database and show on the website. Use test items and delete them after.
        </p>
      )}
      <header className="sticky top-0 z-20 bg-[#050E30] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9A84C]">The A&amp;M Internationals</p>
            <p className="text-base font-bold">Website admin</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a href="/" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-white/70 hover:text-white">View site ↗</a>
            <span className="hidden text-white/50 sm:inline">{state.user.email}</span>
            <button onClick={signOut} className="cursor-pointer rounded-lg border border-white/20 px-3 py-1.5 transition-all duration-150 ease-in-out hover:bg-white/10">{testMode ? "Exit test mode" : "Sign out"}</button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6" role="tablist">
          {SCHEMAS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === tab}
              onClick={() => setTab(s.id)}
              className={`cursor-pointer whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-semibold transition-all duration-150 ease-in-out ${s.id === tab ? "border-[#C9A84C] text-white" : "border-transparent text-white/60 hover:text-white"}`}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <CollectionEditor key={schema.id} schema={schema} user={state.user} />
      </main>
    </div>
  );
}
