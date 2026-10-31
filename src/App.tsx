import { useEffect } from 'react'
import { DeviceDrawer } from './components/devices/DeviceDrawer'
import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { AlertsPage } from './pages/Alerts'
import { DashboardPage } from './pages/Dashboard'
import { EventsPage } from './pages/Events'
import { NetworkPage } from './pages/Network'
import { PrintersPage } from './pages/Printers'
import { ServersPage } from './pages/Servers'
import { SettingsPage } from './pages/Settings'
import { TopologyPage } from './pages/Topology'
import { useMonitorStore } from './store/useMonitorStore'

const pages = { Dashboard: DashboardPage, Topology: TopologyPage, Servers: ServersPage, Network: NetworkPage, Printers: PrintersPage, Alerts: AlertsPage, Events: EventsPage, Settings: SettingsPage }

export default function App() {
  const activePage = useMonitorStore(state => state.activePage)
  const presentationMode = useMonitorStore(state => state.presentationMode)
  const setPresentationMode = useMonitorStore(state => state.setPresentationMode)
  const resetDemo = useMonitorStore(state => state.resetDemo)
  const Page = pages[activePage]
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'f' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) setPresentationMode(!presentationMode)
      if (event.key.toLowerCase() === 'r' && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) resetDemo()
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); document.querySelector<HTMLInputElement>('input[placeholder="Search devices..."]')?.focus() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [presentationMode, resetDemo, setPresentationMode])
  return <div className="h-dvh overflow-hidden bg-canvas"><Sidebar/><main className={`flex h-dvh min-w-0 flex-col overflow-hidden ${presentationMode ? '' : 'lg:pl-72'}`}><Topbar/><div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto"><div className={`mx-auto max-w-[1700px] p-5 lg:p-6 ${presentationMode ? 'max-w-none' : ''}`}><Page/></div></div></main><DeviceDrawer/></div>
}
