# Adventure Software - Travel Agency Platform

## Project Overview
Adventure Software is a SaaS company specializing in comprehensive software solutions for local and regional travel businesses. Our platform focuses on delivering high-conversion websites, streamlined booking systems, and intelligent business automation tools.

### Core Value Proposition
- Convert visitors into loyal customers
- Streamline business operations
- Enhance customer engagement
- Scale through AI and automation
- Empower local/regional businesses

## Technical Architecture

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

### Backend Services
- **Authentication**: Clerk
- **Database**: Supabase
- **Payments**: Stripe
- **Booking System**: Calendly API/TidyCal integration

## Core Features

### 1. Marketing Landing Page
- Compelling hero section with clear value proposition
- Service showcase with dynamic animations
- Client success stories and testimonials
- Clear CTAs for sign-up and demo booking
- Local business focus section

### 2. Authentication System
- Secure sign-up/login flow
- Social authentication options
- Password recovery
- Email verification
- Role-based access control

### 3. User Dashboard
- Profile management
- Booking history
- Payment records
- Service preferences
- Notification settings

### 4. Booking System
- Interactive calendar interface
- Real-time availability
- Automated confirmations
- Rescheduling capabilities
- Calendar sync (iCal/Google)

### 5. Payment Processing
- Secure Stripe integration
- Multiple payment methods
- Subscription management
- Invoice generation
- Payment history

## Database Schema

### Users Table
```sql
users (
  id: uuid
  email: string
  name: string
  stripe_customer_id: string
  role: enum['customer', 'admin']
  created_at: timestamp
)
```

### Appointments Table
```sql
appointments (
  id: uuid
  user_id: uuid (foreign key)
  service_id: uuid
  datetime: timestamp
  status: enum['scheduled', 'completed', 'cancelled']
  notes: text
)
```

### Payments Table
```sql
payments (
  id: uuid
  user_id: uuid (foreign key)
  amount: decimal
  status: enum['pending', 'completed', 'failed']
  stripe_payment_id: string
  created_at: timestamp
)
```

## API Routes

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/reset-password

### Bookings
- GET /api/bookings
- POST /api/bookings/create
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

### Payments
- POST /api/payments/create-intent
- POST /api/payments/webhook
- GET /api/payments/history

## Deployment Guidelines

### Environment Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Configure Clerk authentication
5. Set up Supabase connection
6. Configure Stripe keys

### Required Environment Variables
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Design Guidelines

### Color Palette
- Primary: #4F46E5 (Indigo)
- Secondary: #10B981 (Emerald)
- Accent: #F59E0B (Amber)
- Background: #FFFFFF
- Text: #111827

### Typography
- Headings: Inter (Bold)
- Body: Inter (Regular)
- Buttons: Inter (Medium)

### Responsive Breakpoints
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

## Performance Requirements
- Page load time < 3s
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse score > 90

## Security Requirements
- HTTPS enforcement
- CSRF protection
- Rate limiting
- Data encryption at rest
- Regular security audits

## Monitoring
- Error tracking via Sentry
- Performance monitoring via Vercel Analytics
- User behavior tracking via Google Analytics
- Server monitoring via AWS CloudWatch 