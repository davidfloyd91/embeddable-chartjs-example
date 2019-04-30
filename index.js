document.addEventListener('DOMContentLoaded', e => {
  let chart, code, data, decircularizedData;
  const lineChart = document.querySelector('#lineChart');
  const embedCode = document.querySelector('#embedCode');
  const ctx = lineChart.getContext('2d');

  const configObj = {
    chartData: '1,2,3,4',
    color: 'blue',
    labels: 'Mar,Jun,Sep,Dec',
    max: '5',
    min: '0',
    ticks: '1',
    title: '$$$$',
    xLabel: 'month',
    yLabel: 'trillion USD'
  };

  const convertToEmbedCode = data => {
    return JSON.stringify(data)
    .replace(/'/g, '\\\'')
    .replace(/"/g, '\'')
    .replace('_datasets', 'datasets');
  };

  document.addEventListener('submit', e => e.preventDefault());

  document.addEventListener('input', e => {
    if (typeof chart !== 'undefined') {
      chart.destroy();
    };

    configObj[e.target.name] = e.target.value;

    data = {
      type: 'line',
      data: {
        labels: (configObj.labels ? configObj.labels.split(',') : ['Mar', 'Jun', 'Sep', 'Dec']),
        datasets: [
          {
            fill: false,
            data: (configObj.chartData ? configObj.chartData.split(',') : ['1', '2', '3', '4']),
            borderColor: (configObj.color ? configObj.color : 'blue'),
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
            text: (configObj.title ? configObj.title : '$$$$')
        },
        scales: {
          yAxes: [{
            ticks: {
              min: (configObj.min ? parseFloat(configObj.min) : 0),
              max: (configObj.max ? parseFloat(configObj.max) : 5),
              stepSize: (configObj.ticks ? parseFloat(configObj.ticks) : 1)
            },
            scaleLabel: {
              display: true,
              labelString: (configObj.yLabel ? configObj.yLabel : 'trillion USD')
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: (configObj.xLabel ? configObj.xLabel : 'month')
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

    embedCode.value = `<iframe srcdoc="<div id='embed_container'></div><script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js' crossorigin></script><canvas id='salp-chart' width='740px' height='540px'></canvas><script>new Chart(document.getElementById('salp-chart'),${code});</script>" width="740px" height="545px"></iframe>`
  });
});
