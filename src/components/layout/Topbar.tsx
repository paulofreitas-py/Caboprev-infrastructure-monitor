import { Bell, Command, Menu, Search, Settings, SlidersHorizontal, X } from 'lucide-react'
import { devices } from '../../data/devices'
import { printers } from '../../data/printers'
import { useMonitorStore } from '../../store/useMonitorStore'

export function Topbar() {
  const [query, setQuery] = useState('')
  const [notifications, setNotifications] = useState(false)
  const setSidebarOpen = useMonitorStore(state => state.setSidebarOpen)
  const setActivePage = useMonitorStore(state => state.setActivePage)
  const setSelectedDevice = useMonitorStore(state => state.setSelectedDevice)
  const presentation = useMonitorStore(state => state.presentationMode)
  const results = query.trim() ? [...devices, ...printers].filter(item => `${item.name} ${item.ip}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5) : []
  return <header className="z-30 flex min-h-20 shrink-0 items-center justify-between gap-4 border-b border-border bg-canvas/90 px-5 py-3 backdrop-blur-xl lg:px-8">
    <div className="flex items-center gap-4"><button className="text-muted lg:hidden" onClick={() => setSidebarOpen(true)}><Menu size={20}/></button><div><p className="text-sm font-semibold tracking-tight">CABOPREV INFRASTRUCTURE MONITOR</p><p className="mt-1 text-[11px] text-muted">CABOPREV · Main Site <span className="mx-1">·</span><span className="text-success"><i className="status-dot live-pulse mr-1 bg-success"/>LIVE</span><span className="ml-2">Updated 2 sec ago</span></p></div></div>
    {!presentation && <div className="flex items-center gap-2"><div className="relative hidden md:block"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') setQuery('') }} placeholder="Search devices..." className="w-56 rounded-lg border border-border bg-surface py-2 pl-9 pr-10 text-xs outline-none transition placeholder:text-muted focus:border-primary"/><Command size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"/>{results.length > 0 && <div className="absolute right-0 top-11 w-72 overflow-hidden rounded-xl border border-border bg-surface shadow-panel">{results.map(result => <button key={result.id} className="flex w-full items-center justify-between px-3 py-3 text-left text-xs hover:bg-panel" onClick={() => { setSelectedDevice(result.id); setQuery('') }}><span><b className="block">{result.name}</b><small className="text-muted">{result.ip}</small></span><span className="text-primary">Open</span></button>)}</div>}</div><button aria-label="Notifications" onClick={() => setNotifications(!notifications)} className="relative action-button px-2.5"><Bell size={16}/><i className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-danger text-[9px] text-white">4</i></button><button aria-label="Settings" onClick={() => setActivePage('Settings')} className="action-button px-2.5"><Settings size={16}/></button>{notifications && <div className="absolute right-16 top-16 w-72 rounded-xl border border-border bg-surface p-3 shadow-panel"><p className="mb-2 text-xs font-semibold">Notifications</p>{['1 Critical · Secretaria Printer', '2 Warning · Devices need attention', '1 Info · Failover available'].map(item => <button key={item} className="block w-full rounded-lg px-2 py-2 text-left text-xs text-muted hover:bg-panel hover:text-ink">{item}</button>)}</div>}<button onClick={() => setActivePage('Settings')} className="hidden rounded-full border border-border p-2 text-muted hover:text-primary sm:block"><SlidersHorizontal size={15}/></button></div>}
  </header>
}

import { useState } from 'react'
