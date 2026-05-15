"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { label: "Dashboard",    href: "/dashboard"    },
  { label: "Projects",     href: "/"             },
  { label: "New Project",  href: "/projects/new" },
  { label: "Team Members", href: "/team-members" },
  { label: "Design Final", href: "/design-final" },
];

interface SidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isOpen = false, isCollapsed = false, onClose, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex h-screen w-full max-w-72 flex-col border-r px-4 py-6 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0",
        isCollapsed && "lg:max-w-22 lg:px-3",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden rounded-lg border px-2 py-1 text-xs font-medium transition lg:inline-flex"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          {isCollapsed ? ">>" : "<<"}
        </button>
      </div>
      {!isCollapsed && (
        <div className="mb-8 rounded-2xl border p-4 text-center" style={{ borderColor: "var(--border)" }}>
          <p className="text-lg font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-playfair)" }}>
            Tracking System
          </p>
          {user && (
            <p className="mt-1 text-xs truncate" style={{ color: "var(--text-muted)" }}>{user.email}</p>
          )}
        </div>
      )}
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={cn("nav-link flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", isCollapsed && "justify-center px-2", isActive && "active")}
            >
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="flex-1" />
      <button
        type="button"
        onClick={logout}
        className="w-full rounded-xl border px-3 py-2.5 text-sm font-medium transition"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        {isCollapsed ? "?" : "Sign Out"}
      </button>
    </aside>
  );
}
