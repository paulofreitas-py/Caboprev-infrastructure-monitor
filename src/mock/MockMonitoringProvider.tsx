import { useEffect, type ReactNode } from 'react'
import { useMonitorStore } from '../store/useMonitorStore'

export function MockMonitoringProvider({ children }: { children: ReactNode }) {
  const tick = useMonitorStore(state => state.tick)
  useEffect(() => {
    const interval = window.setInterval(tick, 2000)
    return () => window.clearInterval(interval)
  }, [tick])
  return <>{children}</>
}

