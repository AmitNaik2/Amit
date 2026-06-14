import { cn } from "@/lib/utils";

export function AuthorBox({ className }: { className?: string }) {
  return (
    <aside className={cn("rounded-2xl border border-white/10 bg-[#050816]/80 p-5 font-poppins", className)}>
      <h3 className="text-lg font-bold text-white">👤 GamesDealsHub Team</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9CA3AF]">
        Gaming deal hunters since 2024 • Updated: June 2026
      </p>
    </aside>
  );
}
