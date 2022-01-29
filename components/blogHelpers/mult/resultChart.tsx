import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { useEffect, useState } from 'react'

const nfObject = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function ResultChart({
  className = '',
  values,
}: {
  className?: string
  values: number[]
}) {
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    let baseChartOptions = {
      lang: {
        thousandsSep: ',',
      },
      chart: {
        type: 'line',
      },
      title: {
        text: '',
      },
      series: [
        {
          showInLegend: false,
          data: values,
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
          return this.x + ' tosses <br />' + nfObject.format(this.y)
        },
      },
    }
    setChartOptions(baseChartOptions)
  }, [values])

  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}
