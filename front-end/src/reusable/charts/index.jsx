import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js/auto'

class Charts extends Component {
  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
    this.chart = null
  }

  componentDidMount = () => {
    const { data, type, label, title, colors } = this.props

    const ctx = this.chartRef.current.getContext('2d')
    const options = {
      type: type,
      data: {
        datasets: [
          {
            label: label,
            backgroundColor: colors,
            data: data,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: title,
          },
          legend: {
            display: false,
          },
          animation: {
            duration: 1000,
            xAxis: true,
            yAxis: true,
          },
          responsive: true,
        },
      },
    }

    this.chart = new Chart(ctx, options)
  }

  componentWillUnmount = () => {
    this.chart.destroy()
  }

  render() {
    return <canvas id='myChart' ref={this.chartRef} />
  }
}

Charts.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
}

export default Charts
