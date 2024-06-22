import type { ApplicationData } from '@/types'

export function useApplication(): ApplicationData {
  const application = window.__APP_DATA__

  if (!application) {
    throw new Error('Application not found')
  }

  return application
}
