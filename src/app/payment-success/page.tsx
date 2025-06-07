'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  const paymentIntent = searchParams.get('payment_intent')
  const clientSecret = searchParams.get('payment_intent_client_secret')

  useEffect(() => {
    // Simular verificación de pago
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verificando Pago</h1>
          <p className="text-gray-600">Por favor espera mientras confirmamos tu pago...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
        <p className="text-gray-600 mb-6">
          Tu pago ha sido procesado exitosamente y tu reserva ha sido confirmada.
        </p>
        
        {paymentIntent && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Payment Intent ID:</p>
            <p className="text-sm font-mono text-gray-700 break-all">{paymentIntent}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link 
            href="/dashboard/bookings"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors block text-center"
          >
            Ver Mis Reservas
          </Link>
          <Link 
            href="/destinations"
            className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors block text-center"
          >
            Explorar Más Destinos
          </Link>
        </div>
      </div>
    </div>
  )
} 