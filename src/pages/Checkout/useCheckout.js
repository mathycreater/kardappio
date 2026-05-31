import { useState } from 'react'

function getDeliveryEstimate(items) {
  const total = items.reduce((sum, item) => sum + item.quantity, 0)
  if (total >= 10) return '2 horas'
  if (total > 5) return '1 hora e 30 minutos'
  if (total === 1) return '40 minutos'
  return '1 hora'
}

export const useCheckout = (cartItems = []) => {
  const [address, setAddress] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const checkoutItems = cartItems

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const deliveryEstimate = getDeliveryEstimate(checkoutItems)

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return {
    confirmed,
    address,
    setAddress,
    checkoutItems,
    total,
    deliveryEstimate,
    handleConfirm
  }
}