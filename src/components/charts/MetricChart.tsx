import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MetricPoint } from '../../types'

const tooltipStyle = { background: '#0A121A', border: '1px solid #1C303E', borderRadius: 10, fontSize: 11 }

export function HealthChart({ data, metric }: { data: MetricPoint[]; metric: 'cpu' | 'memory' | 'network' | 'availability' }) {
  const colors = { cpu: '#A78BFA', memory: '#42C8FF', network: '#35D07F', availability: '#F5B942' }
  return <ResponsiveContainer width="100%" height={285}><LineChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -22 }}><CartesianGrid vertical={false} stroke="#1C303E" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8497A6', fontSize: 10 }} /><YAxis domain={metric === 'availability' ? [98.5, 100] : [0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#8497A6', fontSize: 10 }} /><Tooltip contentStyle={tooltipStyle} /><Line type="monotone" dataKey={metric} stroke={colors[metric]} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} isAnimationActive /></LineChart></ResponsiveContainer>
}

export function TrafficChart({ data }: { data: MetricPoint[] }) {
  return <ResponsiveContainer width="100%" height={240}><AreaChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: -20 }}><defs><linearGradient id="download" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#42C8FF" stopOpacity={.4}/><stop offset="100%" stopColor="#42C8FF" stopOpacity={0}/></linearGradient><linearGradient id="upload" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#A78BFA" stopOpacity={.35}/><stop offset="100%" stopColor="#A78BFA" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="#1C303E" /><XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#8497A6', fontSize: 10 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#8497A6', fontSize: 10 }} /><Tooltip contentStyle={tooltipStyle} /><Area type="monotone" dataKey="download" stroke="#42C8FF" fill="url(#download)" strokeWidth={2} /><Area type="monotone" dataKey="upload" stroke="#A78BFA" fill="url(#upload)" strokeWidth={2} /></AreaChart></ResponsiveContainer>
}

