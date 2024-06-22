import { Application } from '@/types'

export function useApplication(): Application {
  const application = window.__APP__

  if (!application) {
    throw new Error('Application not found')
  }

  return application
}
