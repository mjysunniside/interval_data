
  export function renderTable(structure) {
    let singleAnalysisDisplay = document.createElement('div')
    singleAnalysisDisplay.className = 'analysis-container'
    let singleTableArea = document.createElement('div')
    singleTableArea.className = 'table-container'
    document.querySelector('.table-area').appendChild(singleAnalysisDisplay)
    singleAnalysisDisplay.appendChild(singleTableArea)

    let table = document.createElement('table')
    singleTableArea.appendChild(table)
    let tableHeaderString = `<thead><tr><td colspan="3">Bill Date Ranges</td><td colspan="3">Net Energy Use (KWH)</td></tr><tr><td>Start Date</td><td>End Date</td><td>Season</td><td>On Peak</td><td>Off Peak</td><td>Total</td></tr></thead>`
    
    
    let bodyString = ``
    for(let monthly of structure.monthlies) {
      let rowString = `<tr><td>${monthly.month+1}/1/${monthly.year}</td><td>${monthly.month+1}/${monthly.endDate}/${monthly.year}</td><td>${monthly.season}</td><td>${Math.round(monthly.onPeak)}</td><td>${Math.round(monthly.offPeak)}</td><td>${Math.round(monthly.totalKWH)}</td></tr>`

      bodyString += rowString
    }
    let tableBody = `<tbody>${bodyString}</tbody>`
    //to footer as of now
    let fullTableString = tableHeaderString + tableBody
    table.innerHTML = fullTableString

    return singleAnalysisDisplay
  }