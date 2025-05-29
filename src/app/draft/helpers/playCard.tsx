import { useEffect, useState } from 'react'

import { BanknotesIcon, ArrowUpIcon } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'

import { CoinTossGame } from './coinToss'
import AnimatedNumber from '../components/animatedNumber'

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  signDisplay: 'always',
})

export default function PlayCard({
  game,
  showPass = false,
}: {
  game: CoinTossGame
  showPass?: boolean
}) {
  const shuffleTosses = () => {
    game.shuffleTosses()
  }

  const begin = () => {
    game.begin()
  }

  const [curVal, setCurVal] = useState(game.startVal)
  const [values, setValues] = useState([game.startVal])
  const [playedAlready, setPlayedAlready] = useState(false)
  const [ready, setReady] = useState(true)
  const [pass, setPass] = useState(false)

  useEffect(() => {
    game.on('event', (values: number[]) => {
      setValues([...values])
      setCurVal(game.curVal())
    })

    game.on('played', () => {
      setPlayedAlready(true)
    })

    game.on('ready', (readyVal: boolean) => {
      setReady(readyVal)
    })

    game.on('pass', (passVal: boolean) => {
      setPass(passVal)
    })
  }, [game])

  const [change, setChange] = useState(0)

  useEffect(() => {
    const valsLength = values.length
    let newChange = 0
    if (valsLength > 1) {
      newChange = values[valsLength - 1] - values[valsLength - 2]
    }
    setChange(newChange)
  }, [values])

  return (
    <div className='flex flex-col rounded-lg bg-white shadow'>
      <div className='px-4 py-5 sm:p-6'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 rounded-md bg-blue-400 p-3'>
            <BanknotesIcon className='h-6 w-6 text-white' />
          </div>
          <dl className='ml-5 w-0 flex-1'>
            <dt className='truncate text-sm font-medium text-gray-500'>
              Current Value
            </dt>
            <dd className='md:flex md:items-baseline'>
              <AnimatedNumber
                value={curVal}
                className='w-48 text-2xl font-semibold text-gray-900'
              />

              {values.length > 1 && (
                <div className='flex items-baseline text-sm font-semibold text-green-600 md:ml-2'>
                  <ArrowUpIcon
                    className={clsx(
                      change > 0
                        ? 'rotate-0 text-green-500'
                        : 'rotate-180 text-red-500',
                      'h-5 w-5 flex-shrink-0 transform self-center transition-all duration-75',
                    )}
                  />
                  <span className='sr-only'>
                    {change > 0 ? 'Increased by' : 'Decreased by'}
                  </span>
                  {nfObject.format(change).replace('$', '')}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
      <div className='bg-gray-50 px-4 py-4 sm:px-6'>
        <div className='text-sm'>
          <button
            className=' mx-auto inline-flex cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-bold text-white transition-colors duration-300 hover:text-blue-300 disabled:cursor-not-allowed  disabled:text-gray-600'
            disabled={!ready}
            onClick={begin}
          >
            play
          </button>
          {playedAlready && (
            <button
              className='mx-auto ml-4 inline-flex cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-bold text-white transition-colors duration-300 hover:text-blue-300 disabled:cursor-not-allowed  disabled:text-gray-600'
              disabled={!ready}
              onClick={shuffleTosses}
            >
              shuffle
            </button>
          )}
          {((showPass && !playedAlready) || pass) && (
            <button
              className='mx-auto ml-4 inline-flex cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-bold text-white transition-colors duration-300 hover:text-blue-300 disabled:cursor-not-allowed  disabled:text-gray-600'
              disabled={!ready}
              onClick={() => game.begin(true)}
            >
              pass
            </button>
          )}
          {pass && (
            <span className='ml-2 mt-2 inline-block'>
              Ok. Let{"'"}s watch someone else play then.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
