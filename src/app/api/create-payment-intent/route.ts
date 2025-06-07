import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', booking_data } = await request.json()

    // Crear el Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe usa centavos
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        destination_id: booking_data.destination_id,
        user_id: booking_data.user_id,
        guests: booking_data.guests.toString(),
        check_in: booking_data.check_in,
        check_out: booking_data.check_out,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Error al crear el payment intent' },
      { status: 500 }
    )
  }
} 