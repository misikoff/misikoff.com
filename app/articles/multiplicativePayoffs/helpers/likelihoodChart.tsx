import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { useEffect, useState } from 'react'

export default function LikelihoodChart({
  className = '',
  probabilities,
}: {
  className?: string
  probabilities: number[]
}) {
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    let baseChartOptions = {
      chart: {
        type: 'areaspline',
      },
      title: {
        text: 'Likelihood Of Getting X Heads',
      },
      series: [
        {
          showInLegend: false,
          color: '#6465f1',
          data: probabilities.map((p) => {
            return 100 * p
          }),
        },
      ],
      yAxis: {
        labels: {
          // eslint-disable-next-line no-template-curly-in-string
          format: '{value}%',
        },
        title: null,
      },
      tooltip: {
        formatter(): string {
          // @ts-ignore
          return this.x + ' heads <br />' + this.y.toFixed(2) + '%'
        },
      },
    }
    setChartOptions(baseChartOptions)
  }, [probabilities])

  return (
    <HighchartsReact
      containerProps={{ className }}
      highcharts={Highcharts}
      options={chartOptions}
    />
  )
}
