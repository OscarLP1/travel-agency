'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { CalendarDays, MapPin, Users, CheckCircle, User, Mail, Phone } from 'lucide-react'
import { getDestinationBySlug } from '@/lib/supabase/booking-management'
import { ensureUserExists } from '@/lib/supabase/user-management'
import StripeCheckout from '@/components/StripeCheckout'
import Link from 'next/link'

interface Destination {
  id: string
  name: string
  location: string
  image_url: string
  price: number
  duration: string
  description: string
}

interface BookingFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  // Travel Details
  checkIn: string
  checkOut: string
  guests: number
  notes: string
}

export default function BookingConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [paymentStep, setPaymentStep] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  const [formData, setFormData] = useState<BookingFormData>({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Travel Details
    checkIn: '',
    checkOut: '',
    guests: 1,
    notes: ''
  })

  useEffect(() => {
    if (!isLoaded) return
    
    if (!user) {
      router.push('/sign-in')
      return
    }

    const fetchDestination = async () => {
      try {
        const destinationData = await getDestinationBySlug(params.destinationSlug as string)
        if (destinationData) {
          setDestination(destinationData)
          // Pre-fill user information
          setFormData(prev => ({
            ...prev,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.emailAddresses[0]?.emailAddress || ''
          }))
        } else {
          router.push('/destinations')
        }
      } catch (error) {
        console.error('Error fetching destination:', error)
        router.push('/destinations')
      } finally {
        setLoading(false)
      }
    }

    fetchDestination()
  }, [isLoaded, user, params.destinationSlug, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateTotal = () => {
    if (!destination) return 0
    const checkIn = new Date(formData.checkIn)
    const checkOut = new Date(formData.checkOut)
    const days = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? destination.price * formData.guests * days : destination.price * formData.guests
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !destination) return

    setSubmitting(true)
    try {
      // Ensure user exists in Supabase
      await ensureUserExists(user)

      const bookingData = {
        user_id: user.id,
        destination_id: destination.id,
        check_in: formData.checkIn,
        check_out: formData.checkOut,
        guests: formData.guests,
        total_amount: calculateTotal(),
        notes: formData.notes,
      }

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotal(),
          booking_data: bookingData,
        }),
      })

      const { clientSecret, paymentIntentId } = await response.json()
      
      if (clientSecret) {
        setClientSecret(clientSecret)
        setPaymentIntentId(paymentIntentId)
        setPaymentStep(true)
      } else {
        alert('Error al preparar el pago. Por favor intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error preparing payment:', error)
      alert('Ocurrió un error. Por favor intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    setBookingSuccess(true)
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert(`Error en el pago: ${error}`)
    setPaymentStep(false)
    setClientSecret(null)
  }

  if (loading || !isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destino no encontrado</h1>
          <Link href="/destinations" className="text-blue-600 hover:text-blue-800">
            Volver a destinos
          </Link>
        </div>
      </div>
    )
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h1>
          <p className="text-gray-600 mb-6">
            Tu reserva para {destination.name} ha sido confirmada y pagada exitosamente.
          </p>
          <div className="space-y-2 mb-6">
            <p className="text-sm text-gray-500">Payment Intent: {paymentIntentId}</p>
            <p className="text-sm text-gray-500">Total Pagado: ${calculateTotal()}</p>
            <p className="text-sm text-gray-500">Huéspedes: {formData.guests}</p>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-3xl font-bold">
              {paymentStep ? 'Completa tu Pago' : 'Confirma tu Reserva'}
            </h1>
            <p className="text-blue-100 mt-2">
              {paymentStep 
                ? 'Procesa el pago para confirmar tu reservación' 
                : 'Revisa tu información y procede al pago'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Destination Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del Viaje</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <img 
                    src={destination.image_url} 
                    alt={destination.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                  <p className="text-gray-600 flex items-center mt-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    {destination.location}
                  </p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    {destination.duration}
                  </p>
                  <p className="text-lg font-bold text-blue-600 mt-3">${destination.price} por persona</p>
                  
                  {/* Booking Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Detalles de la Reserva</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Huéspedes:</span>
                        <span>{formData.guests} persona(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Precio por persona:</span>
                        <span>${destination.price}</span>
                      </div>
                      {formData.checkIn && (
                        <div className="flex justify-between">
                          <span>Check-in:</span>
                          <span>{formData.checkIn}</span>
                        </div>
                      )}
                      {formData.checkOut && (
                        <div className="flex justify-between">
                          <span>Check-out:</span>
                          <span>{formData.checkOut}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-3">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span className="text-blue-600">${calculateTotal()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form or Payment */}
            <div className="lg:col-span-2">
              {!paymentStep ? (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      <User className="h-5 w-5 inline mr-2" />
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Tu apellido"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="h-4 w-4 inline mr-1" />
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="h-4 w-4 inline mr-1" />
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Travel Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      <CalendarDays className="h-5 w-5 inline mr-2" />
                      Detalles del Viaje
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Entrada *
                        </label>
                        <input
                          type="date"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fecha de Salida *
                        </label>
                        <input
                          type="date"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="h-4 w-4 inline mr-1" />
                        Número de Huéspedes *
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notas adicionales
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Cualquier solicitud especial o comentario..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      {submitting ? 'Preparando pago...' : `Proceder al Pago - $${calculateTotal()}`}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Información de la Reserva</h3>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p><strong>Huésped:</strong> {formData.firstName} {formData.lastName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Fechas:</strong> {formData.checkIn} al {formData.checkOut}</p>
                      <p><strong>Huéspedes:</strong> {formData.guests}</p>
                    </div>
                  </div>

                  <StripeCheckout
                    clientSecret={clientSecret!}
                    amount={calculateTotal()}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />

                  <button
                    onClick={() => setPaymentStep(false)}
                    className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Volver al Formulario
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 