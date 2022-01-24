import anime from 'animejs'
import { useEffect } from 'react'

const waveShapes = [
  {
    d: 'M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,154.7C672,181,768,203,864,192C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    d: 'M0,256L48,256C96,256,192,256,288,229.3C384,203,480,149,576,149.3C672,149,768,203,864,229.3C960,256,1056,256,1152,250.7C1248,245,1344,235,1392,229.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  {
    d: 'M0,128L48,106.7C96,85,192,43,288,64C384,85,480,171,576,170.7C672,171,768,85,864,58.7C960,32,1056,64,1152,69.3C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
]

export default function Example() {
  // const animationRef = useRef(null)
  // const waveRef = useRef(null)

  useEffect(() => {
    console.log('in use effect')
    anime({
      targets: '.el',
      translateX: 250,
      delay: function (_, i: number) {
        return i * 100
      },
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
    })

    const curWaves = waveShapes.map((w) => {
      return w.d
    })
    curWaves.forEach((_, i) => {
      console.log(
        'cur index: ' + i + ' and change index: ' + ((i + 1) % curWaves.length)
      )
      anime({
        targets: '.loop-alternate-infinity' + i,
        d: curWaves[(i + 1) % curWaves.length],
        duration: 5000 + 5000 * Math.random(),
        direction: 'alternate',
        autoplay: true,
        easing: 'easeInOutSine',
        elasticity: 100,
        loop: true,
        // delay: 5000 * Math.random(),
      })
    })
  }, [])

  return (
    <>
      {/* <button onClick={() => animationRef.current.restart()}>Restart</button> */}
      <div className="el h-4 w-4 bg-green-400" />
      {/* {waveShapes} */}
      {waveShapes.map((_, index) => {
        return (
          <svg
            key={index}
            id="wave"
            className={'transition-colors duration-1000 hover:text-blue-200'}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              className={'loop-alternate-infinity' + index}
              fill="currentColor"
              fillOpacity="1"
              d={waveShapes[index].d}
            />
          </svg>
        )
      })}
    </>
  )
}
