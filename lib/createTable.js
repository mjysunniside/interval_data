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
    
  }