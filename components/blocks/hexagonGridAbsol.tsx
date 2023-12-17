'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import Hexagon from './hexagon'

export default function HexagonGridAbsol({
  className,
  vertical = false,
  rows = 3,
  cols = 3,
}: {
  className?: string
  vertical?: boolean
  rows?: number
  cols?: number
}) {
  const rowNumbers = Array.from(Array(rows).keys())

  const colNumbers = Array.from(Array(cols).keys())

  const width = 32
  const size = width / 2
  const height = Math.sqrt(3) * size
  console.log({ width, size, height })
  const totalWidth = ((cols - 1) * (width * 3)) / 4 + width
  const totalHeight = rows * height + (cols > 1 ? height / 2 : 0)

  const xOffset = -totalWidth / 2
  const yOffset = totalHeight / 2

  console.log({ xOffset, yOffset, height, totalHeight })
  return (
    <div
      className={clsx(className, 'relative mx-auto')}
      style={{
        width: totalWidth,
        height: totalHeight,
        // WebkitTransform: 'perspective(600px) rotateX(60deg)',
        // transform: 'perspective(600px) rotateX(60deg)',
      }}
    >
      {colNumbers.map((_, ci) => {
        return rowNumbers.map((_, ri) => {
          return (
            <motion.div
              key={ri + '-' + ci}
              className='absolute w-8'
              style={{
                left: (ci * (width * 3)) / 4,
                top: ri * height + (ci % 2 == 1 ? height / 2 : 0),
              }}
              // animate={{ opacity: 0.5 }}
              animate={{ rotate: ci * 180 }}
              transition={{
                repeatType: 'reverse',
                repeat: Infinity,
                // duration: ci / 5,
                type: 'spring',
                repeatDelay: 0,
              }}
            >
              <Hexagon className='w-full scale-90 fill-blue-300' />
            </motion.div>
          )
        })
      })}
    </div>
  )
}
