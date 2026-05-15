"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const isLoginPage = pathname === "/login";

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <div className={cn("relative mx-auto grid min-h-screen max-w-screen-2xl grid-cols-1", isSidebarCollapsed ? "lg:grid-cols-[88px_1fr]" : "lg:grid-cols-[280px_1fr]")}>
        <Sidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onClose={() => setIsSidebarOpen(false)}
          onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
        />
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-4 top-4 z-30 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium shadow-sm transition lg:hidden"
          aria-label="Open sidebar"
        >
          ? Menu
        </button>
        {isSidebarOpen && (
          <button type="button" className="fixed inset-0 z-20 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar" />
        )}
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-w-0 overflow-x-hidden px-4 py-16 sm:px-8 sm:py-8 lg:py-8"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}
