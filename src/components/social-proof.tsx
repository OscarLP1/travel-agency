import { Star, User } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Explored Machu Picchu",
    text: "An unforgettable experience! The guides were knowledgeable and the itinerary was perfectly balanced.",
  },
  {
    name: "Michael Chen",
    location: "Safari in Tanzania",
    text: "Adventure Travel made our dream safari a reality. Every detail was taken care of, allowing us to focus on the experience.",
  },
  {
    name: "Emma Davis",
    location: "Northern Lights Tour",
    text: "The Northern Lights tour exceeded all expectations. The local expertise and personalized service made it special.",
  },
]

export function SocialProof() {
  return (
    <section className="bg-secondary/50 py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-4xl font-bold">What Our Adventurers Say</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              <div className="mb-4 flex text-yellow-400">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 