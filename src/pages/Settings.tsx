import { MonitorUp, Presentation, RotateCcw, VolumeX } from 'lucide-react'
import { useMonitorStore } from '../store/useMonitorStore'

export function SettingsPage() {
  const presentationMode = useMonitorStore(state => state.presentationMode)
  const setPresentationMode = useMonitorStore(state => state.setPresentationMode)
  const resetDemo = useMonitorStore(state => state.resetDemo)
  const togglePresentation = async () => {
    const next = !presentationMode
    setPresentationMode(next)
    if (next && !document.fullscreenElement) await document.documentElement.requestFullscreen()
    if (!next && document.fullscreenElement) await document.exitFullscreen()
  }
  const controls = [['Theme','Dark'], ['Refresh Interval','2 seconds'], ['Animation','Enabled'], ['Simulation','Enabled'], ['Sound','Disabled']]
  return <div className="space-y-5"><div><p className="eyebrow">Settings</p><h1 className="mt-1 text-2xl font-semibold">Monitor preferences</h1><p className="mt-2 text-sm text-muted">Demo preferences and topology positions persist locally.</p></div><div className="grid gap-5 lg:grid-cols-2"><section className="panel p-5"><p className="section-title">General</p><div className="mt-4 divide-y divide-border">{controls.map(([label, value]) => <div key={label} className="flex items-center justify-between py-4"><span className="text-sm">{label}</span><span className="rounded-lg border border-border bg-surface px-2.5 py-1 text-xs text-muted">{value}</span></div>)}</div></section><section className="panel p-5"><p className="section-title">Presentation Mode</p><p className="mt-2 text-sm leading-relaxed text-muted">Hide the sidebar, prioritize the topology and use full screen controls for operations reviews.</p><button onClick={togglePresentation} className={`mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold ${presentationMode ? 'bg-primary text-canvas' : 'border border-border bg-surface text-ink hover:border-primary'}`}><Presentation size={16}/>{presentationMode ? 'Exit Presentation Mode' : 'Presentation Mode'}</button><div className="mt-6 rounded-xl border border-border bg-surface p-4"><p className="flex items-center gap-2 text-xs font-semibold"><MonitorUp size={15} className="text-success"/>Mock Monitoring Engine</p><p className="mt-1 text-xs text-muted">Simulation updates every two seconds without external requests.</p></div></section></div><section className="panel p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="section-title">Reset Demo</p><p className="mt-1 text-xs text-muted">Restores original positions, connections, alerts and data.</p></div><button onClick={() => { resetDemo(); localStorage.removeItem('nexus-monitor-store') }} className="inline-flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-2.5 text-xs font-semibold text-danger hover:bg-danger/20"><RotateCcw size={15}/>Reset Demo</button></div></section></div>
}
