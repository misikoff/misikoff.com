import { useEffect, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function PayoffChart({
  className = '',
  results,
}: {
  className?: string
  results: number[]
}) {
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    let baseChartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Payoff For Getting X Heads',
      },
      series: [
        {
          showInLegend: false,
          data: results,
          color: '#6465f1',
        },
      ],
      yAxis: {
        labels: {
          // eslint-disable-next-line no-template-curly-in-string
          format: '${value:,.0f}',
        },
        title: null,
      },
      tooltip: {
        formatter(): string {
          // @ts-ignore
          return this.x + ' heads <br />' + nfObject.format(this.y)
        },
      },
    }
    setChartOptions(baseChartOptions)
  }, [results])

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}
