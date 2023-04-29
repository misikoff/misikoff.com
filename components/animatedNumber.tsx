import { useEffect, useState, useRef } from 'react'
import { animate } from 'framer-motion'

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function formatter(value: number) {
  return nfObject.format(value)
}

export default function AnimatedNumber({
  className = '',
  value,
}: {
  className?: string
  value: number
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
            node.textContent = formatter(value)
          },
          onComplete() {
            setCurVal(value)
          },
        })

        return () => controls.stop()
      }
    }
  }, [curVal, value])

  return <div ref={nodeRef} className={className} />
}
