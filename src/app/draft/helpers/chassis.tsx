'use client'

import React, { useEffect, useState } from 'react'

import { CoinTossGame } from './coinToss'
import LikelihoodChart from './likelihoodChart'
import PayoffChart from './payoffChart'
import PlayCard from './playCard'
import ResultChart from './resultChart'
import FractionHelper from '../components/fractionHelper'

export default function Chassis({ children }: { children?: React.ReactNode }) {
  const [game] = useState(new CoinTossGame())
  const [playedAlready, setPlayedAlready] = useState(game.playedAlready)
  const [values, setValues] = useState([game.startVal])

  useEffect(() => {
    game.on('event', (values: number[]) => {
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
    <div className='prose'>
      <PlayCard showPass={true} game={game} />

      <ResultChart values={values} />

      {playedAlready && (
        <div className='mt-6'>
          The payoff was <strong>${curVal().toFixed(2)}</strong>. <br />
          <strong>{game.headsCount()}</strong>{' '}
          {game.headsCount() === 1 ? 'toss was' : 'tosses were'} heads and{' '}
          <strong>{10 - game.headsCount()}</strong>
          {10 - game.headsCount() === 1 ? ' was' : ' were'} tails. Hit the{' '}
          <strong> shuffle </strong> button above see to how changing the order
          changes the path, but not the end result. This result occurs about{' '}
          <strong>
            {(100 * game.probabilities[game.headsCount()]).toFixed(0)}%
          </strong>{' '}
          of the time.{' '}
          <span>
            This is a {curVal() > game.startVal ? 'profit' : 'loss'} of{' '}
            <strong>
              ${Math.abs(Number((curVal() - game.startVal).toFixed(2)))}
            </strong>
            .
          </span>
          <div className='mt-6'>
            <LikelihoodChart probabilities={game.probabilities} />
            <div className='mt-6'>
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
              a few make a huge profit. Your calculations were right, the
              average return is about <strong>$162</strong>, but{' '}
              <strong>62%</strong> of players walk away from the game with less
              than <strong>$60</strong>.
            </div>
          </div>
          {children}
          <h1 className='mt-12'>Common Questions</h1>
          <h2>
            Why doesn{"'"}t the order of the results matter when calculating the
            outcome?
          </h2>
          Let{"'"}s think of this in terms of multiplication, rather than adding
          or subtracting a proportion of the pot after each toss.
          <br />
          <br />
          After each toss we multiply the pot by some number. In the scenario
          above, we multiply the pot by 1.5 (100% + 50% = 150% {'—>'} 1.5) after
          each heads, <br />
          and by 0.6 (100% - 40% = 60% {'—>'} 0.6) after each tails.
          <br />
          <br />
          So we can call <b>1.5</b> the heads factor and <b>0.6</b> the tails
          factor.
          <br />
          <br />
          <pre>
            Let <b>H</b> denote a coin toss landing on heads.
            <br />
            Let <b>T</b> denote a coin toss landing on tails.
            <br />
            Let <i>b</i> denote your bet.
          </pre>
          <h3>
            Imagine we get <b>7</b> heads and <b>3</b> tails. <br />
            Consider two orderings: <b>HHHHHHHTTT</b> and <b>HHTHHTHHTH</b>.
          </h3>
          <pre>
            The result of <b> HHHHHHHTTT</b> can be expressed as: <br />
            1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 0.6 * 0.6 * 0.6 * <i>
              b
            </i>{' '}
            = (1.5<sup>7</sup>)(0.6<sup>3</sup>)<i>b</i>
          </pre>
          <pre>
            The result of <b> HHTHHTHHTH</b> can be expressed as: <br />
            1.5 * 1.5 * 0.6 * 1.5 * 1.5 * 0.6 * 1.5 * 1.5 * 0.6 * 1.5 * <i>b</i>
          </pre>
          Since multiplication is commutative, the order of multiplication does
          not matter.
          <br />
          This means we can rearrange the factors however we would like. For
          instance, we can put all the 1.5 factors next to each other:
          <pre>
            1.5 * 1.5 * 0.6 * 1.5 * 1.5 * 0.6 * 1.5 * 1.5 * 0.6 * 1.5 * <i>b</i>
            <br />= 1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 1.5 * 0.6 * 0.6 * 0.6 *{' '}
            <i>b</i>
            <br />= (1.5<sup>7</sup>)(0.6<sup>3</sup>)<i>b</i>
            <br />
            {'->'} just like when the ordering was <b>HHHHHHHTTT</b>
          </pre>
          Now we can see that <b>HHHHHHHTTT</b> yields the same outcome as{' '}
          <b>HHTHHTHHTH</b>. This holds for any two orders that share a heads
          count and a tails count. Their outcomes will be the same.
          <br />
          <br />
          Since we can always rearrange the factors to put the heads factors
          together and the tails factors together, we can always express the
          result as follows:
          <div className='mt-4 flex'>
            <span className='mx-auto font-bold tracking-widest'>
              (
              <i>
                f<sub>h</sub>
              </i>
              <sup>
                <i>
                  c<sub>h</sub>
                </i>
              </sup>
              )(
              <i>
                f<sub>t</sub>
              </i>
              <sup>
                <i>
                  c<sub>t</sub>
                </i>
              </sup>
              )<i>b</i>
              <br />
            </span>
          </div>
          Where we define our variables as:
          <ul>
            <li>
              <i>
                f<sub>h</sub>
              </i>
              : the heads factor
            </li>

            <li>
              <i>
                f<sub>t</sub>
              </i>
              : the tails factor
            </li>

            <li>
              <i>
                c<sub>h</sub>
              </i>
              : the heads count
            </li>

            <li>
              <i>
                c<sub>t</sub>
              </i>
              : the tails count
            </li>

            <li>
              <i>b</i>: the initial bet
            </li>
          </ul>
          <h2>
            If 50% is greater than 40%, why do I lose money if I get 5 heads and
            5 tails?
          </h2>
          <h3>
            Let{"'"}s think of this in terms of multiplication, rather than
            adding or subtracting a proportion of the pot.
          </h3>
          <pre>
            Adding 50% of the pot leaves you with 150% of the pot. (100% + 50%)
            <br />
            150% of x = 1.5x
            <br />
            This means the heads factor is 1.5.
            <br />
            <br />
            Reducing the pot by 40% leaves you with 60% of the pot. (100% - 40%)
            <br />
            60% of x = 0.6x
            <br />
            This means the tails factor is 0.6.
            <br />
          </pre>
          <h3>Imagine you only get two tosses.</h3>
          <p>
            If you get 1 heads and 1 tails, we can represent the result as
            follows:
          </p>
          <pre>
            heads factor * tails factor * <i>b</i>, where <i>b</i> is your bet
            <br />= 1.5 * 0.6 * <i>b</i>
            <br />= 0.9 * <i>b</i>
            <br />= 90% of <i>b</i>
            <br />
            {'->'} you lost 10% of your bet.
          </pre>
          To break even, you need the tails factor to be the reciprocal of the
          heads factor, because a number multiplied by its reciprocal is 1,
          i.e., 100%. If, like in the scenario above, the heads factor is 1.5
          (which can be represented as{' '}
          <FractionHelper numerator={3} denominator={2} />) you would need the
          tails factor to be its reciprocal,{' '}
          <FractionHelper numerator={2} denominator={3} />. A tails factor of{' '}
          <FractionHelper numerator={2} denominator={3} /> corresponds to losing
          33.333% after each tails.
          <pre>
            heads factor * tails factor * b<br /> ={' '}
            <FractionHelper numerator={3} denominator={2} /> *{' '}
            <FractionHelper numerator={2} denominator={3} /> * <i>b</i>
            <br />= <FractionHelper numerator={6} denominator={6} /> * <i>b</i>
            <br />= 1 * <i>b</i> = <i>b</i>
          </pre>
          The loss of 40% described above is a larger loss, so you would lose
          money.
          <br />
          This principle is true regardless of how many coin tosses there are.
          <br />
          <h4> Given an equal number of heads and tails:</h4>
          <ul>
            <li>
              You break even if the factors are reciprocals of each other.
            </li>

            <li>
              You make a profit if a factor is larger than the reciprocal of the
              other factor.
            </li>

            <li>
              You lose money if a factor is smaller than the reciprocal of the
              other factor.
            </li>
          </ul>
          <h3>Another example</h3>
          <h4>
            If tails means you lose 25%, how much would you have to gain on
            heads to break even when you get the same number of heads as tails?
          </h4>
          <pre>
            Losing 25% means you are left with 75% of what you had. (100% - 25%
            = 75%).
            <br />
            75% = <FractionHelper numerator={75} denominator={100} /> ={' '}
            <FractionHelper numerator={3} denominator={4} />.
            <br />
            {'->'} the tails factor is{' '}
            <FractionHelper numerator={3} denominator={4} />.
            <br />
            <br />
            The reciprocal of <FractionHelper
              numerator={3}
              denominator={4}
            />{' '}
            is <FractionHelper numerator={4} denominator={3} />.
            <br />
            {'->'} the heads factor is{' '}
            <FractionHelper numerator={4} denominator={3} />.
            <br />
            <br />
            <FractionHelper numerator={4} denominator={3} /> = 1.33333.
            <br />
            As a percent, that{"'"}s 133.333%.
            <br />
            That{"'"}s equivalent to a gain of 33.333%. (133.333% = 100% +
            33.333%)
          </pre>
          <br />
          Therefore, you would need to gain 33.333% on heads in order to break
          even.
          <h2>References</h2>
          <p>
            This article was inspired by the work of Ole Peters in the field of
            ergodicity economics. Visit his{' '}
            <a
              href='https://ergodicityeconomics.com/'
              className='transition-colors duration-75 hover:text-blue-600'
            >
              blog
            </a>{' '}
            to learn more.
          </p>
        </div>
      )}
    </div>
  )
}
