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

const options = {
  responsive: true,
  plugins: {
    legend: false,
    title: {
      display: true,
      text: 'Likelihood Of Getting X Heads',
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: function (context: any) {
          return `${context[0].label} Heads`
        },
        label: function (context: any) {
          return context.parsed.y.toFixed(2) + '%'
        },
      },
    },
  },
  scales: {
    y: {
      ticks: {
        callback: function (label: number) {
          return label.toFixed(0) + '%'
        },
      },
    },
  },
}

export default function LikelihoodChart({
  className = '',
  probabilities,
}: {
  className?: string
  probabilities: number[]
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const d = {
      datasets: [
        {
          label: 'Heads',
          data: Object.assign(
            {},
            probabilities.map((p) => {
              return p * 100
            })
          ),
          backgroundColor: 'rgba(100, 101, 241, 1)',
        },
      ],
    }
    setData(d as any)
  }, [probabilities])

  return (
    <div className={className}>
      {data && <Bar options={options as any} data={data} />}
    </div>
  )
}
