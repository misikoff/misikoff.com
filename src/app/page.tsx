import Image from 'next/image'
import Link from 'next/link'

import SectionHeader from '@/components/SectionHeader'
import WorkCard from '@/components/WorkCard'
import ResumeIcon from '@/components/icons/ResumeIcon'
import SnowGaleLabsIcon from '@/components/icons/SnowGaleLabs'
import ToronLogoIcon from '@/components/icons/ToronLogo'
import VercelIcon from '@/components/icons/Vercel'
import { Button } from '@/components/ui/button'

function CoolListElement(name: string, description: string) {
  return (
    <li className='mb-2 tracking-[-.01em] font-sans'>
      <span className='font-mono font-bold'>{name}</span> | {description}
    </li>
  )
}

const developmentEthos = [
  {
    name: 'Iterative Development',
    description:
      'Prototyping and refining based on real-world feedback and analytics.',
  },
  {
    name: 'Systems Thinking',
    description:
      'Approaching projects holistically to pinpoint links and dependencies.',
  },
  {
    name: 'Cross-Functional Collaboration',
    description:
      'Aligning engineering with design and product to maintain a unified product vision.',
  },
  {
    name: 'Initiative & Ownership',
    description:
      'Identifying areas for improvement and pitching impactful solutions.',
  },
  {
    name: 'Developer Experience Improvement',
    description:
      'Recognizing and resolving bottlenecks in developer flow to improve velocity.',
  },
  {
    name: 'Clarity Over Complexity',
    description:
      'Promoting thoughtful design and implementation to deliver intuitive experiences.',
  },
  {
    name: 'Code as Communication',
    description: 'Writing code with readability in mind.',
  },
]

type StackItem = {
  name: string
  description: string
  logo?: () => React.ReactNode
}
const stackItems: StackItem[] = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='-11.5 -10.23174 23 20.46348'
      >
        <title>React Logo</title>
        <circle cx='0' cy='0' r='2.05' fill='#61dafb' />
        <g stroke='#61dafb' strokeWidth='1' fill='none'>
          <ellipse rx='11' ry='4.2' />
          <ellipse rx='11' ry='4.2' transform='rotate(60)' />
          <ellipse rx='11' ry='4.2' transform='rotate(120)' />
        </g>
      </svg>
    ),
  },
  {
    name: 'React Native',
    description: 'A framework for building native apps using React.',
    logo: () => (
      <svg
        width='112'
        height='102'
        viewBox='0 0 112 102'
        fill='none'
        // className='stroke-blue-200'
      >
        <path
          d='M56 61.832c5.891 0 10.667-4.776 10.667-10.667S61.89 40.498 56 40.498c-5.89 0-10.666 4.776-10.666 10.667S50.108 61.832 56 61.832Z'
          // fill='var(--logo)'
          className='fill-[#087ea4]'
        />
        <path
          d='M56 75.165c29.455 0 53.333-10.745 53.333-24s-23.878-24-53.333-24-53.334 10.745-53.334 24 23.879 24 53.334 24Z'
          // stroke='var(--logo)'
          strokeWidth='5.333'
          className='stroke-[#087ea4]'
        />
        <path
          d='M35.215 63.165c14.728 25.509 35.972 40.815 47.451 34.188 11.48-6.628 8.846-32.68-5.882-58.188-14.727-25.51-35.972-40.816-47.45-34.188-11.48 6.627-8.846 32.679 5.881 58.188Z'
          // stroke='var(--logo)'
          strokeWidth='5.333'
          className='stroke-[#087ea4]'
        />
        <path
          d='M35.215 39.165c-14.727 25.509-17.36 51.56-5.882 58.188 11.48 6.627 32.724-8.68 47.451-34.188 14.728-25.51 17.362-51.56 5.883-58.188-11.48-6.628-32.724 8.679-47.452 34.188Z'
          // stroke='var(--logo)'
          strokeWidth='5.333'
          className='stroke-[#087ea4]'
        />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    description: 'A React framework for server-rendered applications.',
    logo: () => (
      <svg
        aria-label='Next.js logomark'
        className='next-mark_root__iLw9v'
        height='80'
        role='img'
        viewBox='0 0 180 180'
        width='80'
        color='black'
      >
        {/* <mask
          height='180'
          id=':S1:mask0_408_134'
          maskUnits='userSpaceOnUse'
          // width='180'
          x='0'
          y='0'
          className='mask-alpha'
          // style='mask-type: alpha;'
        > */}
        <circle cx='90' cy='90' fill='black' r='90' />
        {/* </mask> */}
        <g mask='url(#:S1:mask0_408_134)'>
          <circle cx='90' cy='90' data-circle='true' fill='black' r='90' />
          <path
            d='M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z'
            fill='url(#:S1:paint0_linear_408_134)'
          />
          <rect
            fill='url(#:S1:paint1_linear_408_134)'
            height='72'
            width='12'
            x='115'
            y='54'
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id=':S1:paint0_linear_408_134'
            x1='109'
            x2='144.5'
            y1='116.5'
            y2='160.5'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </linearGradient>
          <linearGradient
            gradientUnits='userSpaceOnUse'
            id=':S1:paint1_linear_408_134'
            x1='121'
            x2='120.799'
            y1='54'
            y2='106.875'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    description: 'A superset of JavaScript with static typing.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        height='512'
        viewBox='0 0 512 512'
        width='512'
      >
        <rect fill='#3178c6' height='512' rx='50' width='512' />
        <rect fill='#3178c6' height='512' rx='50' width='512' />
        <path
          clipRule='evenodd'
          d='m316.939 407.424v50.061c8.138 4.172 17.763 7.3 28.875 9.386s22.823 3.129 35.135 3.129c11.999 0 23.397-1.147 34.196-3.442 10.799-2.294 20.268-6.075 28.406-11.342 8.138-5.266 14.581-12.15 19.328-20.65s7.121-19.007 7.121-31.522c0-9.074-1.356-17.026-4.069-23.857s-6.625-12.906-11.738-18.225c-5.112-5.319-11.242-10.091-18.389-14.315s-15.207-8.213-24.18-11.967c-6.573-2.712-12.468-5.345-17.685-7.9-5.217-2.556-9.651-5.163-13.303-7.822-3.652-2.66-6.469-5.476-8.451-8.448-1.982-2.973-2.974-6.336-2.974-10.091 0-3.441.887-6.544 2.661-9.308s4.278-5.136 7.512-7.118c3.235-1.981 7.199-3.52 11.894-4.615 4.696-1.095 9.912-1.642 15.651-1.642 4.173 0 8.581.313 13.224.938 4.643.626 9.312 1.591 14.008 2.894 4.695 1.304 9.259 2.947 13.694 4.928 4.434 1.982 8.529 4.276 12.285 6.884v-46.776c-7.616-2.92-15.937-5.084-24.962-6.492s-19.381-2.112-31.066-2.112c-11.895 0-23.163 1.278-33.805 3.833s-20.006 6.544-28.093 11.967c-8.086 5.424-14.476 12.333-19.171 20.729-4.695 8.395-7.043 18.433-7.043 30.114 0 14.914 4.304 27.638 12.912 38.172 8.607 10.533 21.675 19.45 39.204 26.751 6.886 2.816 13.303 5.579 19.25 8.291s11.086 5.528 15.415 8.448c4.33 2.92 7.747 6.101 10.252 9.543 2.504 3.441 3.756 7.352 3.756 11.733 0 3.233-.783 6.231-2.348 8.995s-3.939 5.162-7.121 7.196-7.147 3.624-11.894 4.771c-4.748 1.148-10.303 1.721-16.668 1.721-10.851 0-21.597-1.903-32.24-5.71-10.642-3.806-20.502-9.516-29.579-17.13zm-84.159-123.342h64.22v-41.082h-179v41.082h63.906v182.918h50.874z'
          fill='#fff'
          fillRule='evenodd'
        />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapid UI development.',
    logo: () => (
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 54 33'>
        <g clipPath='url(#prefix__clip0)'>
          <path
            fill='#38bdf8'
            fillRule='evenodd'
            d='M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z'
            clipRule='evenodd'
          />
        </g>
        <defs>
          <clipPath id='prefix__clip0'>
            <path fill='#fff' d='M0 0h54v32.4H0z' />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    name: 'GraphQL',
    description:
      'A query language for APIs and a runtime for executing those queries.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        // xmlns:xlink='http://www.w3.org/1999/xlink'
        version='1.1'
        id='GraphQL_Logo'
        x='0px'
        y='0px'
        viewBox='0 0 400 400'
        enableBackground='new 0 0 400 400'
        // xml:space='preserve'
      >
        <g>
          <g>
            <g>
              <rect
                x='122'
                y='-0.4'
                transform='matrix(-0.866 -0.5 0.5 -0.866 163.3196 363.3136)'
                fill='#E535AB'
                width='16.6'
                height='320.3'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='39.8'
                y='272.2'
                fill='#E535AB'
                width='320.3'
                height='16.6'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='37.9'
                y='312.2'
                transform='matrix(-0.866 -0.5 0.5 -0.866 83.0693 663.3409)'
                fill='#E535AB'
                width='185'
                height='16.6'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='177.1'
                y='71.1'
                transform='matrix(-0.866 -0.5 0.5 -0.866 463.3409 283.0693)'
                fill='#E535AB'
                width='185'
                height='16.6'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='122.1'
                y='-13'
                transform='matrix(-0.5 -0.866 0.866 -0.5 126.7903 232.1221)'
                fill='#E535AB'
                width='16.6'
                height='185'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='109.6'
                y='151.6'
                transform='matrix(-0.5 -0.866 0.866 -0.5 266.0828 473.3766)'
                fill='#E535AB'
                width='320.3'
                height='16.6'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='52.5'
                y='107.5'
                fill='#E535AB'
                width='16.6'
                height='185'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='330.9'
                y='107.5'
                fill='#E535AB'
                width='16.6'
                height='185'
              />
            </g>
          </g>
          <g>
            <g>
              <rect
                x='262.4'
                y='240.1'
                transform='matrix(-0.5 -0.866 0.866 -0.5 126.7953 714.2875)'
                fill='#E535AB'
                width='14.5'
                height='160.9'
              />
            </g>
          </g>
          <path
            fill='#E535AB'
            d='M369.5,297.9c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8   C373.5,259.9,379.2,281.2,369.5,297.9'
          />
          <path
            fill='#E535AB'
            d='M90.9,137c-9.6,16.7-31,22.4-47.7,12.8c-16.7-9.6-22.4-31-12.8-47.7c9.6-16.7,31-22.4,47.7-12.8   C94.8,99,100.5,120.3,90.9,137'
          />
          <path
            fill='#E535AB'
            d='M30.5,297.9c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7   C61.4,320.3,40.1,314.6,30.5,297.9'
          />
          <path
            fill='#E535AB'
            d='M309.1,137c-9.6-16.7-3.9-38,12.8-47.7c16.7-9.6,38-3.9,47.7,12.8c9.6,16.7,3.9,38-12.8,47.7   C340.1,159.4,318.7,153.7,309.1,137'
          />
          <path
            fill='#E535AB'
            d='M200,395.8c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9   C234.9,380.1,219.3,395.8,200,395.8'
          />
          <path
            fill='#E535AB'
            d='M200,74c-19.3,0-34.9-15.6-34.9-34.9c0-19.3,15.6-34.9,34.9-34.9c19.3,0,34.9,15.6,34.9,34.9   C234.9,58.4,219.3,74,200,74'
          />
        </g>
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    description: 'A powerful, open-source relational database system.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='432.071pt'
        height='445.383pt'
        viewBox='0 0 432.071 445.383'
      >
        <g
          id='orginal'
          style={{
            fillRule: 'nonzero',
            clipRule: 'nonzero',
            stroke: '#000000',
            strokeMiterlimit: 4,
          }}
        />
        <g
          id='Layer_x0020_3'
          style={{
            fillRule: 'nonzero',
            clipRule: 'nonzero',
            fill: 'none',
            stroke: '#FFFFFF',
            strokeWidth: 12.4651,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeMiterlimit: 4,
          }}
        >
          <path
            style={{
              fill: '#000000',
              stroke: '#000000',
              strokeWidth: 37.3953,
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
            }}
            d='M323.205,324.227c2.833-23.601,1.984-27.062,19.563-23.239l4.463,0.392c13.517,0.615,31.199-2.174,41.587-7c22.362-10.376,35.622-27.7,13.572-23.148c-50.297,10.376-53.755-6.655-53.755-6.655c53.111-78.803,75.313-178.836,56.149-203.322    C352.514-5.534,262.036,26.049,260.522,26.869l-0.482,0.089c-9.938-2.062-21.06-3.294-33.554-3.496c-22.761-0.374-40.032,5.967-53.133,15.904c0,0-161.408-66.498-153.899,83.628c1.597,31.936,45.777,241.655,98.47,178.31    c19.259-23.163,37.871-42.748,37.871-42.748c9.242,6.14,20.307,9.272,31.912,8.147l0.897-0.765c-0.281,2.876-0.157,5.689,0.359,9.019c-13.572,15.167-9.584,17.83-36.723,23.416c-27.457,5.659-11.326,15.734-0.797,18.367c12.768,3.193,42.305,7.716,62.268-20.224    l-0.795,3.188c5.325,4.26,4.965,30.619,5.72,49.452c0.756,18.834,2.017,36.409,5.856,46.771c3.839,10.36,8.369,37.05,44.036,29.406c29.809-6.388,52.6-15.582,54.677-101.107'
          />
          <path
            style={{
              fill: '#336791',
              stroke: 'none',
            }}
            d='M402.395,271.23c-50.302,10.376-53.76-6.655-53.76-6.655c53.111-78.808,75.313-178.843,56.153-203.326c-52.27-66.785-142.752-35.2-144.262-34.38l-0.486,0.087c-9.938-2.063-21.06-3.292-33.56-3.496c-22.761-0.373-40.026,5.967-53.127,15.902    c0,0-161.411-66.495-153.904,83.63c1.597,31.938,45.776,241.657,98.471,178.312c19.26-23.163,37.869-42.748,37.869-42.748c9.243,6.14,20.308,9.272,31.908,8.147l0.901-0.765c-0.28,2.876-0.152,5.689,0.361,9.019c-13.575,15.167-9.586,17.83-36.723,23.416    c-27.459,5.659-11.328,15.734-0.796,18.367c12.768,3.193,42.307,7.716,62.266-20.224l-0.796,3.188c5.319,4.26,9.054,27.711,8.428,48.969c-0.626,21.259-1.044,35.854,3.147,47.254c4.191,11.4,8.368,37.05,44.042,29.406c29.809-6.388,45.256-22.942,47.405-50.555    c1.525-19.631,4.976-16.729,5.194-34.28l2.768-8.309c3.192-26.611,0.507-35.196,18.872-31.203l4.463,0.392c13.517,0.615,31.208-2.174,41.591-7c22.358-10.376,35.618-27.7,13.573-23.148z'
          />
          <path d='M215.866,286.484c-1.385,49.516,0.348,99.377,5.193,111.495c4.848,12.118,15.223,35.688,50.9,28.045c29.806-6.39,40.651-18.756,45.357-46.051c3.466-20.082,10.148-75.854,11.005-87.281' />
          <path d='M173.104,38.256c0,0-161.521-66.016-154.012,84.109c1.597,31.938,45.779,241.664,98.473,178.316c19.256-23.166,36.671-41.335,36.671-41.335' />
          <path d='M260.349,26.207c-5.591,1.753,89.848-34.889,144.087,34.417c19.159,24.484-3.043,124.519-56.153,203.329' />
          <path
            style={{
              strokeLinejoin: 'bevel',
            }}
            d='M348.282,263.953c0,0,3.461,17.036,53.764,6.653c22.04-4.552,8.776,12.774-13.577,23.155c-18.345,8.514-59.474,10.696-60.146-1.069c-1.729-30.355,21.647-21.133,19.96-28.739c-1.525-6.85-11.979-13.573-18.894-30.338    c-6.037-14.633-82.796-126.849,21.287-110.183c3.813-0.789-27.146-99.002-124.553-100.599c-97.385-1.597-94.19,119.762-94.19,119.762'
          />
          <path d='M188.604,274.334c-13.577,15.166-9.584,17.829-36.723,23.417c-27.459,5.66-11.326,15.733-0.797,18.365c12.768,3.195,42.307,7.718,62.266-20.229c6.078-8.509-0.036-22.086-8.385-25.547c-4.034-1.671-9.428-3.765-16.361,3.994z' />
          <path d='M187.715,274.069c-1.368-8.917,2.93-19.528,7.536-31.942c6.922-18.626,22.893-37.255,10.117-96.339c-9.523-44.029-73.396-9.163-73.436-3.193c-0.039,5.968,2.889,30.26-1.067,58.548c-5.162,36.913,23.488,68.132,56.479,64.938' />
          <path
            style={{
              fill: '#FFFFFF',
              strokeWidth: '4.155',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
            }}
            d='M172.517,141.7c-0.288,2.039,3.733,7.48,8.976,8.207c5.234,0.73,9.714-3.522,9.998-5.559c0.284-2.039-3.732-4.285-8.977-5.015c-5.237-0.731-9.719,0.333-9.996,2.367z'
          />
          <path
            style={{
              fill: '#FFFFFF',
              strokeWidth: '2.0775',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
            }}
            d='M331.941,137.543c0.284,2.039-3.732,7.48-8.976,8.207c-5.238,0.73-9.718-3.522-10.005-5.559c-0.277-2.039,3.74-4.285,8.979-5.015c5.239-0.73,9.718,0.333,10.002,2.368z'
          />
          <path d='M350.676,123.432c0.863,15.994-3.445,26.888-3.988,43.914c-0.804,24.748,11.799,53.074-7.191,81.435' />
          <path strokeWidth='3' d='M0,60.232' />
        </g>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    description: 'A cloud platform for static sites and serverless functions.',
    logo: () => (
      <svg
        aria-label='Vercel logomark'
        height='64'
        role='img'
        viewBox='0 0 74 64'
        // style='width: auto; overflow: visible;'
      >
        <path
          d='M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z'
          fill='black'
        />
      </svg>
    ),
  },
  {
    name: 'Motion',
    description: 'A library for creating animations in React applications.',
    logo: () => (
      // <div className='w-full h-full p-2 rounded-lg flex items-center justify-center bg-[#fff312]'>
      <svg viewBox='0 0 24 9' className=''>
        <path
          d='M 9.062 0 L 4.32 8.992 L 0 8.992 L 3.703 1.971 C 4.277 0.882 5.709 0 6.902 0 Z M 19.656 2.248 C 19.656 1.006 20.623 0 21.816 0 C 23.009 0 23.976 1.006 23.976 2.248 C 23.976 3.49 23.009 4.496 21.816 4.496 C 20.623 4.496 19.656 3.49 19.656 2.248 Z M 9.872 0 L 14.192 0 L 9.45 8.992 L 5.13 8.992 Z M 14.974 0 L 19.294 0 L 15.592 7.021 C 15.018 8.11 13.585 8.992 12.392 8.992 L 10.232 8.992 Z'
          // fill='var(--token-6d6f97c3-5f4a-41b8-a7b9-eff3df1acd75, rgb(255, 243, 18))'
          className='fill-black'
        />
      </svg>
      // </div>
    ),
  },
  {
    name: 'Supabase',
    description:
      'An open-source Firebase alternative that provides a backend as a service.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='109'
        height='113'
        viewBox='0 0 109 113'
        fill='none'
      >
        <defs>
          <linearGradient
            id='paint0_linear'
            x1='53.9738'
            y1='54.974'
            x2='94.1635'
            y2='71.8295'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#249361' />
            <stop offset='1' stopColor='#3ECF8E' />
          </linearGradient>
          <linearGradient
            id='paint1_linear'
            x1='36.1558'
            y1='30.578'
            x2='54.4844'
            y2='65.0806'
            gradientUnits='userSpaceOnUse'
          >
            <stop />
            <stop offset='1' stopOpacity='0' />
          </linearGradient>
        </defs>
        <path
          d='M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z'
          fill='url(#paint0_linear)'
        />
        <path
          d='M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z'
          fill='url(#paint1_linear)'
          fillOpacity='0.2'
        />
        <path
          d='M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z'
          fill='#3ECF8E'
        />
      </svg>
    ),
  },
  {
    name: 'Expo',
    description: 'A framework and platform for universal React applications.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        width='800px'
        height='800px'
        viewBox='0 0 24 24'
        role='img'
      >
        <title>Expo icon</title>
        <path d='M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.248 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.798-9.092-17.078-.8-1.23-1.044-1.498-2.397-1.542h-1.032c-1.353.044-1.597.311-2.398 1.542C8.267 3.991.33 18.758 0 19.77Z' />
      </svg>
    ),
  },
]

const toolsItems: StackItem[] = [
  {
    name: 'Linear',
    description: 'A project management tool for software teams.',
    logo: () => (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        width='200'
        height='200'
        viewBox='0 0 100 100'
      >
        <path
          fill='#222326'
          d='M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z'
        />
      </svg>
    ),
  },
]

function bookMeetingButton() {
  return (
    <a
      className='flex items-center  gap-2 font-serif font-bold text-blue-600 uppercase duration-300 drop-shadow-lg drop-shadow-zinc-400 py-2 px-3 rounded-md shadow-2xl hover:text-shadow-amber-100 hover:text-shadow-sm text-shadow-none text-xl hover:drop-shadow-amber-500 transition-all'
      href='https://cal.com/misikoff/meeting'
      target='_blank'
      rel='noopener noreferrer'
      style={{
        // backgroundImage: 'linear-gradient(to right, #fbbf24, #f97316)',
        // use obsidian-background.png
        backgroundImage: 'url(/marble-background.png)',
      }}
    >
      Start a Conversation
    </a>
  )
}

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start text-center max-w-4xl'>
        <div className='dark:invert mx-auto'>
          <div className='relative w-44 h-44 -mt-32 -mb-8'>
            <Image
              className='mx-auto drop-shadow-blue-300 drop-shadow-lg'
              src='/logo-sphere.png'
              alt='Misikoff logo'
              fill={true}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
        </div>
        <h1 className='mx-auto font-serif text-4xl sm:text-5xl low tracking-[-.01em] text-center sm:text-left'>
          Tommy Misikoff
        </h1>
        <section className='flex flex-col gap-2 row-start-2 items-center text-center max-w-4xl w-full'>
          <h2 className='text-2xl tracking-[-.01em] text-center'>
            <span className='font-serif text-md italic whitespace-nowrap'>
              Sculpting Ideas.
            </span>{' '}
            <span className='font-mono font-bold  whitespace-nowrap'>
              Shaping
              <span className='font-normal  text-xs tracking-tightest'> </span>
              Code.
            </span>
          </h2>
          <p className='text-center max-w-xl'>
            Design-minded senior engineer with a passion for building{' '}
            <span className='md:whitespace-nowrap'>
              clear, intentional, and performant software.
            </span>
          </p>
        </section>
        <section className='flex flex-col gap-8 row-start-2 items-center text-center max-w-4xl w-full'>
          <SectionHeader className=''>About</SectionHeader>
          <p className='text-left max-w-xl'>
            I{"'"}m a senior engineer with a background in computer science and
            statistics, focused on clarity, UX, and rapid iteration.
          </p>
          {bookMeetingButton()}
        </section>
        <section className='mt-4 flex flex-col w-full gap-8 row-start-2 items-center sm:items-start text-center max-w-4xl'>
          <SectionHeader className=''>Selected Work</SectionHeader>
          <div className='grid grid-cols-1 w-full md:grid-cols-2 mx-auto place-items-center gap-4 md:gap-8'>
            <WorkCard
              title='Vercel Pricing Explorer'
              imagePath='/demo/vercel.png'
              Icon={VercelIcon}
            >
              <div className='text-gray-700 mt-2'>
                An interactive pricing calculator to explore how different
                features and usage levels affect your Vercel bill. Designed to
                model real-world usage across categories like bandwidth,
                function invocations, and edge middleware.
              </div>
              <div className='mt-6 space-y-2 text-sm text-gray-600'>
                <ul className='list-disc list-inside'>
                  <li>Dynamic sliders for request volume, image usage, etc.</li>
                  <li>Subtotals per feature category</li>
                  <li>Real-time cost updates</li>
                  <li>PostHog-inspired UX</li>
                </ul>
              </div>

              <br />
              <Link href='/portfolio/pricing/vercel'>
                <Button>Go To Calculator</Button>
              </Link>
            </WorkCard>
            <WorkCard
              title='Resume Generator'
              imagePath='/demo/resume.png'
              Icon={ResumeIcon}
            >
              This tool lets you structure and rearrange resume sections with
              intent—highlighting the skills and experiences most relevant to
              the job at hand. Define your work history, projects, and
              achievements, then generate custom resumes tailored for each
              application.
              <br />
              <div className='mt-6 space-y-2 text-sm text-gray-600'>
                <ul className='list-disc list-inside'>
                  <li>drag-and-drop reordering</li>
                  <li>toggles for sections and bullet points</li>
                  <li>live previews</li>
                  {/* <li>customizable templates</li> */}
                  <li>PDF exports</li>

                  {/* coming soon section about using ai to pick what to include */}
                  {/* section header */}
                  <div className='mt-4'>
                    <h4 className='font-semibold text-sm text-gray-700 mb-1'>
                      Coming Soon
                    </h4>
                  </div>
                  <li>
                    ✨ AI-powered suggestions for tailoring content to job
                    descriptions
                  </li>
                </ul>
                <br />
                <a
                  href='https://github.com/misikoff/misikoff.com#generating-your-own-resume'
                  target='_blank'
                >
                  <Button>View the README for more details</Button>
                </a>
              </div>
            </WorkCard>
            <WorkCard
              title='Snow Gale Labs'
              imagePath='/demo/SGL.png'
              category='SGL'
              Icon={SnowGaleLabsIcon}
            >
              <div className='space-y-2'>
                <p className='text-gray-600'>
                  I co-founded{' '}
                  <span className='font-mono font-bold'>Snow Gale Labs</span>, a
                  small, deliberate software studio focused on building tools
                  that sharpen thought, encourage discipline, and respect the
                  user
                  {"'"}s time. We create products in health, data, and
                  decision-making—crafted with restraint, philosophical roots,
                  and a preference for durability over scale.
                </p>
                <br />
                <a href='https://snowgalelabs.com' target='_blank'>
                  <Button>Check Out Snow Gale Labs</Button>
                </a>
              </div>
            </WorkCard>
            <WorkCard
              title='Toron'
              imagePath='/demo/Toron.png'
              category='SGL'
              Icon={ToronLogoIcon}
            >
              <div>
                Toron helps experienced lifters train with clarity and intent.
                It tracks reps, weight, and effort using RIR (Reps in Reserve),
                visualizes stagnation and recovery patterns, and avoids
                distractions like streaks or gamification. Designed to be
                minimalist, injury-conscious, and philosophically grounded,
                Toron is strength training—refined.
                <br />
                <br />
                <span className='italic'>
                  Toron is currently in private beta and undergoing web and iOS
                  development.
                </span>
              </div>
              <br />
              <a href='https://toron.snowgalelabs.com' target='_blank'>
                <Button>Check Out Toron</Button>
              </a>
            </WorkCard>
          </div>
        </section>
        <section className='flex flex-col gap-8 row-start-2 items-center sm:items-start text-center max-w-4xl w-full'>
          <SectionHeader className=''>Development Ethos</SectionHeader>
          <ul className='list-inside text-sm/6 text-left'>
            {developmentEthos.map((item) => (
              <div key={item.name}>
                {CoolListElement(item.name, item.description)}
              </div>
            ))}
          </ul>
        </section>

        <section className='flex flex-col gap-8 w-full row-start-2 items-center sm:items-start text-center max-w-4xl'>
          <SectionHeader className=''>Favorite Tools</SectionHeader>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
            {[...stackItems, ...toolsItems]
              .sort(() => Math.random() - 0.5)
              .map((item) => (
                <div
                  key={item.name}
                  className='flex flex-col items-center justify-center p-4 border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg'
                >
                  {/* <Image
                className='dark:invert'
                src={`/${item.name.toLowerCase()}.svg`}
                alt={`${item.name} logo`}
                width={40}
                height={40}
              /> */}
                  {item.logo && (
                    <div className='h-8 w-8 flex items-center justify-center'>
                      <item.logo />
                    </div>
                  )}

                  <h4 className='mt-2 font-bold'>{item.name}</h4>
                  {/* <p className='text-sm text-gray-500'>{item.description}</p> */}
                </div>
              ))}
          </div>
        </section>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <p className='text-md font-bold text-left'>
          Interested in working together? Let{"'"}s talk.
        </p>
        {bookMeetingButton()}
      </footer>
    </div>
  )
}
