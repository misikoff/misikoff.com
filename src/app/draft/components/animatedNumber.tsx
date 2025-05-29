import { useEffect, useState, useRef } from 'react'

import { animate } from 'motion'

const defaultFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function AnimatedNumber({
  className = '',
  value = 0,
  formatter = defaultFormatter,
}: {
  className?: string
  value?: number
  formatter?: Intl.NumberFormat
}) {
  const [curVal, setCurVal] = useState(value)
  const nodeRef = useRef<HTMLDivElement | null>(null)

  const prevValue = useRef<number>(0)

  useEffect(() => {
    prevValue.current = value
  }, [value])

  useEffect(() => {
    if (curVal !== value) {
      const node = nodeRef.current
      if (node) {
        const controls = animate(curVal, value, {
          duration: 1,
          onUpdate(value) {
            node.textContent = formatter.format(value)
          },
          onComplete() {
            setCurVal(value)
          },
          onStop() {
            // TODO: don't have the animation reset if it didn't finish before the value changed again
            setCurVal(prevValue.current)
          },
        })

        return () => controls.stop()
      }
    }
  }, [curVal, formatter, value])

  return (
    <div ref={nodeRef} className={className}>
      {formatter.format(curVal)}
    </div>
  )
}
