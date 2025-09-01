const KEY = "tone_picker_state_v1";


export function saveState(state: unknown) {
try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}
export function loadState<T>(fallback: T): T {
try {
const raw = localStorage.getItem(KEY);
return raw ? (JSON.parse(raw) as T) : fallback;
} catch { return fallback; }
}