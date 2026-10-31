import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MockMonitoringProvider } from './mock/MockMonitoringProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><MockMonitoringProvider><App/></MockMonitoringProvider></React.StrictMode>)

