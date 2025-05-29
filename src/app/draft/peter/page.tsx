'use client'

import React, { useEffect, useState } from 'react'

// import { clsx } from 'clsx'

// import LikelihoodChart from '@/content/articles/risk/multiplicativePayoffs/helpers/likelihoodChart'
// import PayoffChart from '@/content/articles/risk/multiplicativePayoffs/helpers/payoffChart'
import PlayCard from '..//helpers/playCard'
import AnimatedNumber from '../components/animatedNumber'
import { CoinTossGame } from '../helpers/peterCoinToss'
import ResultChart from '../helpers/resultChart'

export default function MerchantSandbox() {
  const [game] = useState(new CoinTossGame())
  const [ready, setReady] = useState(true)

  const [values, setValues] = useState([game.startVal])

  const [startVal, setStartVal] = useState(game.startVal)
  const [numShipments, setNumShipments] = useState(game.numShipments)
  const [insured, setInsured] = useState(game.insured)
  const [riskOfLoss, setRiskOfLoss] = useState(game.riskOfLoss)

  const [profitPerShipment, setProfitPerShipment] = useState(
    game.profitPerShipment,
  )
  const [insuranceCost, setInsuranceCost] = useState(game.insuranceCost)

  // const [probabilities, setProbabilities] = useState(game.probabilities)
  // const [results, setResults] = useState(game.results)

  function handleStartChanged(event: any) {
    setStartVal(game.setStartVal(event.target.value))
  }

  function handleNumShipmentsChanged(event: any) {
    setNumShipments(game.setNumShipments(event.target.value))
  }

  function handleProfitPerShipmentChanged(event: any) {
    setProfitPerShipment(game.setProfitPerShipment(event.target.value))
  }

  function handleInsuranceCostChanged(event: any) {
    setInsuranceCost(game.setInsuranceCost(event.target.value))
  }

  function handleInsuredChanged(event: any) {
    setInsured(game.setInsured(event.target.value) as any)
  }

  function handleRiskOfLossChanged(event: any) {
    setRiskOfLoss(game.setRiskOfLoss(event.target.value))
  }

  function getTossDescriptor() {
    if (numShipments == 1) {
      return 'coin toss'
    } else {
      return 'consecutive coin tosses'
    }
  }

  useEffect(() => {
    game.on('event', (values: number[]) => {
      setValues([...values])
    })

    game.on('ready', (newVal: boolean) => {
      setReady(newVal)
    })
    game.on(
      'updated-norm',
      ({
        probabilities,
      }: // results,
      {
        probabilities: number[]
        // results: number[]
      }) => {
        // setProbabilities([...probabilities])
        // setResults([...results])
      },
    )
  }, [game])

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-x-4 md:flex-row'>
        <div className='flex flex-col shadow-md xl:max-w-lg'>
          <div className='mb-4 p-4'>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Premise
            </h2>
            <div className='prose prose-lg mx-auto mt-6 text-gray-500'>
              <p>
                A merchant ships valuable cargo to a distant shore for a nice
                profit. Each shipment is at risk of being lost to pirates or the
                sea. The merchant can buy insurance to cover the cost of a
                shipment, should it fail to reach it{"'"}s destination. Prior to
                each shipment, the merchant chooses how much to invest in cargo
                for the next shipment and whether to purchase insurance. The
                merchant can only make a certain number of shipments before
                retiring.
              </p>
              {/* <p>
                a Saint Petersburg merchant who has purchased commodities in
                Amsterdam and wishes to ship them home to Saint Petersburg to
                sell for a tidy profit. But he faces substantial financial risk
                in transporting those commodities some 1,100 nautical miles
                across the Baltic Sea to Saint Petersburg. It sounds like a
                benign enough trip. But this was the golden age of piracy, after
                all; the dreaded Dane, “Jack of the Baltic,” was actively
                looting cargo ships in and out of Saint Petersburg in his
                ominously named pirate ship, the Sudden Death. (He was that
                rare, real pirate cliché who drowned all his victims by making
                them walk the plank before scuttling their seized ships.) Given
                those risks, how can our merchant cost-effectively mitigate
                them? Let{"'"}s say the net value of the Petersburg merchant
                {"'"}s commodities (net of shipping costs, etc.) that he intends
                to sell is 10,000 rubles; in addition, he has savings of 3,000
                rubles. (It{"'"}s a levered business.) So his total wealth, upon
                making his sale in Saint Petersburg, is 13,000 rubles.
                Typically, for every 100 ships that sail from Amsterdam to Saint
                Petersburg, 5 end up seized by pirates or the sea—or a 5%
                probability of a 10,000-ruble total shipment loss to the
                merchant. Perhaps some risk mitigation could help, like
                insurance. Let{"'"}s say the best price the merchant can find
                for insuring his entire precious 10,000-ruble cargo is 800
                rubles—which he considers “outrageously high! Ochen{"'"}
                dorogo!”—and not at all cost-effective. He would appear to be
                right: Based on history, the actuarial expected value of such a
                contract is (-800 x 95/100) + (9,200 x 5/100) = -300. This would
                really eat into his expected return from each 10,000-ruble
                cargo. Without mitigating his risks, this shipment would perhaps
                be riskier than he could bear. But the insurance industry was
                seemingly a loser{"'"}s game, merely preying on its customers
                {"'"} fears; as the calculation indicates, the premium being
                charged was higher than the actuarially “fair” amount. The
                Petersburg merchant has quite the dilemma of risk. Spitznagel,
                Mark. Safe Haven (pp. 43-44). Wiley. Kindle Edition.
              </p> */}
            </div>
          </div>
          <div className='mb-4 p-4'>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Parameters
            </h2>
            <div className='mt-3 flex'>
              <div className='flex flex-col justify-between'>
                <div>
                  <label
                    htmlFor='bet'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Starting Capital
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <span className='text-gray-500 sm:text-sm'> $ </span>
                    </div>
                    <input
                      id='startVal'
                      type='number'
                      name='startVal'
                      disabled={!ready}
                      className='block w-full rounded-md border-gray-300 pl-8 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='100'
                      value={startVal}
                      onChange={handleStartChanged}
                    />
                  </div>
                </div>
              </div>
              <div className='ml-4 flex flex-col justify-between'>
                <div>
                  <label
                    htmlFor='riskOfLoss'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Insurance Cost (as % of cargo)
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='insuranceCost'
                      disabled={!ready}
                      type='number'
                      name='insuranceCost'
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={insuranceCost}
                      onChange={handleInsuranceCostChanged}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='profitPerShipment'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Profit Per Shipment (as % of cargo)
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='profitPerShipment'
                      disabled={!ready}
                      type='number'
                      name='profitPerShipment'
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={profitPerShipment}
                      onChange={handleProfitPerShipmentChanged}
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <label
                    htmlFor='riskOfLoss'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Risk of Loss
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='riskOfLoss'
                      disabled={!ready}
                      type='number'
                      name='riskOfLoss'
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={riskOfLoss}
                      onChange={handleRiskOfLossChanged}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='prose'>
              <ul>
                <li>
                  The merchant begins with{' '}
                  <span className='font-mono font-bold text-green-500'>
                    ${startVal}
                  </span>{' '}
                  in cash.
                </li>
                <li>
                  Each successful shipment generates{' '}
                  <span className='font-mono font-bold text-green-500'>
                    {profitPerShipment}%
                  </span>{' '}
                  profit on the value of the cargo.
                </li>
                <li>
                  Each shipment has a{' '}
                  <span className='font-mono font-bold text-red-500'>
                    {riskOfLoss}%
                  </span>{' '}
                  chance of being lost.
                </li>
                <li>
                  Insuring a shipment{"'"}s cargo costs{' '}
                  <span className='font-mono font-bold text-yellow-500'>
                    {insuranceCost}%
                  </span>{' '}
                  of the cargo{"'"}s value.
                </li>
                <li>
                  The merchant will make up to{' '}
                  <span className='font-mono font-bold text-sky-500'>
                    {numShipments}
                  </span>{' '}
                  shipments before retiring.
                </li>
              </ul>
            </div>

            <div className='mb-4 p-4'>
              <h2 className='text-lg font-medium leading-6 text-gray-900'>
                Choices
              </h2>

              <div className='mt-3'>
                <div className='mt-3'>
                  <label
                    htmlFor='riskOfLoss'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Allocation
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='Allocation'
                      disabled={!ready}
                      type='number'
                      name='Allocation'
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={riskOfLoss}
                      onChange={handleRiskOfLossChanged}
                    />
                  </div>
                </div>

                <label
                  htmlFor='shipments'
                  className='block text-sm font-medium text-gray-700'
                >
                  Shipments
                </label>
                <div className='mt-1 w-32'>
                  <input
                    id='shipments'
                    disabled={!ready}
                    type='number'
                    name='shipments'
                    className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                    placeholder='10'
                    value={numShipments}
                    onChange={handleNumShipmentsChanged}
                  />
                </div>
              </div>

              <div className='mt-3'>
                <label
                  htmlFor='insured'
                  className='block text-sm font-medium text-gray-700'
                >
                  Buy Insurance
                </label>
                <input
                  id='insured'
                  disabled={!ready}
                  type='checkbox'
                  name='insured'
                  className='mt-1 block rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                  // placeholder='50'
                  value={insured as any}
                  onChange={handleInsuredChanged}
                />
              </div>
            </div>
          </div>

          <div className='mb-4 p-4'>
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Properties
            </h2>
            <div className='mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
              <dl className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Expected Value of Insured Shipment
                </dt>
                <dd className='mt-1 flex items-baseline justify-between overflow-ellipsis'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                    <AnimatedNumber
                      value={game.expectedValueOfInsuredShipment()}
                      className='w-48 text-2xl font-semibold text-gray-900'
                    />
                  </div>
                </dd>
              </dl>

              <div>
                <dl className='px-4 py-5 sm:p-6'>
                  <dt className='text-base font-normal text-gray-900'>
                    Expected Value of Uninsured Shipment
                  </dt>
                  <dd className='mt-1 flex items-baseline justify-between'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.expectedValueOfUninsuredShipment()}
                        className='w-48 text-2xl font-semibold text-gray-900'
                      />
                    </div>
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='px-4 py-5 sm:p-6'>
                  <dt className='text-base font-normal text-gray-900'>
                    Expected Value of Insurance
                  </dt>
                  <dd className='mt-1 flex items-baseline justify-between'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.expectedValueOfInsurance()}
                        className='w-48 text-2xl font-semibold text-gray-900'
                      />
                    </div>
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='px-4 py-5 sm:p-6'>
                  <dt className='text-base font-normal text-gray-900'>
                    uninsured geometric mean
                  </dt>
                  <dd className='mt-1 flex items-baseline justify-between'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.uninsuredAverageRateOfCompounding()}
                        className='w-48 text-2xl font-semibold text-gray-900'
                      />
                    </div>
                  </dd>
                </dl>
              </div>
              <div>
                <dl className='px-4 py-5 sm:p-6'>
                  <dt className='text-base font-normal text-gray-900'>
                    insured geometric mean
                  </dt>
                  <dd className='mt-1 flex items-baseline justify-between'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.insuredAverageRateOfCompounding()}
                        className='w-48 text-2xl font-semibold text-gray-900'
                      />
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col'>
          {/* <PlayCard game={game as any} /> */}
          <div className='relative mt-4 flex w-full flex-shrink flex-grow'>
            <ResultChart className='flex-shrink flex-grow' values={values} />
          </div>
        </div>
      </div>

      {/* <div className='flex w-full flex-col md:flex-row'>
        <LikelihoodChart className='w-full' probabilities={probabilities} />

        <PayoffChart className='w-full' results={results} />
      </div> */}
    </div>
  )
}
