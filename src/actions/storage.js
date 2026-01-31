import { safeParse } from "../utils/parse";

export const STORAGE_KEYS = {
  theme: "sysnavy_theme",
  people: "sysnavy_people",
  roles: "sysnavy_roles",
};

export function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  return safeParse(window.localStorage.getItem(key), fallback);
}

export function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getInitialTheme() {
  const stored = loadFromStorage(STORAGE_KEYS.theme, null);
  if (stored === "light" || stored === "dark") return stored;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}
