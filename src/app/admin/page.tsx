"use client";

import * as React from "react";
import { useActionState } from "react";
import { loginAdminAction } from "@/actions/auth.actions";
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-md space-y-8">
        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900/90 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="heading-title text-2xl font-bold text-slate-900 dark:text-white">
              CMS Portal Login
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Masuk untuk mengelola seluruh konten website portofolio
            </p>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{state.error}</span>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="usernameOrEmail"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 block"
              >
                Username atau Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  required
                  placeholder="admin"
                  defaultValue="admin"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 block"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-navy-700 bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 disabled:opacity-60 text-white font-semibold text-xs shadow-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <span>{isPending ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Hint */}
          <div className="pt-2 text-center text-[11px] text-slate-400 dark:text-slate-500">
            <span>Area terproteksi. Kredensial default awal: </span>
            <span className="font-mono text-orange-600 dark:text-orange-400">
              admin / AdminPassword123!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
