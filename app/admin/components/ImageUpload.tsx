"use client";

import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/admin/firebase";

const MAX_MB = 5;

/** Photo picker: uploads to Firebase Storage (uploads/<folder>/…) and stores the public link */
export default function ImageUpload({ value, folder, onChange }: { value: string; folder: string; onChange: (url: string) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  const upload = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) { setError("Please choose an image file (JPG, PNG or WebP)."); return; }
    if (file.size > MAX_MB * 1024 * 1024) { setError(`Image is too large (max ${MAX_MB} MB).`); return; }
    const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").slice(-60);
    const task = uploadBytesResumable(ref(storage, `uploads/${folder}/${Date.now()}-${safe}`), file, { contentType: file.type });
    setProgress(0);
    task.on(
      "state_changed",
      (s) => setProgress(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      () => { setProgress(null); setError("Upload failed. Check your connection and try again."); },
      async () => { onChange(await getDownloadURL(task.snapshot.ref)); setProgress(null); },
    );
  };

  return (
    <div
      className="mt-1 flex flex-wrap items-center gap-4 rounded-lg border border-dashed border-slate-300 p-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) upload(f); }}
    >
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin preview of an uploaded image
        <img src={value} alt="" className="h-24 w-36 rounded-md border border-slate-200 object-cover" />
      ) : (
        <div className="grid h-24 w-36 place-items-center rounded-md bg-slate-100 text-xs text-slate-400">No image</div>
      )}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex gap-2">
          <button type="button" onClick={() => input.current?.click()} disabled={progress !== null} className="cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 font-medium transition-all duration-150 ease-in-out hover:bg-slate-50 disabled:opacity-60">
            {value ? "Replace image" : "Upload image"}
          </button>
          {value && <button type="button" onClick={() => onChange("")} className="cursor-pointer px-2 text-slate-500 hover:text-red-600">Remove</button>}
        </div>
        <span className="text-xs text-slate-400">{progress !== null ? `Uploading… ${progress}%` : `or drag a photo here · max ${MAX_MB} MB`}</span>
        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ""; }} />
    </div>
  );
}
