import anime from 'animejs'
import { useEffect, useRef } from 'react'

export default function Example() {
  const animationRef = useRef(null)

  useEffect(() => {
    console.log('in use effect')
    animationRef.current = anime({
      targets: '.el',
      translateX: 250,
      delay: function (el, i) {
        return i * 100
      },
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    })
  }, [])

  return (
    <>
      <button onClick={() => animationRef.current.restart()}>Restart</button>
      <div className="el w-4 h-4 bg-green-400" />
    </>
  )
}
