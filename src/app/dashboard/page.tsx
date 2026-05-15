"use client";

import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div
        className="rounded-2xl border p-6"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--text)", fontFamily: "var(--font-playfair)" }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Welcome back{user?.email ? `, ${user.email}` : ""}
        </p>
      </div>
    </div>
  );
}
