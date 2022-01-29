import anime, { AnimeInstance } from 'animejs'
import { useEffect, useState, useRef } from 'react'

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})
function formatter(value: number) {
  return nfObject.format(value)
}

export default function AnimatedNumber({
  className = '',
  name,
  value,
}: {
  className: string
  name: string
  value: number
}) {
  const [curVal, setCurVal] = useState(value)
  const animationRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    const logEl = document.querySelector('.' + name) as Element
    const currentDisplayedValue = Number(logEl.innerHTML.replace('$', ''))

    const changeObject = { currentDisplayedValue }
    animationRef.current = anime({
      targets: changeObject,
      currentDisplayedValue: value,
      round: 0,
      easing: 'linear',
      update() {
        logEl.innerHTML = formatter(changeObject.currentDisplayedValue)
      },
    })

    setCurVal(value)
  }, [name, value])

  return <div className={`${name} ${className}`}>{formatter(curVal)}</div>
}
