import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openExternalUrl(url: string, target: "_blank" | "_self" = "_blank") {
  if (!url) return;

  if (target === "_self") {
    window.location.assign(url);
    return;
  }

  const openedWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!openedWindow) {
    window.location.assign(url);
  }
}
