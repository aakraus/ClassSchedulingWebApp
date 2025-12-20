// D3 heatmap, Chart.js bar, Top 5 best candiadates, etc. go here

let barChart;
const dayOrder = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const timeLabel = (m) => {
    const h = Math.floor(m/60), mm=String(m%60).padStart(2,'0');
    const ampm = h >= 12 ? "PM" : "AM"; 
    const hh = ((h+11)%12)+1; 
    return `${hh}:${mm} ${ampm}`;
};

export function clearCharts() {
    // export function for clearing all charts
    if (barChart) { barChart.destroy(); barChart = null; }
    d3.select('#heatmap').selectAll('*').remove();
    document.getElementById('topSlots').innerHTML = '';
}

export function renderAll({ timeAxis, days, matrix }, state) {
    // export function for visualization rendering
    renderBar(timeAxis, days, matrix);
    renderHeatmap(timeAxis, days, matrix);
    renderTop5(timeAxis, days, matrix);
}

function renderBar(timeAxis, days, matrix, state) {
    // x-axis labels
    const labels = timeAxis.map(timeLabel);

    // sum conflicts across day dimension
    const series = matrix.reduce(
        (acc, row) => acc.map((v, i) => v + row[i]), 
        Array(timeAxis.length).fill(0)
    );

    // destroy previous bar chart before rendering new one
    if (barChart) barChart.destroy();

    // render bar chart
    const ctx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: 'All selected days', data: series }] },
        options: {
            responsive: true,
            plugins: { legend: { display: true } },
            scales: { x: { ticks: { maxRotation: 0 } } }
        }
    });
}

function renderHeatmap(timeAxis, days, matrix) {
    // render heatmap
    const svg = d3.select('#heatmap');
    svg.selectAll('*').remove();

    // constants: width, height, margins, displacement
    const w = +svg.attr('width');
    const h = +svg.attr('height');
    const m = { top: 24, right: 12, bottom: 40, left: 70 };
    const iw = w - m.left - m.right;
    const ih = h - m.top - m.bottom;

    const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

    // constants: axis labels and band scales (match labels to equally sized bands)
    const xLabels = timeAxis.map(timeLabel);
    const x = d3.scaleBand().domain(xLabels).range([0, iw]).padding(0.02);
    const y = d3.scaleBand().domain(days).range([0, ih]).padding(0.02);

    // flatten matrix into a list of cell objects for D3 binding
    const flat = [];
    days.forEach((d, di) => {
        timeAxis.forEach((t, ti) => flat.push({ day: d, time: timeLabel(t), value: matrix[di][ti] }));
    });

    // map numeric values to color
    const maxV = d3.max(flat, d => d.value) || 1;
    const color = d3.scaleSequential(d3.interpolateYlGnBu).domain([0, maxV]);

    // draw rectangles for each cell
    g.selectAll('rect').data(flat).enter().append('rect')
        .attr('x', d => x(d.time))
        .attr('y', d => y(d.day))
        .attr('width', x.bandwidth())
        .attr('height', y.bandwidth())
        .attr('fill', d => color(d.value))
        .append('title').text(d => `${d.day} ${d.time}: ${d.value}`);

    // add axes
    const xticks = x.domain().filter((_, i) => i % 2 === 0);
    g.append('g')
        .attr('transform', `translate(0,${ih})`)
        .call(d3.axisBottom(x).tickValues(xticks))
        .selectAll('text')
        .style('font-size','10px');

    g.append('g')
        .call(d3.axisLeft(y))
        .selectAll('text')
        .style('font-size','11px');
}

function renderTop5(timeAxis, days, matrix) {
    // build list with scores
    const scored = [];
    days.forEach((d, di) => {
        timeAxis.forEach((t, ti) => {
            scored.push({ day: d, time: t, score: matrix[di][ti] });
        });
    });

    // sort ascending by score (lowest conflicts first)
    scored.sort((a, b) => a.score - b.score);

    // render top 5 list
    const html = `
        <h3>Top 5 suggested slots</h3>
        <ol>
            ${scored.slice(0, 5).map(s =>
                `<li>${s.day} ${labelTime(s.time)} — score ${s.score}</li>`
            ).join('')}
        </ol>
    `;
  document.getElementById('topSlots').innerHTML = html;
}