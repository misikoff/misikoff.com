import { useEffect } from 'react'
import anime from 'animejs'
// import utilityFunctions from 'lib/utilityFunctions'
// consider how to implement shuffling

const numWaves = 4
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
  {
    d: 'M0,224L48,202.7C96,181,192,139,288,101.3C384,64,480,32,576,26.7C672,21,768,43,864,74.7C960,107,1056,149,1152,144C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  },
  //   {
  //     d: 'M0,64L48,101.3C96,139,192,213,288,224C384,235,480,181,576,133.3C672,85,768,43,864,48C960,53,1056,107,1152,128C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  //   },
  //   {
  //     d: 'M0,256L48,256C96,256,192,256,288,245.3C384,235,480,213,576,170.7C672,128,768,64,864,48C960,32,1056,64,1152,112C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
  //   },
]

const curWaves = waveShapes
  .map((w) => {
    return w.d
  })
  .slice(0, 4)

export default function Example() {
  useEffect(() => {
    curWaves.forEach((_, i) => {
      //   console.log(
      //     'cur index: ' + i + ' and change index: ' + ((i + 1) % curWaves.length)
      //   )
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
    <div className='mt-8'>
      {/* {curWaves[0]} */}
      <div
        style={{ clipPath: 'circle(50% at 50% 50%)' }}
        className='group relative mx-auto h-48 w-48 bg-blue-200 transition-colors duration-1000 hover:bg-blue-50 md:h-96 md:w-96'
      >
        {curWaves.map((_, index) => {
          return (
            <div
              key={index}
              className={
                'absolute h-1/5 w-full ' +
                (index === 0
                  ? 'top-1/5'
                  : index === 1
                  ? 'top-2/5'
                  : index === 2
                  ? 'top-3/5'
                  : 'top-4/5')
              }
            >
              <svg
                id='wave'
                className={
                  'transition-colors duration-1000 group-hover:text-blue-200 ' +
                  (index === 0
                    ? 'text-blue-300'
                    : index === 1
                    ? 'text-blue-400'
                    : index === 2
                    ? 'text-blue-500'
                    : 'text-blue-600')
                }
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 1440 320'
              >
                <path
                  className={'loop-alternate-infinity' + index}
                  fill='currentColor'
                  fillOpacity='1'
                  d={curWaves[index]}
                />
              </svg>
              <div
                className={
                  '-mt-0.5 flex h-24 transition-colors duration-1000 ' +
                  (index === 0
                    ? 'bg-blue-300 group-hover:bg-blue-200'
                    : index === 1
                    ? 'bg-blue-400 group-hover:bg-blue-200'
                    : index === 2
                    ? 'bg-blue-500 group-hover:bg-blue-200'
                    : 'bg-blue-600 group-hover:bg-blue-200')
                }
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
