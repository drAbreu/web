'use client';
import { useState, useCallback } from 'react';

function loadSet(key: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveSet(key: string, set: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(set)));
  } catch { /* storage full */ }
}

const OWNED_KEY  = 'datastar-owned';
const WANTED_KEY = 'datastar-wanted';

export function useItemTags() {
  const [owned,  setOwned]  = useState<Set<string>>(() => loadSet(OWNED_KEY));
  const [wanted, setWanted] = useState<Set<string>>(() => loadSet(WANTED_KEY));

  const toggleOwned = useCallback((id: string) => {
    setOwned(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      saveSet(OWNED_KEY, next);
      return next;
    });
    // Owning removes want
    setWanted(prev => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      saveSet(WANTED_KEY, next);
      return next;
    });
  }, []);

  const toggleWanted = useCallback((id: string) => {
    setWanted(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      saveSet(WANTED_KEY, next);
      return next;
    });
    // Wanting removes owned
    setOwned(prev => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      saveSet(OWNED_KEY, next);
      return next;
    });
  }, []);

  return { owned, wanted, toggleOwned, toggleWanted };
}
