"use client";

import { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { auth } from "@/lib/admin/firebase";
import { enterTestMode, useTestModeAvailable } from "./testMode";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const testAvailable = useTestModeAvailable();
  const [msg, setMsg] = useState<{ kind: "error" | "info"; text: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setMsg({ kind: "error", text: "Wrong email or password." });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!email.trim()) { setMsg({ kind: "error", text: "Type your email first, then click Forgot password." }); return; }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMsg({ kind: "info", text: "If this email has an account, a reset link is on its way." });
    } catch {
      setMsg({ kind: "info", text: "If this email has an account, a reset link is on its way." });
    }
  };

  const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all duration-150 ease-in-out focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/25";

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-slate-200/80 bg-white p-8 shadow-xs">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9A84C]">The A&amp;M Internationals</p>
        <h1 className="mt-2 text-2xl font-bold text-[#050E30]">Website admin</h1>
        <p className="mt-1 text-sm text-slate-500">Sign in to edit the website.</p>

        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="email">Email</label>
        <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={`mt-1 ${input}`} />

        <label className="mt-4 block text-sm font-medium text-slate-700" htmlFor="password">Password</label>
        <div className="relative mt-1">
          <input id="password" type={show ? "text" : "password"} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} pe-11`} />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute inset-y-0 end-0 grid w-11 cursor-pointer place-items-center text-slate-400 transition-all duration-150 ease-in-out hover:text-[#050E30]"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        {msg && <p className={`mt-4 text-sm ${msg.kind === "error" ? "text-red-600" : "text-slate-600"}`}>{msg.text}</p>}

        <button type="submit" disabled={busy} className="mt-6 w-full cursor-pointer rounded-lg bg-[#050E30] py-2.5 text-sm font-bold text-white transition-all duration-150 ease-in-out hover:bg-[#0B1E4F] disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button type="button" onClick={reset} className="mt-3 w-full cursor-pointer text-center text-sm text-slate-500 hover:text-[#050E30]">
          Forgot password?
        </button>
        {testAvailable && (
          <button type="button" onClick={enterTestMode} className="mt-6 w-full cursor-pointer rounded-lg border border-dashed border-amber-400 bg-amber-50 py-2 text-sm font-semibold text-amber-800 transition-all duration-150 ease-in-out hover:bg-amber-100">
            Test mode (this computer only, no login)
          </button>
        )}
      </form>
    </main>
  );
}
