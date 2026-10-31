import type { Printer } from '../types'

export const printers: Printer[] = [
  { id: 'printer-secretaria', name: 'Secretaria Printer', location: 'Secretaria', ip: '192.168.85.209', model: 'Samsung', status: 'offline', ping: null, toner: null, pages: null, lastCheck: '2 min atrás' },
  { id: 'printer-1andar', name: '1st Floor Printer', location: '1º Andar', ip: '192.168.85.211', model: 'C3003', status: 'offline', ping: null, toner: null, pages: null, lastCheck: '2 min atrás' },
  { id: 'printer-presidencia', name: 'Presidência Printer', location: 'Presidência', ip: '192.168.85.203', model: 'Samsung M33x 382x 402x Series', status: 'online', ping: 2, toner: 72, pages: 18423, lastCheck: 'agora' },
  { id: 'printer-04', name: 'Impressora 04', location: 'Rede administrativa', ip: '192.168.85.204', model: 'Não informado', status: 'online', ping: 3, toner: 68, pages: 15402, lastCheck: 'agora' },
  { id: 'printer-05', name: 'Impressora 05', location: 'Rede administrativa', ip: '192.168.85.205', model: 'Não informado', status: 'online', ping: 2, toner: 81, pages: 12195, lastCheck: 'agora' },
  { id: 'printer-06', name: 'Impressora 06', location: 'Rede administrativa', ip: '192.168.85.206', model: 'Não informado', status: 'online', ping: 4, toner: 59, pages: 9250, lastCheck: 'agora' },
  { id: 'printer-07', name: 'Impressora 07', location: 'Rede administrativa', ip: '192.168.85.207', model: 'Não informado', status: 'online', ping: 3, toner: 75, pages: 10714, lastCheck: 'agora' },
  { id: 'printer-08', name: 'Impressora 08', location: 'Rede administrativa', ip: '192.168.85.208', model: 'Não informado', status: 'online', ping: 2, toner: 66, pages: 11380, lastCheck: 'agora' }
]

