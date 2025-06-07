import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createBooking } from '@/lib/supabase/booking-management'
import { ensureUserExists } from '@/lib/supabase/user-management'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Crear la reserva en la base de datos
        const bookingData = {
          user_id: paymentIntent.metadata.user_id,
          destination_id: paymentIntent.metadata.destination_id,
          check_in: paymentIntent.metadata.check_in,
          check_out: paymentIntent.metadata.check_out,
          guests: parseInt(paymentIntent.metadata.guests),
          total_amount: paymentIntent.amount / 100, // Convertir de centavos a dólares
          status: 'confirmed',
          payment_intent_id: paymentIntent.id,
        }

        try {
          // Asegurar que el usuario existe
          await ensureUserExists({ id: paymentIntent.metadata.user_id } as any)
          
          // Crear la reserva
          const booking = await createBooking(bookingData)
          console.log('Booking created:', booking)
        } catch (error) {
          console.error('Error creating booking:', error)
        }
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', failedPayment.id)
        // Aquí podrías manejar pagos fallidos, enviar emails, etc.
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
} 