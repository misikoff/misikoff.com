'use client'

import React, { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import AnimatedNumber from '../components/animatedNumber'
import { CoinTossGame } from '../helpers/coinToss'
import LikelihoodChart from '../helpers/likelihoodChart'
import PayoffChart from '../helpers/payoffChart'
import PlayCard from '../helpers/playCard'
import ResultChart from '../helpers/resultChart'

export default function Sandbox() {
  const [game] = useState(new CoinTossGame())
  const [ready, setReady] = useState(true)

  const [values, setValues] = useState([game.startVal])

  const [startVal, setStartVal] = useState(game.startVal)
  const [numTosses, setNumTosses] = useState(game.numTosses)
  const [headsFactor, setHeadsFactor] = useState(game.headsFactor)
  const [tailsFactor, setTailsFactor] = useState(game.tailsFactor)

  const [probabilities, setProbabilities] = useState(game.probabilities)
  const [results, setResults] = useState(game.results)

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

  function getTossDescriptor() {
    if (numTosses == 1) {
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
        results,
      }: {
        probabilities: number[]
        results: number[]
      }) => {
        setProbabilities([...probabilities])
        setResults([...results])
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
                It costs{' '}
                <strong>
                  $
                  {Number.isInteger(Number(startVal))
                    ? startVal
                    : Number(startVal).toFixed(2)}
                </strong>{' '}
                to play. Your bet is put into the pot. Your payoff is determined
                by <strong>{numTosses}</strong> {getTossDescriptor()}.
              </p>
              <ul>
                <li className={Number(headsFactor) === 0 ? 'invisible' : ''}>
                  After each heads the pot{' '}
                  <span
                    className={clsx(
                      headsFactor > 0 ? 'text-green-700' : 'text-red-600',
                      'font-extrabold transition-colors duration-200',
                    )}
                  >
                    {(headsFactor > 0 ? 'increases ' : 'decreases ') +
                      Math.abs(headsFactor)}
                    %
                  </span>
                  .
                </li>
                <li className={Number(tailsFactor) === 0 ? 'invisible' : ''}>
                  After each tails the pot{' '}
                  <span
                    className={clsx(
                      tailsFactor > 0 ? 'text-green-700' : 'text-red-600',
                      'font-extrabold transition-colors duration-200',
                    )}
                  >
                    {(tailsFactor > 0 ? 'increases ' : 'decreases ') +
                      Math.abs(tailsFactor)}
                    %
                  </span>
                  .
                </li>
              </ul>
              <p>At the end, whatever{"'"}s in the pot is yours.</p>
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
                      className='block w-full rounded-md border-gray-300 pl-8 focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
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
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
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
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
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
                      className='block w-full rounded-md border-gray-300 pl-8 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
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
            <h2 className='text-lg font-medium leading-6 text-gray-900'>
              Properties
            </h2>
            <div className='mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow'>
              <dl className='px-4 py-5 sm:p-6'>
                <dt className='text-base font-normal text-gray-900'>
                  Expected Value
                </dt>
                <dd className='mt-1 flex items-baseline justify-between overflow-ellipsis'>
                  <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                    <AnimatedNumber
                      value={game.curExpValue()}
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
                  <dd className='mt-1 flex items-baseline justify-between'>
                    <div className='flex items-baseline text-2xl font-semibold text-blue-600'>
                      <AnimatedNumber
                        value={game.curMedian()}
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
          <PlayCard game={game} />
          <div className='relative mt-4 flex w-full flex-shrink flex-grow'>
            <ResultChart className='flex-shrink flex-grow' values={values} />
          </div>
        </div>
      </div>

      <div className='flex w-full flex-col md:flex-row'>
        <LikelihoodChart className='w-full' probabilities={probabilities} />

        <PayoffChart className='w-full' results={results} />
      </div>
    </div>
  )
}
