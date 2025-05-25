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
  const [selectedPlan, setSelectedPlan] = useState<Plan>('pro')
  const [usage, setUsage] = useState<Record<string, number>>(() =>
    Object.keys(pricingConfig).reduce(
      (acc, key) => {
        acc[key] = 0
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const [activeFeatures, setActiveFeatures] = useState<Record<string, boolean>>(
    () =>
      Object.keys(pricingConfig).reduce(
        (acc, key) => {
          acc[key] = false
          return acc
        },
        {} as Record<string, boolean>,
      ),
  )

  const categories = {
    Infrastructure: ['edgeRequests', 'bandwidth', 'functionInvocations'],
    Media: ['imageOptimizations'],
    Analytics: ['analyticsEvents', 'observabilityEvents'],
  }

  const categoryNames = Object.keys(categories)
  const [activeCategory, setActiveCategory] = useState<string>('Infrastructure')

  return (
    <div className='flex flex-col items-center w-full h-full p-6'>
      <h1 className='text-4xl font-bold mb-4'>Pricing Calculator</h1>
      {/* <div className='flex gap-4 mb-8'>
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
      </div> */}

      <div className='flex w-full max-w-5xl'>
        {/* Sidebar with categories */}
        <div className='w-1/4 pr-6'>
          {categoryNames.map((category) => {
            const subtotal = categories[category].reduce((sum, key) => {
              const used = activeFeatures[key] ? usage[key] || 0 : 0
              const tier = pricingConfig[key].tiers[selectedPlan]
              const overage = Math.max(0, used - tier.included)
              return sum + overage * tier.marginalCost
            }, 0)

            return (
              <div key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-2 mb-2 rounded flex justify-between ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  <span>{category}</span>
                  <span className='text-sm'>${subtotal.toFixed(2)}</span>
                </button>
              </div>
            )
          })}
        </div>

        {/* Active category details */}
        <div className='w-3/4 space-y-6'>
          {categories[activeCategory].map((key) => {
            const config = pricingConfig[key]
            return (
              <div key={key} className='border rounded p-4'>
                <label className='flex items-center space-x-4'>
                  <input
                    type='checkbox'
                    checked={activeFeatures[key]}
                    onChange={(e) =>
                      setActiveFeatures({
                        ...activeFeatures,
                        [key]: e.target.checked,
                      })
                    }
                  />
                  <span className='text-lg font-medium'>{config.label}</span>
                </label>
                <div className='text-sm text-gray-500 mt-1 ml-7'>
                  Included: {config.tiers[selectedPlan].included}, Overages @ $
                  {config.tiers[selectedPlan].marginalCost.toFixed(4)}
                </div>
                {activeFeatures[key] && (
                  <div className='mt-2 ml-7'>
                    <input
                      type='range'
                      min={0}
                      max={config.tiers[selectedPlan].included * 2}
                      step={1}
                      list={`ticks-${key}`}
                      value={usage[key]}
                      onChange={(e) =>
                        setUsage({ ...usage, [key]: Number(e.target.value) })
                      }
                      className='w-full'
                    />
                    <datalist id={`ticks-${key}`}>
                      {[...Array(5)].map((_, i) => {
                        const max = config.tiers[selectedPlan].included * 2
                        const val = Math.round((max * i) / 4)
                        const label =
                          val >= 1_000_000
                            ? `${val / 1_000_000}M`
                            : val >= 1_000
                              ? `${val / 1_000}k`
                              : `${val}`
                        return (
                          <option
                            key={i + '-' + key}
                            value={val}
                            label={label}
                          />
                        )
                      })}
                    </datalist>
                    <div className='text-sm text-gray-600 mt-1'>
                      Usage: {usage[key]}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-10 text-2xl font-semibold'>
        Estimated Cost: $
        {Object.entries(pricingConfig)
          .reduce((total, [key, config]) => {
            const used = activeFeatures[key] ? usage[key] || 0 : 0
            if (!used) {
              return total
            }
            const tier = config.tiers[selectedPlan]
            const overage = Math.max(0, used - tier.included)
            return total + overage * tier.marginalCost
          }, 0)
          .toFixed(2)}
      </div>
    </div>
  )
}
