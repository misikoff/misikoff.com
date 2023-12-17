import type { Metadata } from 'next'

import Hexagon from '@/components/blocks/hexagon'
import HexagonGrid from '@/components/blocks/hexagonGrid'
import HexagonGridAbsol from '@/components/blocks/hexagonGridAbsol'
import Spotlight from '@/components/blocks/spotlight'

export const metadata: Metadata = {
  title: 'Blocks - Misikoff',
}

const blocks = [
  {
    name: 'Spotlight',
    component: Spotlight,
    options: { className: '' },
  },
  {
    name: 'Hexagon',
    component: Hexagon,
    options: {
      className:
        'h-8 w-8 transform fill-blue-400 duration-200 ease-in-out hover:rotate-90',
    },
  },

  {
    name: 'HexagonGridAbsol',
    component: HexagonGridAbsol,
    options: { className: '', rows: 10, cols: 20 },
  },
  {
    name: 'HexagonGrid',
    component: HexagonGrid,
    options: { className: '', rows: 8, cols: 13 },
  },
]

export default function BlockPage() {
  return (
    <div>
      🚧
      {blocks.map((block) => (
        <div key={block.name} className='border-2 border-gray-500 rounded-md'>
          <block.component {...block.options} />
        </div>
      ))}
    </div>
  )
}
