import { useEffect, useState, useRef } from 'react'
import { animate } from 'framer-motion'

const defaultFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function AnimatedNumber({
  className = '',
  value,
  formatter = defaultFormatter,
}: {
  className?: string
  value: number
  formatter?: Intl.NumberFormat
}) {
  const [curVal, setCurVal] = useState(value)
  const nodeRef = useRef<HTMLDivElement | null>(null)

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
        })

        return () => controls.stop()
      }
    }
  }, [curVal, formatter, value])

  return <div ref={nodeRef} className={className} />
}
