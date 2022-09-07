export default function makeChart(){const vizContainer = document.querySelector('.container')

let total = 100
let onPeak = 33
let offPeak = 66

let data = {onPeak, offPeak}

let width = 450
let height = 450
let margin = 40

let radius = Math.min(width, height) / 2 - margin

let svg = d3.select(vizContainer)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width/2}, ${height /2})`)

const color = d3.scaleOrdinal()
    .range(d3.schemeSet2)


const pie = d3.pie()
    .value(function(d) {return d[1]})

const data_ready = pie(Object.entries(data))

const arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)


svg
    .selectAll('mySlices')
    .data(data_ready)
    .join('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data[0])) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)


svg
    .selectAll('mySlices')
    .data(data_ready)
    .join('text')
    .text(function(d){ 
        let text = d.data[0]
        let percentage = d.data[1]
        console.log(d.data)
        if(text === 'onPeak') {
            return 'On Peak' + `(${percentage}%)`
        } else {
            return 'Off Peak' + `(${percentage}%)`
        }
    })
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
        .style("text-anchor", "middle")
        .style("font-size", 17)
}