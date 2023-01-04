export function createPieChart(structure, div) {
    let pieArea = createPieArea(div, structure.rate.rate)

    

    makeSinglePieChart(pieArea.summerContainer, structure.getPercentages('S'))
    makeSinglePieChart(pieArea.winterContainer, structure.getPercentages('W'))
}

function createPieArea(div, rateName) {
    let pieDiv = document.createElement('div')
    pieDiv.className = 'pie-container'
    div.appendChild(pieDiv)
    let header = document.createElement('h2')
    header.innerHTML = `Percentage Breakdown (${rateName})`
    pieDiv.appendChild(header)

    let summerContainer = document.createElement('div')
    summerContainer.classList = 'summer-container'
    pieDiv.appendChild(summerContainer)
    let headerSummer = document.createElement('h3')
    headerSummer.innerHTML = 'Summer'
    summerContainer.appendChild(headerSummer)


    let winterContainer = document.createElement('div')
    winterContainer.classList = 'winter-container'
    pieDiv.appendChild(winterContainer)
    let headerWinter = document.createElement('h3')
    headerWinter.innerHTML = 'Winter'
    winterContainer.appendChild(headerWinter)

    return {summerContainer, winterContainer}
}

function makeSinglePieChart(div, data) {
    let height = 300
    let width = 300
    let margin = 10
    

    let radius = Math.min(width, height) / 2 - margin

    let svg = d3.select(div)
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