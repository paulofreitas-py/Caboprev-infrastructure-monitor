import type { MetricPoint } from '../types'

const labels = ['00h', '03h', '06h', '09h', '12h', '15h', '18h', '21h', 'Agora']

export const initialMetrics: MetricPoint[] = labels.map((time, index) => ({
  time,
  cpu: [31, 34, 33, 37, 35, 41, 39, 36, 38][index],
  memory: [59, 60, 61, 62, 63, 63, 65, 64, 64][index],
  network: [44, 51, 48, 59, 64, 57, 61, 54, 58][index],
  availability: [99.1, 99.3, 99.2, 99.4, 99.3, 99.2, 99.3, 99.2, 99.2][index],
  download: [142, 168, 157, 182, 201, 176, 195, 188, 211][index],
  upload: [32, 41, 37, 46, 54, 43, 49, 45, 52][index]
}))

export const vary = (value: number, spread: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, Math.round((value + (Math.random() - 0.5) * spread) * 10) / 10))

