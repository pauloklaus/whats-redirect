import { ref, onMounted } from 'vue'

export function useShareChat() {
  const canShare = ref(false)

  onMounted(() => {
    canShare.value = typeof navigator.share === 'function'
  })

  async function share(text: string): Promise<void> {
    if (!canShare.value) return

    try {
      await navigator.share({ text })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      throw error
    }
  }

  return {
    canShare,
    share,
  }
}
