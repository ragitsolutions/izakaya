import { useCallback, useEffect, useState } from 'react'
import { reservationService } from '@/services/reservationService'
import type { Reservation } from '@/types/reservation'

export function useReservationByToken(token: string | undefined) {
  const [reservation, setReservation] = useState<Reservation | null | undefined>(undefined)

  const reload = useCallback(() => {
    if (!token) {
      setReservation(null)
      return
    }
    setReservation(undefined)
    reservationService.getReservationByToken(token).then(setReservation)
  }, [token])

  useEffect(() => {
    reload()
  }, [reload])

  return {
    reservation,
    isLoading: reservation === undefined,
    notFound: reservation === null,
    reload,
  }
}
