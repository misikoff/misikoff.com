import clsx from 'clsx'

import Hexagon from './hexagon'

export default function HexagonGrid({
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

  return (
    <div className={clsx(className, 'flex w-full justify-center')}>
      <div
        className='flex animate-pulse'
        style={{
          WebkitTransform: 'perspective(600px) rotateX(60deg)',
          transform: 'perspective(600px) rotateX(60deg)',
        }}
      >
        {colNumbers.map((cx, ci) => {
          return (
            <div
              key={'col-' + ci}
              className={clsx(
                'flex w-auto flex-col',
                ci > 0 && '-ml-1',
                ci % 2 == 1 && 'pt-4',
              )}
            >
              {rowNumbers.map((rx, ri) => {
                return (
                  <Hexagon
                    key={'row-' + ri}
                    className='w-8 fill-blue-300 duration-200 ease-in-out hover:animate-spin'
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
