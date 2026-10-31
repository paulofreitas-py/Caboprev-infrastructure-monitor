const eventTemplates = [
  ['HP DL380 Gen9', 'Health check completed'],
  ['Core Switch', 'Traffic update received'],
  ['Dell R730', 'Replica synchronization completed'],
  ['MikroTik RB3011', 'Latency check completed'],
  ['Firewall', 'Security policy health check completed']
] as const

export const realtimeEvent = () => eventTemplates[Math.floor(Math.random() * eventTemplates.length)]

