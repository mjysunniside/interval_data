export function createTable(monthlyData) {
    const table = document.createElement('table')
    
    //table.style.borderCollapse = collapse
    const head = document.createElement('thead')
    const body = document.createElement('tbody')
    //head is standard
    //top row
    const topHeadRow = document.createElement('tr')
    let dateHeader = document.createElement('td')
    dateHeader.colSpan = "3"
    dateHeader.innerHTML = "Bill Date Ranges"
    let energyUseHeader = document.createElement('td')
    energyUseHeader.colSpan = "2"
    energyUseHeader.innerHTML = "Net Energy Use (kWh)"
    topHeadRow.appendChild(dateHeader)
    topHeadRow.appendChild(energyUseHeader)
    head.appendChild(topHeadRow)
    //second header row
    const secondHeadRow = document.createElement('tr')
    let startHeader = document.createElement('td')
    startHeader.innerHTML = "Start Date"
    secondHeadRow.appendChild(startHeader)
    let endHeader = document.createElement('td')
    endHeader.innerHTML = "End Date"
    secondHeadRow.appendChild(endHeader)
    let seasonHeader = document.createElement('td')
    seasonHeader.innerHTML = "Season"
    secondHeadRow.appendChild(seasonHeader)
    head.appendChild(secondHeadRow)
  
    for(i=0 ; i<monthlyData.length ; i++) {
      let month = i+1
      let usageRow = document.createElement('tr')
      
      let startDate = document.createElement('td')
      startDate.innerHTML = `${month}/1/2022`
      usageRow.appendChild(startDate)
      
      let endDate = document.createElement('td')
      endDate.innerHTML = `${month}/31/2022`
      usageRow.appendChild(endDate)
  
      let season = document.createElement('td')
      if(month>=5 && month<=8) {
        season.innerHTML = 'S'
      } else {
        season.innerHTML = 'W'
      }
      usageRow.appendChild(season)
      body.appendChild(usageRow) 
    }
    
  
    table.appendChild(head)
    table.appendChild(body)
    tableArea.appendChild(table)
  }

  export function renderTable(structure) {
    let table = document.createElement('table')
    document.querySelector('.table-area').appendChild(table)
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

  }