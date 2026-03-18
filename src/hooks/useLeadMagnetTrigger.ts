import { useCallback, useEffect, useRef, useState } from "react"

const STORAGE_KEY = "lead-magnet-dismissed"
const IDLE_MS = 60_000

export function useLeadMagnetTrigger(checkoutOpen: boolean) {
  const [showPopup, setShowPopup] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isDismissed = () => sessionStorage.getItem(STORAGE_KEY) === "1"

  const dismissPopup = useCallback(() => {
    setShowPopup(false)
    sessionStorage.setItem(STORAGE_KEY, "1")
  }, [])

  // ── Show after 60 s of inactivity, only if checkout is not open ──
  useEffect(() => {
    const start = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        if (!isDismissed() && !checkoutOpen) setShowPopup(true)
      }, IDLE_MS)
    }

    const onActivity = () => {
      if (!showPopup) start()
    }

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "scroll",
      "click",
      "keydown",
      "touchstart",
    ]

    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }))
    start() // kick off initial timer

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, onActivity))
    }
  }, [checkoutOpen, showPopup])

  // ── Hide if checkout opens while popup is visible ──
  useEffect(() => {
    if (checkoutOpen && showPopup) setShowPopup(false)
  }, [checkoutOpen, showPopup])

  return { showPopup, dismissPopup } as const
}
