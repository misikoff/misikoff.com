import PricingComponent from './component'

// metadata for SEO
export const metadata = {
  title: 'Vercel Pricing Calculator',
  description:
    'Estimate your Vercel costs based on usage. Calculate costs for edge requests, bandwidth, functions, and more.',
  keywords: [
    'Vercel',
    'Pricing Calculator',
    'Edge Requests',
    'Bandwidth',
    'Functions',
    'Cost Estimation',
  ],
}

export default function PricingPage() {
  return (
    <div className='flex flex-col items-center w-full h-full p-6'>
      <h1 className='text-4xl font-bold mb-4'>Vercel Pricing Calculator</h1>
      {/* last updated */}
      <p className='text-gray-500 mb-6 font-mono'>Last updated: 5/25/2025</p>
      <PricingComponent />
    </div>
  )
}
