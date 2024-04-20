document.addEventListener('DOMContentLoaded', (event) => {
    fetch('other/lakers_box_stats.json')
        .then(response => response.json())
        .then(data => {
            Plotly.newPlot('lkrsstats', data.data, data.layout);
        });
    // Repeat for other charts
});