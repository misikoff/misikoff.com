import anime, { AnimeInstance } from 'animejs'
import { useEffect, useRef } from 'react'

export default function Example() {
  const animationRef = useRef<AnimeInstance | null>(null)

  useEffect(() => {
    animationRef.current = anime({
      targets: '.el',
      translateX: 250,
      delay: function (_, i: number) {
        return i * 100
      },
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    })
  }, [])

  return (
    <>
      <button onClick={() => animationRef.current?.restart()}>Restart</button>
      <div className='el h-4 w-4 bg-green-400' />
    </>
  )
}
