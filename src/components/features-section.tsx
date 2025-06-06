import { Compass, Globe, Map, Users } from 'lucide-react'

const features = [
  {
    title: "Curated Destinations",
    description: "Hand-picked locations that offer unique and extraordinary experiences.",
    icon: Globe,
  },
  {
    title: "Expert Guides",
    description: "Local experts who bring destinations to life with their knowledge and passion.",
    icon: Users,
  },
  {
    title: "Adventure Planning",
    description: "Personalized itineraries tailored to your interests and preferences.",
    icon: Map,
  },
  {
    title: "Unique Experiences",
    description: "Off-the-beaten-path activities that create unforgettable memories.",
    icon: Compass,
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-white py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Adventure Travel</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 