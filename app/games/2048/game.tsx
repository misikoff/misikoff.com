'use client'

import { useEffect, useState, useRef } from 'react'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { unzip } from 'lodash-es'
import { useSwipeable } from 'react-swipeable'
import { v4 as uuid } from 'uuid'

const colors = [
  'bg-blue-100',
  'bg-blue-200',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
  'bg-blue-700',
  'bg-blue-800',
  'bg-blue-900',
]

type tile = {
  value: number
  id: string
  new: boolean
}

const startingVals = [
  [0, 0, 0, 0],
  [0, 8, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

const gameBoard: tile[][] = []
startingVals.forEach((row) => {
  const newRow: tile[] = []
  row.forEach((item) => {
    newRow.push({ value: item, id: uuid(), new: true })
  })
  gameBoard.push(newRow)
})

const collapse = (tiles: tile[], collapseLast = false) => {
  let additionalScore = 0
  const newTiles = tiles
    .map((item, i) => {
      if (item.value > 0) {
        const leftIndex = i - 1
        let leftNeighbor = null
        if (leftIndex >= 0) {
          leftNeighbor = tiles[leftIndex]
        }

        const rightIndex = i + 1
        let rightNeighbor = null
        if (rightIndex < tiles.length) {
          rightNeighbor = tiles[rightIndex]
        }

        if (leftNeighbor && leftNeighbor.value === item.value) {
          if (collapseLast) {
            additionalScore += item.value * 2
          }
          return {
            value: collapseLast ? 0 : item.value * 2,
            id: item.id,
            new: false,
          }
        } else if (rightNeighbor && rightNeighbor.value === item.value) {
          console.log({ item, rightNeighbor, i, rightIndex })
          if (!collapseLast) {
            additionalScore += item.value * 2
          }
          return {
            value: collapseLast ? item.value * 2 : 0,
            id: item.id,
            new: false,
          }
        }
      }
      return item
    })
    .filter((item) => item.value > 0)

  return { tiles: newTiles, score: additionalScore }
}

const moveLeft = (game: tile[][]) => {
  let additionalScore = 0
  let result = [...game]
  game.forEach((r, i) => {
    let occupiedTiles: tile[] = []
    r.forEach((item) => {
      if (item.value > 0) {
        occupiedTiles.push(item)
      }
    })

    const { tiles, score } = collapse(occupiedTiles)
    occupiedTiles = tiles
    additionalScore += score

    if (occupiedTiles.length > 0) {
      result[i] = []

      occupiedTiles.forEach((item) => {
        const nextItem = { value: item.value, id: item.id, new: false }
        result[i].push(nextItem)
      })

      result[i].push(
        ...Array(r.length - occupiedTiles.length).fill({
          value: 0,
          id: null,
          new: true,
        })
      )
    }
  })
  console.log({ additionalScore })
  return { result, additionalScore }
}

const moveRight = (game: tile[][]) => {
  let additionalScore = 0
  let result = [...game]
  game.forEach((r, i) => {
    let occupiedTiles: tile[] = []
    r.forEach((item) => {
      if (item.value > 0) {
        occupiedTiles.push(item)
      }
    })

    const { tiles, score } = collapse(occupiedTiles)
    occupiedTiles = tiles
    additionalScore += score

    if (occupiedTiles.length > 0) {
      result[i] = []
      result[i].push(
        ...Array(r.length - occupiedTiles.length).fill({
          value: 0,
          id: null,
          new: true,
        })
      )
      occupiedTiles.forEach((item) => {
        const nextItem = { value: item.value, id: item.id, new: false }
        result[i].push(nextItem)
      })
    }
  })

  console.log({ additionalScore })

  return { result, additionalScore }
}

const moveUp = (game: tile[][]) => {
  game = unzip(game)

  let additionalScore = 0
  let result = [...game]
  game.forEach((r, i) => {
    let occupiedTiles: tile[] = []
    r.forEach((item) => {
      if (item.value > 0) {
        occupiedTiles.push(item)
      }
    })

    const { tiles, score } = collapse(occupiedTiles)
    occupiedTiles = tiles
    additionalScore += score

    if (occupiedTiles.length > 0) {
      result[i] = []

      occupiedTiles.forEach((item) => {
        const nextItem = { value: item.value, id: item.id, new: false }
        result[i].push(nextItem)
      })

      result[i].push(
        ...Array(r.length - occupiedTiles.length).fill({
          value: 0,
          id: null,
          new: true,
        })
      )
    }
  })

  return { result: unzip(result), additionalScore }
}

const moveDown = (game: tile[][]) => {
  game = unzip(game)

  let additionalScore = 0
  let result = [...game]
  game.forEach((r, i) => {
    let occupiedTiles: tile[] = []
    r.forEach((item) => {
      if (item.value > 0) {
        occupiedTiles.push(item)
      }
    })

    const { tiles, score } = collapse(occupiedTiles)
    occupiedTiles = tiles
    additionalScore += score

    if (occupiedTiles.length > 0) {
      result[i] = []
      result[i].push(
        ...Array(r.length - occupiedTiles.length).fill({
          value: 0,
          id: null,
          new: true,
        })
      )
      occupiedTiles.forEach((item) => {
        const nextItem = { value: item.value, id: item.id, new: false }
        result[i].push(nextItem)
      })
    }
  })

  console.log({ additionalScore })

  return { result: unzip(result), additionalScore }
}

export default function GameBoard({ className = '' }: { className?: string }) {
  const [curGame, setCurGame] = useState(gameBoard)
  const [score, setScore] = useState(0)
  const preGameBoard = useRef<tile[][]>([])
  const curScore = useRef(0)

  useEffect(() => {
    preGameBoard.current = curGame
  }, [curGame])

  useEffect(() => {
    curScore.current = score
  }, [score])

  const handleArrowKeyPressed = (event: KeyboardEvent) => {
    let newGame = preGameBoard.current
    let newScore = curScore.current
    if (event.key === 'ArrowLeft') {
      console.log('left')
      let { result, additionalScore } = moveLeft(preGameBoard.current)
      newGame = result
      newScore += additionalScore
    } else if (event.key === 'ArrowRight') {
      console.log('right')
      let { result, additionalScore } = moveRight(preGameBoard.current)
      newGame = result
      newScore += additionalScore
    } else if (event.key === 'ArrowUp') {
      console.log('up')
      let { result, additionalScore } = moveUp(preGameBoard.current)
      newGame = result
      newScore += additionalScore
    } else if (event.key === 'ArrowDown') {
      let { result, additionalScore } = moveDown(preGameBoard.current)
      newGame = result
      newScore += additionalScore
    }

    const gameVals = preGameBoard.current.map((r) => {
      return r.map((item) => {
        return item.value
      })
    })

    const newGameVals = newGame.map((r) => {
      return r.map((item) => {
        return item.value
      })
    })

    if (JSON.stringify(gameVals) !== JSON.stringify(newGameVals)) {
      console.log('valid move')

      const possiblePairs: number[][] = []
      newGame.forEach((r, ri) => {
        r.forEach((val, ci) => {
          if (val.value === 0) {
            possiblePairs.push([ri, ci])
          }
        })
      })

      const item =
        possiblePairs[Math.floor(Math.random() * possiblePairs.length)]
      console.log({ item })
      newGame[item[0]][item[1]] = {
        value: Math.random() > 0.5 ? 2 : 4,
        id: uuid(),
        new: true,
      }

      setCurGame(newGame)
      setScore(newScore)
    }
  }

  useEffect(() => {
    console.log('adding event listener')
    window.addEventListener('keydown', handleArrowKeyPressed, true)
    return () => {
      window.removeEventListener('keydown', handleArrowKeyPressed)
    }
  }, [])

  const handlers = useSwipeable({
    preventScrollOnSwipe: true,
    trackMouse: true,
    onSwipedLeft: (SwipeEventData) => {
      console.log('swiped left')
      let newGame = preGameBoard.current
      let newScore = curScore.current

      console.log('left')
      let { result, additionalScore } = moveLeft(preGameBoard.current)
      newGame = result
      newScore += additionalScore

      const gameVals = preGameBoard.current.map((r) => {
        return r.map((item) => {
          return item.value
        })
      })

      const newGameVals = newGame.map((r) => {
        return r.map((item) => {
          return item.value
        })
      })

      if (JSON.stringify(gameVals) !== JSON.stringify(newGameVals)) {
        console.log('valid move')

        const possiblePairs: number[][] = []
        newGame.forEach((r, ri) => {
          r.forEach((val, ci) => {
            if (val.value === 0) {
              possiblePairs.push([ri, ci])
            }
          })
        })

        const item =
          possiblePairs[Math.floor(Math.random() * possiblePairs.length)]
        console.log({ item })
        newGame[item[0]][item[1]] = {
          value: Math.random() > 0.5 ? 2 : 4,
          id: uuid(),
          new: true,
        }

        setCurGame(newGame)
        setScore(newScore)
      }
    },
    onSwipedRight: (SwipeEventData) => {},
  })

  return (
    <div className={clsx(className, 'flex flex-col justify-center gap-4')}>
      <div className='flex h-96 w-96 flex-col space-y-4 rounded-md bg-red-200 p-4'>
        {[0, 1, 2, 3].map((_, ri) => {
          return (
            <div key={'l' + ri} className='flex h-full w-full space-x-4'>
              {[0, 1, 2, 3].map((_, ci) => {
                return (
                  <div
                    {...handlers}
                    key={'r' + ci}
                    className='relative flex h-full w-full items-center rounded-md bg-gray-500 text-center'
                  >
                    {/* <span className='w-full'>
                        {ri},{ci}
                      </span> */}
                    {/* <p className='w-full'>{curGame[ri][ci]}</p> */}
                    <AnimatePresence initial={false}>
                      {curGame[ri][ci].value > 0 && (
                        <motion.div
                          onClick={() => {
                            curGame[ri][ci].value = curGame[ri][ci].value * 2
                          }}
                          key={curGame[ri][ci].id}
                          className={clsx(
                            'absolute z-10 flex h-full w-full items-center justify-center rounded-md text-3xl font-bold',
                            colors[Math.log2(curGame[ri][ci].value) - 1]
                          )}
                          layoutId={curGame[ri][ci].id}
                          transition={{
                            ease: 'easeInOut',
                            duration: 0.25,
                            x: { duration: 1 },
                            y: { duration: 1 },
                          }}
                          initial={
                            curGame[ri][ci].new
                              ? {
                                  opacity: 0,
                                  scale: 0,
                                }
                              : {}
                          }
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          {curGame[ri][ci].value}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div className='flex flex-col justify-center gap-2'>
        <div className='text-xl font-bold'>Score</div>
        <div className='font-mono'>{score}</div>
      </div>
    </div>
  )
}
