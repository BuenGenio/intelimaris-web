const PARTS = ['info', 'intelimarine', 'com'] as const

export function buildEmail(): string {
  return `${PARTS[0]}@${PARTS[1]}.${PARTS[2]}`
}

export interface MailtoOptions {
  subject?: string
  body?: string
}

export function buildMailto(opts: MailtoOptions = {}): string {
  const params: string[] = []
  if (opts.subject) params.push(`subject=${encodeURIComponent(opts.subject)}`)
  if (opts.body) params.push(`body=${encodeURIComponent(opts.body)}`)
  const qs = params.length ? `?${params.join('&')}` : ''
  return `${'mai'}${'lto:'}${buildEmail()}${qs}`
}
