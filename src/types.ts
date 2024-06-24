import type { Application, ApplicationContent } from './schemas'

export type ApplicationData = Omit<Application, 'content'> & {
  content: ApplicationContent
}

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}
