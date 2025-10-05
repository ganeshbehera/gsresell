"use client"

import { useState, useEffect } from 'react'

interface CurrencyData {
  country: string
  currency: string
  symbol: string
  rate: number
  basePriceUSD: number
  localPrice: number
  formattedPrice: string
  pricing: {
    monthly: {
      price: number
      formatted: string
    }
    annual: {
      price: number
      formatted: string
    }
  }
}

interface UseCurrencyReturn {
  currencyData: CurrencyData | null
  loading: boolean
  error: string | null
  refreshCurrency: () => void
}

export function useCurrency(): UseCurrencyReturn {
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCurrencyData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/currency')
      const result = await response.json()
      
      if (result.success) {
        setCurrencyData(result.data)
      } else {
        throw new Error('Failed to fetch currency data')
      }
    } catch (err) {
      console.error('Currency fetch error:', err)
      setError('Failed to load currency data')
      
      // Fallback to USD
      setCurrencyData({
        country: 'US',
        currency: 'USD',
        symbol: '$',
        rate: 1,
        basePriceUSD: 18,
        localPrice: 18,
        formattedPrice: '$18',
        pricing: {
          monthly: {
            price: 18,
            formatted: '$18'
          },
          annual: {
            price: 194.4,
            formatted: '$194.40'
          }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCurrencyData()
  }, [])

  const refreshCurrency = () => {
    fetchCurrencyData()
  }

  return {
    currencyData,
    loading,
    error,
    refreshCurrency
  }
}
