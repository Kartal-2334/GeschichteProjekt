
const migrationCtx = document.getElementById('migrationChart').getContext('2d');
new Chart(migrationCtx, {
  type: 'line',
  data: {
    labels: [2015,2016,2017,2018,2019,2020,2021,2022,2023],
    datasets: [{
      label: 'Zuzüge',
      data: [2137000,1865000,1550721,1585112,1558612,null,null,2481000,1932509],
      borderColor: '#3498db',
      tension: 0.3,
      fill: true,
      spanGaps: true
    },{
      label: 'Fortzüge',
      data: [998000,1365178,1134641,1185432,1231552,null,null,null,1269545],
      borderColor: '#e74c3c',
      tension: 0.3,
      fill: false,
      spanGaps: true
    }]
  },
  options: { 
    plugins:{title:{display:true,text:'Migration nach Deutschland 2015–2023'}},
    scales:{y:{title:{display:true,text:'Anzahl Personen'}}}
  }
});

const integrationCtx = document.getElementById('integrationChart').getContext('2d');
new Chart(integrationCtx, {
  type: 'bar',
  data: {
    labels: [2015,2016,2017,2018,2019,2020,2021,2022,2023],
    datasets: [{
      label: 'Erwerbstätige (Mio.)',
      data: [7.3,7.8,8.2,8.5,8.9,9.2,9.5,9.8,10.0],
      backgroundColor: '#3498db'
    }]
  },
  options: {
    plugins:{title:{display:true,text:'Erwerbstätige mit Migrationshintergrund 2015–2023'}},
    scales:{y:{title:{display:true,text:'Millionen Personen'}}}
  }
});
