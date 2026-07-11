import { ref, onMounted, onUnmounted } from 'vue'

function isAndroid(): boolean {
  return /Android/i.test(navigator.userAgent)
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

export function usePwaInstall() {
  const canInstall = ref(false)
  let deferredPrompt: BeforeInstallPromptEvent | null = null

  async function install(): Promise<void> {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      canInstall.value = false
    }

    deferredPrompt = null
  }

  function onBeforeInstallPrompt(event: Event): void {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent

    if (isAndroid() && !isStandalone()) {
      canInstall.value = true
    }
  }

  function onAppInstalled(): void {
    canInstall.value = false
    deferredPrompt = null
  }

  onMounted(() => {
    if (isStandalone()) return

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.removeEventListener('appinstalled', onAppInstalled)
  })

  return {
    canInstall,
    install,
  }
}
