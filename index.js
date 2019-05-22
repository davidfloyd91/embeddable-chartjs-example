document.addEventListener('DOMContentLoaded', e => {
  let chart, code, data, decircularizedData;
  const lineChart = document.querySelector('#lineChart');
  const embedCode = document.querySelector('#embedCode');
  const ctx = lineChart.getContext('2d');

  const convertToEmbedCode = data => {
    return JSON.stringify(data)
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\'')
    .replace('_datasets', 'datasets');
  };

  data = {
    type: 'line',
    data: {
      labels: ['Mar', 'Jun', 'Sep', 'Dec'],
      datasets: [
        {
          fill: false,
          data: ['1', '2', '3', '4'],
          borderColor: ('blue'),
          lineTension: 0.3,
          pointRadius: 3
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      title: {
          display: true,
          text: '$$$$'
      },
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 5,
            stepSize: 1
          },
          scaleLabel: {
            display: true,
            labelString: 'trillion USD'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'month'
          }
        }]
      }
    }
  };

  decircularizedData = _.cloneDeep(data);
  const datasets = decircularizedData.data.datasets;
  delete decircularizedData.data.datasets;
  decircularizedData.data._datasets = datasets;

  code = convertToEmbedCode(decircularizedData);

  chart = new Chart(ctx, data);

  embedCode.value = `<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart'></canvas><script>new Chart(document.getElementById('salp-chart'),${code});</script>`
});
