import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip)

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      text: 'Payoff For Getting X Heads',
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: function (context: any) {
          return `${context[0].label} Heads`
        },
        label: function (context: any) {
          return nfObject.format(context.parsed.y)
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (label: number) {
          const x = '$' + label / 1000 + 'k'
          return x //nfObject.format(label.toFixed(0))
        },
      },
    },
  },
}

export default function PayoffChart({
  className = '',
  results,
}: {
  className?: string
  results: number[]
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const d = {
      datasets: [
        {
          label: 'Heads',
          data: Object.assign({}, results),
          backgroundColor: 'rgba(100, 101, 241, 1)',
        },
      ],
    }
    setData(d as any)
  }, [results])

  return (
    <div className={className}>
      {data && <Bar options={options as any} data={data} />}
    </div>
  )
}
