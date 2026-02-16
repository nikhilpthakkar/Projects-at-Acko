"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gmc-figma-links";

export function useFigmaLinks() {
  const [links, setLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setLinks(JSON.parse(stored));
    } catch {}
  }, []);

  const setLink = useCallback((componentId: string, url: string) => {
    setLinks(prev => {
      const next = { ...prev, [componentId]: url };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const getLink = useCallback((componentId: string) => links[componentId] || "", [links]);

  const hasLink = useCallback((componentId: string) => !!links[componentId], [links]);

  return { links, setLink, getLink, hasLink };
}
