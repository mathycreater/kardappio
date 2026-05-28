import { useCallback } from 'react'
import products from '../data/products'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const useAPI = () => {

  const getItems = useCallback(
    () => delay(800).then(() => products),
    []
  )

  return { getItems }
}