'use client'
import { useState } from 'react'

const plans = ['hobby', 'pro', 'enterprise'] as const
type Plan = (typeof plans)[number]

type PriceObject = {
  label: string
  tiers: {
    [key in Plan]: {
      included: number
      marginalCost: number
    }
  }
}

const pricingConfig: { [key: string]: PriceObject } = {
  edgeRequests: {
    label: 'Edge Requests (per million)',
    tiers: {
      hobby: { included: 1, marginalCost: 2 },
      pro: { included: 10, marginalCost: 2 },
      enterprise: { included: 50, marginalCost: 1.5 },
    },
  },
  bandwidth: {
    label: 'Bandwidth (GB)',
    tiers: {
      hobby: { included: 100, marginalCost: 0.15 },
      pro: { included: 1000, marginalCost: 0.12 },
      enterprise: { included: 5000, marginalCost: 0.1 },
    },
  },
  functionInvocations: {
    label: 'Serverless Function Invocations (per 100k)',
    tiers: {
      hobby: { included: 1, marginalCost: 0.25 },
      pro: { included: 10, marginalCost: 0.2 },
      enterprise: { included: 100, marginalCost: 0.15 },
    },
  },
  imageOptimizations: {
    label: 'Image Optimizations (per 1k)',
    tiers: {
      hobby: { included: 5, marginalCost: 0.0812 },
      pro: { included: 10, marginalCost: 0.05 },
      enterprise: { included: 50, marginalCost: 0.03 },
    },
  },
  analyticsEvents: {
    label: 'Web Analytics Events (per 100k)',
    tiers: {
      hobby: { included: 0.5, marginalCost: 3 },
      pro: { included: 1, marginalCost: 3 },
      enterprise: { included: 10, marginalCost: 2 },
    },
  },
  observabilityEvents: {
    label: 'Observability Events (per 1M)',
    tiers: {
      hobby: { included: 1, marginalCost: 1.2 },
      pro: { included: 10, marginalCost: 1 },
      enterprise: { included: 100, marginalCost: 0.8 },
    },
  },
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('hobby')
  const [usage, setUsage] = useState<Record<string, number>>(() =>
    Object.keys(pricingConfig).reduce(
      (acc, key) => {
        acc[key] = 0
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const totalCost = Object.entries(pricingConfig).reduce(
    (total, [featureKey, config]) => {
      const used = usage[featureKey] || 0
      const tier = config.tiers[selectedPlan]
      const overage = Math.max(0, used - tier.included)
      return total + overage * tier.marginalCost
    },
    0,
  )

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-6'>
      <h1 className='text-4xl font-bold mb-4'>Pricing Calculator</h1>
      <div className='flex gap-4 mb-8'>
        {plans.map((plan) => (
          <button
            key={plan}
            onClick={() => setSelectedPlan(plan)}
            className={`px-4 py-2 rounded ${
              selectedPlan === plan ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </button>
        ))}
      </div>
      <div className='w-full max-w-lg space-y-6'>
        {Object.entries(pricingConfig).map(([key, config]) => (
          <div key={key}>
            <label className='block mb-2 text-lg font-medium'>
              {config.label}
            </label>
            <input
              type='range'
              min={0}
              max={config.tiers[selectedPlan].included * 2}
              value={usage[key]}
              onChange={(e) =>
                setUsage({ ...usage, [key]: Number(e.target.value) })
              }
              className='w-full'
            />
            <div className='text-sm text-gray-600 mt-1'>
              Usage: {usage[key]}
            </div>
          </div>
        ))}
      </div>
      <div className='mt-10 text-2xl font-semibold'>
        Estimated Cost: ${totalCost.toFixed(2)}
      </div>
    </div>
  )
}
