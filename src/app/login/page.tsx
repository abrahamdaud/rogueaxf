"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useAppStore } from "@/store/useAppStore";
import {
  registerLocal,
  loginLocal,
  recoverWithSignature,
  getLocalAuth,
  recordToUser,
} from "@/lib/local-auth";

type Step = "main" | "register" | "login" | "signature" | "recover";

export default function LoginPage() {
  const router = useRouter();
  const { login, setShowLoadingScreen } = useAppStore();
  const [step, setStep] = useState<Step>("main");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const hasAccount = typeof window !== "undefined" && !!getLocalAuth();

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const { record, signature: sig } = await registerLocal({ username, password });
      setSignature(sig);
      login(recordToUser(record));
      setStep("signature");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const record = await loginLocal(password);
      login(recordToUser(record));
      setShowLoadingScreen(true);
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6">
      <Logo size="lg" animated />
      {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
      <div className="mt-8 w-full max-w-sm space-y-3">
        {step === "main" && (
          <>
            <p className="mb-4 text-center text-sm text-zinc-400">
              Password opsional. Bisa lewati dan pakai tanpa akun.
            </p>
            {!hasAccount ? (
              <button onClick={() => setStep("register")} className="w-full rounded-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 py-3 text-sm font-semibold">
                Buat Password & Signature
              </button>
            ) : (
              <button onClick={() => setStep("login")} className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black">
                Masuk
              </button>
            )}
            <button onClick={() => router.push("/")} className="w-full py-2 text-sm text-zinc-500">
              Lewati
            </button>
          </>
        )}
        {step === "register" && (
          <>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6)" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none" />
            <button onClick={handleRegister} disabled={loading} className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black">
              Buat
            </button>
          </>
        )}
        {step === "signature" && (
          <>
            <p className="text-center text-sm text-zinc-400">Simpan signature cadangan ini:</p>
            <code className="block break-all rounded-xl bg-zinc-900 p-4 text-center text-sm text-pink-300">{signature}</code>
            <button onClick={() => { setShowLoadingScreen(true); router.push("/"); }} className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black">
              Lanjut
            </button>
          </>
        )}
        {step === "login" && (
          <>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password / signature" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none" />
            <button onClick={handleLogin} disabled={loading} className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black">
              Masuk
            </button>
          </>
        )}
      </div>
    </div>
  );
}
