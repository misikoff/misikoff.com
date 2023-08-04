'use client'

import { useEffect, useRef, useState } from 'react'

import createGlobe from 'cobe'

export default function App() {
  const [location, setLocation] = useState<[number, number]>([0, 0])
  const [newLocations, setLocations] = useState<number[][]>([
    [20, 20],
    [30, 30],
  ])
  const [phi, setPhi] = useState<number>(0)

  const [curGlobe, setCurGlobe] = useState<Renderer>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation([position.coords.latitude, position.coords.longitude])
      console.log('Latitude is :', position.coords.latitude)
      console.log('Longitude is :', position.coords.longitude)
    })
  }, [])

  const canvasRef = useRef<HTMLCanvasElement>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const render = (state: any) => {
    console.log('rendering')
    state.markers = [location, ...newLocations].map((loc) => {
      return { location: loc, size: 0.1 }
    })
    console.log(newLocations.length)
    state.phi = phi
    setPhi(phi + 0.01)
    return state
  }
  useEffect(() => {
    if (location[0] != 0) {
      let phi = 0
      let markers = [{ location, size: 0.1 }]
      let dif = 1

      const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          // longitude latitude
          // { location: [37.7595, -122.4367], size: 0.03 },
          // { location: [40.7128, -74.006], size: 0.1 },
          { location, size: 0.1 },
        ],
        onRender: (state) => {
          state = render(state)
        },
        // (state) => {
        //   // Called on every animation frame.
        //   // `state` will be an empty object, return updated params.
        //   state.phi = phi
        //   phi += 0.01

        //   state.markers = [location, ...newLocations].map((loc) => {
        //     return { location: loc, size: 0.1 }
        //   })
        //   let dif2 = 0.01
        //   if (markers[0].size > 0.5) {
        //     dif = -1
        //   }
        //   if (markers[0].size < 0.1) {
        //     dif = 1
        //   }

        //   markers[0].size = markers[0].size + dif * dif2
        // },
      })
      setCurGlobe(globe)

      return () => {
        globe.destroy()
      }
    }
  }, [location, render])

  useEffect(() => {
    if (curGlobe) {
      console.log(curGlobe)
      curGlobe.toggle()
    }
  }, [curGlobe, newLocations])

  return (
    <div>
      {newLocations.toString()}
      <h1>COBE</h1>
      <p>
        A lightweight (5kB) WebGL globe lib:{' '}
        <a href='https://github.com/shuding/cobe' target='_blank'>
          GitHub
        </a>
      </p>
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
      />
      <button
        className='h-8 bg-blue-500 p-4 text-white'
        onClick={() => {
          console.log('clicked')
          setLocations([
            ...newLocations,
            [40, -90],
            [60, 60],
            [70, 60],
            [80, 60],
            [50, 60],
          ])
        }}
      >
        add dot
      </button>
    </div>
  )
}
