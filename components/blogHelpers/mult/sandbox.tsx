import React, { useEffect, useState } from 'react'
import { CoinTossGame } from './coinToss'
import LikelihoodChart from './likelihoodChart'
import PayoffChart from './payoffChart'
import ResultChart from './resultChart'
import PlayCard from './playCard'
import AnimatedNumber from 'components/animatedNumber'

import utilityFunctions from 'lib/utilityFunctions'

export default function Sandbox() {
  const [game, _] = useState(new CoinTossGame())
  const [ready, setReady] = useState(true)

  const [values, setValues] = useState([game.startVal])

  const [startVal, setStartVal] = useState(game.startVal)
  const [numTosses, setNumTosses] = useState(game.numTosses)
  const [headsFactor, setHeadsFactor] = useState(game.headsFactor)
  const [tailsFactor, setTailsFactor] = useState(game.tailsFactor)

  function handleStartChanged(event: any) {
    setStartVal(game.setStartVal(event.target.value))
  }

  function handleNumTossesChanged(event: any) {
    setNumTosses(game.setNumTosses(event.target.value))
  }

  function handleHeadsFactorChanged(event: any) {
    setHeadsFactor(game.setHeadsFactor(event.target.value))
  }

  function handleTailsFactorChanged(event: any) {
    setTailsFactor(game.setTailsFactor(event.target.value))
  }

  useEffect(() => {
    game.on('event', (values: number[]) => {
      console.log('should set values')
      setValues([...values])
    })

    game.on('ready', (newVal: boolean) => {
      setReady(newVal)
    })
  }, [game])

  return (
    <div className='mt-5 mb-16 w-full'>
      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col shadow-md xl:max-w-lg'>
          <div className='mb-4 p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Premise
            </h3>
            <div className='prose prose-lg mx-auto mt-6 text-gray-500'>
              <p>
                It costs{' '}
                <strong>
                  $
                  {Number.isInteger(Number(startVal))
                    ? startVal
                    : Number(startVal).toFixed(2)}
                </strong>{' '}
                to play. Your bet is put into the pot. Your payoff is determined
                by <strong>{numTosses}</strong> consecutive coin tosses.
              </p>
              <ul>
                <li className={Number(headsFactor) === 0 ? 'invisible' : ''}>
                  After each heads the pot is{' '}
                  <span
                    className={utilityFunctions.classNames(
                      headsFactor > 0 ? 'text-green-700' : 'text-red-600',
                      'font-extrabold transition-colors duration-200'
                    )}
                  >
                    {(headsFactor > 0 ? 'increased ' : 'decreased ') +
                      Math.abs(headsFactor)}
                    %
                  </span>
                  .
                </li>
                <li className={Number(tailsFactor) === 0 ? 'invisible' : ''}>
                  After each tails the pot is
                  <span
                    className={utilityFunctions.classNames(
                      tailsFactor > 0 ? 'text-green-700' : 'text-red-600',
                      'font-extrabold transition-colors duration-200'
                    )}
                  >
                    {(tailsFactor > 0 ? 'increased ' : 'decreased ') +
                      Math.abs(tailsFactor)}
                    %
                  </span>
                  .
                </li>
              </ul>
              <p>
                After <strong>{numTosses}</strong> tosses, whatever{"'"}s in the
                pot is yours.
              </p>
            </div>
          </div>
          <div className='mb-4 p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Parameters
            </h3>
            <div className='mt-3 flex'>
              <div className='flex flex-col justify-between'>
                <div>
                  <label
                    htmlFor='bet'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Bet
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <span className='text-gray-500 sm:text-sm'> $ </span>
                    </div>
                    <input
                      id='bet'
                      type='number'
                      name='bet'
                      disabled={!ready}
                      className='block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='100'
                      value={startVal}
                      onChange={handleStartChanged}
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <label
                    htmlFor='tosses'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Tosses
                  </label>
                  <div className='mt-1 w-32'>
                    <input
                      id='tosses'
                      disabled={!ready}
                      type='number'
                      name='tosses'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='10'
                      value={numTosses}
                      onChange={handleNumTossesChanged}
                    />
                  </div>
                </div>
              </div>
              <div className='ml-4 flex flex-col justify-between'>
                <div>
                  <label
                    htmlFor='headsFactor'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Heads Factor
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='headsFactor'
                      disabled={!ready}
                      type='number'
                      name='headsFactor'
                      className='block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={headsFactor}
                      onChange={handleHeadsFactorChanged}
                    />
                  </div>
                </div>
                <div className='mt-3'>
                  <label
                    htmlFor='tailsFactor'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Tails Factor
                  </label>
                  <div className='relative mt-1 w-32 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400'>
                      %
                    </div>
                    <input
                      id='tailsFactor'
                      disabled={!ready}
                      type='number'
                      name='tailsFactor'
                      className='block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='50'
                      value={tailsFactor}
                      onChange={handleTailsFactorChanged}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-4 p-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Properties
            </h3>
            <div className='mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-2 md:divide-y-0 md:divide-x'>
              <dl className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Expected Value
                </dt>
                <dd className='mt-1 flex items-baseline justify-between overflow-ellipsis md:block lg:flex'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                    <AnimatedNumber
                      value={game.curExpValue()}
                      name='curExpValue'
                      className='w-48 text-2xl font-semibold text-gray-900'
                    />
                  </div>
                </dd>
              </dl>

              <div>
                <dl className='px-4 py-5 sm:p-6'>
                  <dt className='text-base font-normal text-gray-900'>
                    Median Value
                  </dt>
                  <dd className='mt-1 flex items-baseline justify-between md:block lg:flex'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.curMedian()}
                        name='curMedian'
                        className='w-48 text-2xl font-semibold text-gray-900'
                      />
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className='flex w-full flex-col md:mt-0 md:ml-4'>
          <PlayCard game={game} />
          <ResultChart className='mt-4 flex-grow' values={values} />
        </div>
      </div>

      <div className='flex w-full flex-col md:flex-row'>
        <LikelihoodChart
          className='w-full'
          probabilities={game.probabilities}
        />

        <PayoffChart className='w-full' results={game.results} />
      </div>
    </div>
  )
}
