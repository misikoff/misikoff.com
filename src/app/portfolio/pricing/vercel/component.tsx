'use client'
import { useState } from 'react'

// metadata for SEO
export const metadata = {
  title: 'Vercel Usage Pricing Calculator',
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

function handlePlural(unit: string, value: number): string {
  if (unit === 'million') {
    return value === 1 ? 'million' : 'millions'
  } else if (unit === 'GB') {
    return value === 1 ? 'GB' : 'GBs'
  } else if (unit === 'seat') {
    return value === 1 ? 'seat' : 'seats'
  } else if (unit === 'build machine (4 CPUs)') {
    return value === 1 ? 'build machine (4 CPUs)' : 'build machines (4 CPUs)'
  } else if (unit === 'minute') {
    return value === 1 ? 'minute' : 'minutes'
  } else if (unit === 'team') {
    return value === 1 ? 'team' : 'teams'
  } else if (unit === 'GB-hour') {
    return value === 1 ? 'GB-hour' : 'GB-hours'
  } else {
    return unit
  }
}

function formatMarginalNumber(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(0)}M`
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(0)}k`
  } else {
    return value.toString()
  }
}

function calculateCost(
  usage: number,
  included: number,
  marginalCost: number,
  marginalUnit: number = 1,
): number {
  const overage = Math.max(0, usage - included)
  const overageUnits = Math.ceil(overage / marginalUnit)

  console.log({
    // key,
    usage,
    overage,
    marginalUnit,
    overageUnits,
  })

  return overageUnits * marginalCost
}

function formatMarginalCost(cost: number): string {
  // if whole number, return as is, otherwise format to 2 decimal places
  return cost % 1 === 0 ? cost.toString() : cost.toFixed(2)
}

function formatNormalNumber(value: number): string {
  //  insert commas for thousands
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const plans = ['hobby', 'pro', 'enterprise'] as const
type Plan = (typeof plans)[number]

type PriceObject = {
  label: string
  units: string
  isAddOn?: boolean
  basePrice?: number
  tiers: {
    [key in Plan]?: {
      included: number
      marginalCost: number
      marginalUnit?: number
      min?: number
    }
  }
}

const pricingConfig: { [key: string]: PriceObject } = {
  edgeRequests: {
    label: 'Edge Requests',
    units: 'million',
    tiers: {
      // hobby: { included: 1, marginalCost: 2 },
      pro: { included: 10000000, marginalCost: 2, marginalUnit: 1000000 },
      // enterprise: { included: 50, marginalCost: 1.5 },
    },
  },
  bandwidth: {
    label: 'Fast Data Transfer',
    units: 'GB',
    tiers: {
      // hobby: { included: 100, marginalCost: 0.15 },
      pro: { included: 1000, marginalCost: 0.15, marginalUnit: 1 },
      // enterprise: { included: 5000, marginalCost: 0.1 },
    },
  },

  rateLimiting: {
    label: 'Rate Limiting',
    units: 'million',
    tiers: {
      pro: { included: 0, marginalCost: 0.5, marginalUnit: 1000000 },
    },
  },

  isrReads: {
    label: 'ISR Reads',
    units: 'million',
    tiers: {
      pro: { included: 10000000, marginalCost: 0.4, marginalUnit: 1000000 },
    },
  },
  isrWrites: {
    label: 'ISR Writes',
    units: 'million',
    tiers: {
      pro: { included: 2000000, marginalCost: 4, marginalUnit: 1000000 },
    },
  },
  storageSize: {
    label: 'Blob Storage Size',
    units: 'GB',
    tiers: {
      pro: { included: 5, marginalCost: 0.023, marginalUnit: 1 },
    },
  },
  simpleOperations: {
    label: 'Blob Simple Operations',
    units: 'million',
    tiers: {
      pro: { included: 100000, marginalCost: 0.4, marginalUnit: 1000000 },
    },
  },
  advancedOperations: {
    label: 'Blob Advanced Operations',
    units: 'million',
    tiers: {
      pro: { included: 10000, marginalCost: 5, marginalUnit: 1000000 },
    },
  },
  blobDataTransfer: {
    label: 'Blob Data Transfer',
    units: 'GB',
    tiers: {
      pro: { included: 100, marginalCost: 0.05, marginalUnit: 1 },
    },
  },
  imageTransformations: {
    label: 'Image Transformations',
    units: 'million',
    tiers: {
      pro: { included: 10000, marginalCost: 0.05, marginalUnit: 1000000 },
    },
  },
  imageCacheReads: {
    label: 'Image Cache Reads',
    units: 'million',
    tiers: {
      pro: { included: 600000, marginalCost: 0.4, marginalUnit: 1000000 },
    },
  },
  imageCacheWrites: {
    label: 'Image Cache Writes',
    units: 'million',
    tiers: {
      pro: { included: 200000, marginalCost: 4, marginalUnit: 1000000 },
    },
  },
  edgeConfigReads: {
    label: 'Edge Config Reads',
    units: 'million',
    tiers: {
      pro: { included: 1000000, marginalCost: 3, marginalUnit: 1000000 },
    },
  },
  edgeConfigWrites: {
    label: 'Edge Config Writes',
    units: '',
    tiers: {
      pro: { included: 1000000, marginalCost: 5, marginalUnit: 500 },
    },
  },

  functionInvocations: {
    label: 'Function Invocations',
    units: 'million',
    tiers: {
      pro: { included: 1000000, marginalCost: 0.6, marginalUnit: 1000000 },
    },
  },
  functionDuration: {
    label: 'Function Duration',
    units: 'GB-hour',
    tiers: {
      pro: { included: 10000, marginalCost: 0.18, marginalUnit: 1 },
    },
  },
  fastOriginTransfer: {
    label: 'Fast Origin Transfer',
    units: 'GB',
    tiers: {
      pro: { included: 100, marginalCost: 0.06, marginalUnit: 1 },
    },
  },
  edgeFunctionExecutions: {
    label: 'Edge Function Executions',
    units: 'million',
    tiers: {
      pro: { included: 1000000, marginalCost: 2, marginalUnit: 1000000 },
    },
  },

  concurrentBuilds: {
    label: 'Concurrent Builds',
    units: 'build machine (4 CPUs)',
    tiers: {
      pro: { min: 1, included: 1, marginalCost: 50, marginalUnit: 1 },
    },
  },

  onDemandConcurrentBuilds: {
    label: 'On-Demand Concurrent Builds',
    units: 'minute',
    tiers: {
      pro: { included: 0, marginalCost: 0.014, marginalUnit: 1 },
    },
  },

  enhancedBuilds: {
    label: 'Enhanced Builds',
    units: 'minute',
    tiers: {
      pro: { included: 0, marginalCost: 0.028, marginalUnit: 1 },
    },
  },
  teamSeats: {
    label: 'Team Seats',
    units: 'seat',
    tiers: {
      pro: { min: 1, included: 1, marginalCost: 20, marginalUnit: 1 },
    },
  },

  observabilityPlus: {
    label: 'Observability Plus',
    units: 'million',
    isAddOn: true,
    basePrice: 10,
    tiers: {
      pro: { included: 1000000, marginalCost: 1.2, marginalUnit: 1000000 },
    },
  },
  speedInsights: {
    label: 'Speed Insights',
    units: '10k',
    // todo: $10 per project
    tiers: {
      pro: { included: 0, marginalCost: 0.65, marginalUnit: 10000 },
    },
  },
  webAnalytics: {
    label: 'Web Analytics',
    units: '100k',
    tiers: {
      pro: { included: 100000, marginalCost: 3, marginalUnit: 100000 },
    },
  },
  webAnalyticsPlus: {
    label: 'Web Analytics Plus',
    units: 'team',
    tiers: {
      pro: { included: 0, marginalCost: 10, marginalUnit: 1 },
    },
  },
  logDrains: {
    label: 'Log Drains',
    units: 'GB',
    tiers: {
      pro: { included: 0, marginalCost: 0.5, marginalUnit: 1 },
    },
  },
}

export default function PricingComponent() {
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
    'Vercel Delivery Network': [
      'edgeRequests',
      'bandwidth',
      'functionInvocations',
    ],
    'Vercel Firewall': ['rateLimiting'],
    'Content, Caching & Optimization': [
      'isrReads',
      'isrWrites',
      'storageSize',
      'simpleOperations',
      'advancedOperations',
      'blobDataTransfer',
      'imageTransformations',
      'imageCacheReads',
      'imageCacheWrites',
      'edgeConfigReads',
      'edgeConfigWrites',
    ],
    'Vercel Functions': [
      'functionDuration',
      'fastOriginTransfer',
      'edgeFunctionExecutions',
    ],
    'Build & Deploy': [
      'concurrentBuilds',
      'onDemandConcurrentBuilds',
      'enhancedBuilds',
      'teamSeats',
    ],
    Observability: [
      'observabilityPlus',
      'speedInsights',
      'webAnalytics',
      'webAnalyticsPlus',
      'logDrains',
    ],
  }

  const categoryNames = Object.keys(categories)
  const [activeCategory, setActiveCategory] = useState<string>(
    'Vercel Delivery Network',
  )

  return (
    <>
      <div className='flex md:flex-row flex-col w-full max-w-5xl gap-4'>
        {/* Sidebar with categories */}
        <div className='md:min-w-1/4 w-full md:max-w-1/3 md:pr-6 gap-2 flex flex-row justify-center md:justify-start md:flex-col flex-wrap'>
          {categoryNames.map((category) => {
            const subtotal = (categories as any)[category].reduce(
              (sum: number, key: string) => {
                const used = activeFeatures[key] ? usage[key] || 0 : 0
                let addOnCost = 0

                if (activeFeatures[key] && pricingConfig[key].isAddOn) {
                  addOnCost = pricingConfig[key].basePrice || 0
                }

                return (
                  sum +
                  addOnCost +
                  calculateCost(
                    used,
                    pricingConfig[key].tiers[selectedPlan]?.included as any,
                    pricingConfig[key].tiers[selectedPlan]?.marginalCost as any,
                    pricingConfig[key].tiers[selectedPlan]?.marginalUnit,
                  )
                )
              },
              0,
            )

            return (
              <div key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-2 mb-2 items-baseline rounded-lg flex md:flex-row flex-col justify-between ${
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
        <div className='md:max-w-3/4 w-full space-y-6'>
          {(categories as any)[activeCategory].map((key: string) => {
            const config = pricingConfig[key]
            return (
              <div key={key} className='border rounded-lg p-4'>
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
                  <span className='text-lg font-medium'>
                    {config.label}{' '}
                    {config.units ? '(per ' + config.units + ')' : ''}
                  </span>
                  {config.isAddOn && (
                    <span className='text-sm text-gray-500'>
                      + ${formatMarginalCost(config.basePrice || 0)} base price
                    </span>
                  )}
                </label>
                <div className='text-sm text-gray-500 mt-1 ml-7'>
                  Included:{' '}
                  {formatMarginalNumber(
                    config.tiers[selectedPlan]?.included as any,
                  )}
                  , Overages @ $
                  {formatMarginalCost(
                    config.tiers[selectedPlan]?.marginalCost as any,
                  )}
                  {config.tiers[selectedPlan]?.marginalUnit
                    ? config.tiers[selectedPlan].marginalUnit !== 1
                      ? ` per ${formatMarginalNumber(config.tiers[selectedPlan].marginalUnit)}`
                      : ' each'
                    : ''}
                </div>
                {activeFeatures[key] && (
                  <div className='mt-2 ml-7'>
                    <input
                      type='range'
                      min={0}
                      max={
                        Math.max(
                          config.tiers[selectedPlan]?.marginalUnit as any,
                          config.tiers[selectedPlan]?.included as any,
                        ) * 10
                      }
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
                        const max =
                          (Math.max(
                            config.tiers[selectedPlan]?.included as any,
                            config.tiers[selectedPlan]?.marginalUnit as any,
                          ) as any) * 10
                        const val = (max * i) / 4
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
                    <div className='flex justify-between text-center text-xs text-gray-500 mt-1 w-full'>
                      {[...Array(5)].map((_, i) => {
                        const max =
                          (Math.max(
                            config.tiers[selectedPlan]?.included as any,
                            config.tiers[selectedPlan]?.marginalUnit as any,
                          ) as any) * 10
                        const val = (max * i) / 4
                        const label =
                          val >= 1_000_000
                            ? `${val / 1_000_000}M`
                            : val >= 1_000
                              ? `${val / 1_000}k`
                              : `${val}`
                        if (val !== Math.round(val)) {
                          return (
                            <span
                              key={i + '-label-' + key}
                              className='hidden'
                            />
                          )
                        }
                        return (
                          <span key={i + '-label-' + key} className='w-4'>
                            {label}
                          </span>
                        )
                      })}
                    </div>
                    <div className='text-sm text-gray-600 mt-1'>
                      Usage: {formatNormalNumber(usage[key])}
                      {config.units !== 'million' &&
                      config.units !== '10k' &&
                      config.units !== '100k'
                        ? ' ' + handlePlural(config.units, usage[key])
                        : ''}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary */}
      {/* add a summary of all used features, the amount used and the cost */}
      <div className='mt-10 w-full max-w-3xl'>
        <h2 className='text-2xl font-semibold mb-4'>Summary</h2>
        <table className='w-full bg-white shadow rounded-lg overflow-hidden'>
          <thead>
            <tr>
              <th className='p-2 text-left'>Feature</th>
              <th className='p-2 text-right'>Usage</th>
              <th className='p-2 text-right'>Cost</th>
            </tr>
          </thead>
          <tbody>
            {/* Add-on base price rows */}
            {Object.entries(pricingConfig).map(([key, config]) => {
              if (
                !activeFeatures[key] ||
                !config.isAddOn ||
                !config.basePrice
              ) {
                return null
              }
              return (
                <tr key={key + '-addon'} className='bg-blue-50'>
                  <td className='p-2'>{config.label} (Base Price)</td>
                  <td className='p-2 text-right'>—</td>
                  <td className='p-2 text-right'>
                    ${formatMarginalCost(config.basePrice)}
                  </td>
                </tr>
              )
            })}
            {/* Usage-based rows */}
            {Object.entries(pricingConfig).map(([key, config]) => {
              if (!activeFeatures[key]) {
                return null
              }
              const used = usage[key] || 0
              const cost = calculateCost(
                used,
                config.tiers[selectedPlan]?.included as any,
                config.tiers[selectedPlan]?.marginalCost as any,
                config.tiers[selectedPlan]?.marginalUnit as any,
              )
              // Don't show usage row if it's an add-on with only a base price and no usage cost
              if (config.isAddOn && config.basePrice && cost === 0) {
                return null
              }
              return (
                <tr key={key} className='hover:bg-gray-50 transition'>
                  <td className='p-2'>{config.label}</td>
                  <td className='p-2 text-right'>
                    {formatNormalNumber(used)}
                    {config.units !== 'million' &&
                    config.units !== '10k' &&
                    config.units !== '100k'
                      ? ' ' + handlePlural(config.units, used)
                      : ''}
                  </td>
                  <td className='p-2 text-right'>${cost.toFixed(2)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='my-10 text-2xl font-semibold'>
          Estimated Cost: <br />$
          {Object.entries(pricingConfig)
            .reduce((total, [key, config]) => {
              const used = activeFeatures[key] ? usage[key] || 0 : 0

              let addOnCost = 0

              if (activeFeatures[key] && pricingConfig[key].isAddOn) {
                addOnCost = pricingConfig[key].basePrice || 0
              }
              return (
                total +
                addOnCost +
                calculateCost(
                  used,
                  config.tiers[selectedPlan]?.included as any,
                  config.tiers[selectedPlan]?.marginalCost as any,
                  config.tiers[selectedPlan]?.marginalUnit as any,
                )
              )
            }, 0)
            .toFixed(2)}{' '}
          / month
        </div>
      </div>
    </>
  )
}
