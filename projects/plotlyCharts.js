

document.addEventListener('DOMContentLoaded', (event) => {
    // Plot for 'lkrsstats'
    fetch('other/lakers_box_stats.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('lkrsstats', data.data, data.layout);
        });

    // Plot for 'myDiv2'
    fetch('other/lebron_season_stats.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('myDiv2', data.data, data.layout);
        });

    // Plot for 'myDiv3'
    fetch('other/lebron_point_breakdown.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('myDiv3', data.data, data.layout);
        });

    // Plot for 'myDiv1'
    fetch('other/lebron_won_lost.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('myDiv1', data.data, data.layout);
        });

    // Plot for 'myDiv'
    fetch('other/lebron_home_away.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('myDiv', data.data, data.layout);
        });
});
