import { useEffect, useState } from 'react'
import { useAPI } from '../../hooks/useAPI'

function getDeliveryEstimate(items) {
  const total = items.reduce((sum, item) => sum + item.quantity, 0)
  if (total >= 10) return '2 horas'
  if (total > 5) return '1 hora e 30 minutos'
  if (total === 1) return '40 minutos'
  return '1 hora'
}

export const useCheckout = (cartItems = []) => {
  const { getItems } = useAPI()
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [address, setAddress] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await getItems()
        setItems(response)
      } catch (error) {
        console.error('Erro ao buscar itens:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [getItems])

  const checkoutItems = cartItems.length > 0 ? cartItems : items

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const deliveryEstimate = getDeliveryEstimate(checkoutItems)

  const handleConfirm = () => {
    setConfirmed(true)
  }

  return {
    loading,
    confirmed,
    address,
    setAddress,
    checkoutItems,
    total,
    deliveryEstimate,
    handleConfirm
  }
}