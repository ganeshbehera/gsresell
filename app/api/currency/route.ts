import { NextRequest, NextResponse } from 'next/server'

// Currency conversion rates (you can replace this with a real API like exchangerate-api.com)
const EXCHANGE_RATES: Record<string, number> = {
  'USD': 1,      // Base currency
  'EUR': 0.85,
  'GBP': 0.73,
  'AED': 3.67,   // UAE Dirham
  'SAR': 3.75,   // Saudi Riyal
  'INR': 83.12,  // Indian Rupee
  'CAD': 1.25,   // Canadian Dollar
  'AUD': 1.35,   // Australian Dollar
  'JPY': 110.0,  // Japanese Yen
  'CNY': 6.45,   // Chinese Yuan
  'KRW': 1180.0, // South Korean Won
  'SGD': 1.35,   // Singapore Dollar
  'HKD': 7.8,    // Hong Kong Dollar
  'CHF': 0.92,   // Swiss Franc
  'SEK': 8.5,    // Swedish Krona
  'NOK': 8.8,    // Norwegian Krone
  'DKK': 6.3,    // Danish Krone
  'PLN': 3.9,    // Polish Zloty
  'CZK': 21.5,   // Czech Koruna
  'HUF': 310.0,  // Hungarian Forint
  'RUB': 74.0,   // Russian Ruble
  'BRL': 5.2,    // Brazilian Real
  'MXN': 18.0,   // Mexican Peso
  'ZAR': 15.5,   // South African Rand
  'TRY': 8.5,    // Turkish Lira
  'THB': 33.0,   // Thai Baht
  'MYR': 4.2,    // Malaysian Ringgit
  'IDR': 14500.0, // Indonesian Rupiah
  'PHP': 50.0,   // Philippine Peso
  'VND': 23000.0, // Vietnamese Dong
  'EGP': 15.7,   // Egyptian Pound
  'QAR': 3.64,   // Qatari Riyal
  'KWD': 0.30,   // Kuwaiti Dinar
  'BHD': 0.38,   // Bahraini Dinar
  'OMR': 0.38,   // Omani Rial
  'JOD': 0.71,   // Jordanian Dinar
  'LBP': 1507.5, // Lebanese Pound
  'ILS': 3.2,    // Israeli Shekel
}

// Country to currency mapping
const COUNTRY_CURRENCY: Record<string, string> = {
  'US': 'USD',
  'CA': 'CAD',
  'GB': 'GBP',
  'DE': 'EUR',
  'FR': 'EUR',
  'IT': 'EUR',
  'ES': 'EUR',
  'NL': 'EUR',
  'BE': 'EUR',
  'AT': 'EUR',
  'PT': 'EUR',
  'IE': 'EUR',
  'FI': 'EUR',
  'GR': 'EUR',
  'AE': 'AED',
  'SA': 'SAR',
  'IN': 'INR',
  'AU': 'AUD',
  'JP': 'JPY',
  'CN': 'CNY',
  'KR': 'KRW',
  'SG': 'SGD',
  'HK': 'HKD',
  'CH': 'CHF',
  'SE': 'SEK',
  'NO': 'NOK',
  'DK': 'DKK',
  'PL': 'PLN',
  'CZ': 'CZK',
  'HU': 'HUF',
  'RU': 'RUB',
  'BR': 'BRL',
  'MX': 'MXN',
  'ZA': 'ZAR',
  'TR': 'TRY',
  'TH': 'THB',
  'MY': 'MYR',
  'ID': 'IDR',
  'PH': 'PHP',
  'VN': 'VND',
  'EG': 'EGP',
  'QA': 'QAR',
  'KW': 'KWD',
  'BH': 'BHD',
  'OM': 'OMR',
  'JO': 'JOD',
  'LB': 'LBP',
  'IL': 'ILS',
}

// Currency symbols
const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'AED': 'د.إ',
  'SAR': 'ر.س',
  'INR': '₹',
  'CAD': 'C$',
  'AUD': 'A$',
  'JPY': '¥',
  'CNY': '¥',
  'KRW': '₩',
  'SGD': 'S$',
  'HKD': 'HK$',
  'CHF': 'CHF',
  'SEK': 'kr',
  'NOK': 'kr',
  'DKK': 'kr',
  'PLN': 'zł',
  'CZK': 'Kč',
  'HUF': 'Ft',
  'RUB': '₽',
  'BRL': 'R$',
  'MXN': '$',
  'ZAR': 'R',
  'TRY': '₺',
  'THB': '฿',
  'MYR': 'RM',
  'IDR': 'Rp',
  'PHP': '₱',
  'VND': '₫',
  'EGP': 'ج.م',
  'QAR': 'ر.ق',
  'KWD': 'د.ك',
  'BHD': 'د.ب',
  'OMR': 'ر.ع.',
  'JOD': 'د.ا',
  'LBP': 'ل.ل',
  'ILS': '₪',
}

export async function GET(request: NextRequest) {
  try {
    // Get country from Vercel's geo headers or IP geolocation
    const country = request.geo?.country || request.headers.get('cf-ipcountry') || 'US'
    const currency = COUNTRY_CURRENCY[country] || 'USD'
    const symbol = CURRENCY_SYMBOLS[currency] || '$'
    const rate = EXCHANGE_RATES[currency] || 1

    // Base price in USD (Google Workspace Business Plus)
    const basePriceUSD = 18 // $18 per user per month

    // Convert to local currency
    const localPrice = Math.round(basePriceUSD * rate * 100) / 100

    return NextResponse.json({
      success: true,
      data: {
        country,
        currency,
        symbol,
        rate,
        basePriceUSD,
        localPrice,
        formattedPrice: `${symbol}${localPrice.toLocaleString()}`,
        // Additional pricing tiers
        pricing: {
          monthly: {
            price: localPrice,
            formatted: `${symbol}${localPrice.toLocaleString()}`
          },
          annual: {
            price: Math.round(localPrice * 12 * 0.9 * 100) / 100, // 10% discount for annual
            formatted: `${symbol}${Math.round(localPrice * 12 * 0.9 * 100) / 100}`
          }
        }
      }
    })

  } catch (error) {
    console.error('Currency conversion error:', error)
    
    // Fallback to USD pricing
    return NextResponse.json({
      success: true,
      data: {
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
            price: 194.4, // 10% discount
            formatted: '$194.40'
          }
        }
      }
    })
  }
}
