import Image from 'next/image'
import { Globe2, Users, Award, Heart } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-gray-900">
        <Image
          src="/about-hero.jpg"
          alt="Travel experiences"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Crafting unforgettable travel experiences since 2010
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To inspire and enable travelers to discover the world's most remarkable destinations 
              while promoting sustainable and responsible tourism.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Globe2, stat: '50+', label: 'Destinations' },
              { icon: Users, stat: '10,000+', label: 'Happy Travelers' },
              { icon: Award, stat: '15+', label: 'Years Experience' },
              { icon: Heart, stat: '98%', label: 'Satisfaction Rate' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{item.stat}</div>
                <div className="text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, ensuring that each journey 
                exceeds our clients' expectations.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability</h3>
              <p className="text-gray-600">
                We are committed to sustainable tourism practices that benefit local communities 
                and protect the environment.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate our services and experiences to provide unique and 
                memorable adventures for our travelers.
              </p>
            </div>
          </div>

          {/* Team */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Meet the passionate travel experts dedicated to making your journey extraordinary
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((member) => (
                <div key={member} className="text-center">
                  <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={`/team-member-${member}.jpg`}
                      alt="Team member"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                  <p className="text-gray-600">Travel Expert</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 