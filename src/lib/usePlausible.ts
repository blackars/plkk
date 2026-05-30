import { useCallback } from 'react'

export function usePlausible() {
  return useCallback((eventName: string, props?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, props ? { props } : undefined)
    }
  }, [])
}
