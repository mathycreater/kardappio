import { useState, useEffect } from 'react'
import { useAPI } from '../../hooks/useAPI'

export function useProducts() {
  const { getItems } = useAPI()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getItems().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [getItems])

  return { products, loading }
}
