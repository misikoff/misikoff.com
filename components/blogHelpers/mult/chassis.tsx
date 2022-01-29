import React, { useEffect, useState } from 'react'
import { CoinTossGame } from './coinToss'
import LikelihoodChart from './likelihoodChart'
import PayoffChart from './payoffChart'
import ResultChart from './resultChart'
import PlayCard from './playCard'

export default function Chassis({
  children,
}: {
  children: JSX.Element | string
}) {
  const [game, _] = useState(new CoinTossGame())
  const [playedAlready, setPlayedAlready] = useState(game.playedAlready)
  const [values, setValues] = useState([game.startVal])

  useEffect(() => {
    game.on('event', (values: number[]) => {
      console.log('should set values')
      setValues([...values])
    })

    game.on('played', () => {
      setPlayedAlready(true)
    })
  }, [game])

  const curVal = () => {
    if (values.length) {
      return values[values.length - 1]
    } else {
      return 0
    }
  }

  return (
    <div>
      <PlayCard showPass={true} game={game} />

      <ResultChart values={values} />

      {playedAlready && (
        <div className='result mt-6 text-gray-500'>
          The payoff was <strong>${curVal().toFixed(2)}</strong>. <br />
          <strong>{game.headsCount()}</strong>{' '}
          {game.headsCount() === 1 ? 'toss was' : 'tosses were'} heads and{' '}
          <strong>{10 - game.headsCount()}</strong>
          {10 - game.headsCount() === 1 ? ' was' : ' were'} tails. The order of
          the tosses does not matter. Hit the <strong> shuffle </strong> button
          above see to how changing the order changes the path, but not the end
          result. This result occurs about
          <strong>
            {(100 * game.probabilities[game.headsCount()]).toFixed(0)}%
          </strong>
          of the time.
          <span>
            This is a {curVal() > game.startVal ? 'profit' : 'loss'} of{' '}
            <strong>
              ${Math.abs(Number((curVal() - game.startVal).toFixed(2)))}
            </strong>
            .
          </span>
          <div className='mt-6'>
            <LikelihoodChart probabilities={game.probabilities} />
            <div>
              The graph above shows that the number of heads a player gets is
              symmetric, i.e., not skewed toward the left or right, and
              approximately normally distributed. <strong>66%</strong> of
              players get between <strong>4</strong> and <strong>6</strong>{' '}
              heads.
            </div>

            <PayoffChart className='mt-4' results={game.results} />
            <div className='mt-6'>
              Importantly, the payoffs are <i>not</i> symmetricly distributed.
              They are highly skewed. More than half of players lose money, but
              a few make a huge profit. Your mathematician friend was right, the
              average return is about <strong>$162</strong>, but{' '}
              <strong>62%</strong> of players walk away from the game with less
              than <strong>$60</strong>.
            </div>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}
