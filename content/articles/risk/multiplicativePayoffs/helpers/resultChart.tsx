import { useEffect, useState } from 'react'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
)

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const options = {
  responsive: true,
  // maintainAspectRatio: false,
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
          // TODO: handle singular and plural
          return `${context[0].label} Tosses`
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

export default function ResultChart({
  className = '',
  values,
}: {
  className?: string
  values: number[]
}) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const d = {
      datasets: [
        {
          label: 'Heads',
          data: Object.assign({}, values),
          backgroundColor: 'rgba(100, 101, 241, 1)',
        },
      ],
    }
    setData(d as any)
  }, [values])

  return (
    <div className={className}>
      {data && <Line options={options as any} data={data} />}
    </div>
  )
}
