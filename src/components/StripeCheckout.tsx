'use client'

import { useState } from 'react'
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  clientSecret: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

function CheckoutForm({ clientSecret, amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(null)

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required'
      })

      if (error) {
        setErrorMessage(error.message || 'Ocurrió un error durante el pago')
        onError(error.message || 'Error de pago')
      } else {
        onSuccess()
      }
    } catch (error) {
      console.error('Payment error:', error)
      setErrorMessage('Ocurrió un error inesperado')
      onError('Error inesperado')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Información de Pago
        </h3>
        <p className="text-gray-600">
          Total a pagar: <span className="font-semibold">${amount}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <PaymentElement 
          options={{
            layout: 'tabs'
          }}
        />
        
        {errorMessage && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Procesando pago...</span>
            </>
          ) : (
            <>
              <span>Pagar ${amount}</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

interface StripeCheckoutProps {
  clientSecret: string
  amount: number
  onSuccess: () => void
  onError: (error: string) => void
}

export default function StripeCheckout({ clientSecret, amount, onSuccess, onError }: StripeCheckoutProps) {
  if (!clientSecret) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Preparando pago...</span>
        </div>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#2563eb',
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm 
        clientSecret={clientSecret}
        amount={amount}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  )
} 