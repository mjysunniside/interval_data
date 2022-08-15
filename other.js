import { readFilePromise } from "./lib/readSingleFile.js"
import { parseXML as parseXMLNew, createIntervalsXML } from "./lib/parseXML.js"
import { createTable, renderTable } from "./lib/createTable.js"
import { Structure } from "./lib/Structure.js"
import { Rate } from "./lib/Rate.js"


const button = document.querySelector('button')
const fileInput = document.getElementById('file-input')
const tableArea = document.querySelector('.table-area')

const testButton = document.querySelector('.button-test')
testButton.addEventListener('click', testMain)

async function testMain() {
  try {
    let file = fileInput.files[0]
    let fileRead = await readFilePromise(file)
    let rate = new Rate('E-TOU-C')
    let universalStructure = new Structure(rate)
    //xml case
    if(fileRead.type === 'xml'){
      let xmlDoc = await parseXMLNew(fileRead.contents)
      console.log(xmlDoc)
      //large array of interval objects to streamline this for efficiency i should not be adding an extra create structure step
      let intervalArray = createIntervalsXML(xmlDoc)
      // filter intervalArray by month to get monthly values in universalStructure
      for(let i=0 ; i<=11 ; i++) {
        let monthArray = intervalArray.filter(interval => {
          return interval.timeStamp.getMonth() === i
        })
        universalStructure.addMonth(monthArray)
      }
    }
    //csv case
    if(fileRead.type === 'csv') {

    }
    //now we have the structure
    renderTable(universalStructure)
    
  } catch (error) {
    console.log(error)
  }
  
}

button.addEventListener('click', readSingleFile)



function main(xmlParsed) {
  //logging for testing purposes
  console.log(xmlParsed)
  //setting some useful variables
  const address = xmlParsed.getElementsByTagName('entry')[0].getElementsByTagName('title')[0].textContent;
  const intervalTotal = xmlParsed.getElementsByTagName('interval')[0]
  const intervalReadings = xmlParsed.getElementsByTagName('IntervalReading')
  const iterableReadings = [...intervalReadings]
  const intervalDurationInMin = (intervalReadings[0].getElementsByTagName('duration')[0].textContent)/60
  //I think the values are in Wh so dividing by 1000 for kWh
  let intervalsParsed = iterableReadings.map(intervalReading => {
    return ({
    timeStamp: new Date((intervalReading.getElementsByTagName('start')[0].textContent)*1000),
    cost: Number(intervalReading.getElementsByTagName('cost')[0].textContent)/1000,
    valueKWH: Number(intervalReading.getElementsByTagName('value')[0].textContent)/1000
    })
  })

  let peakStart = 15
  let peakEnd = 20
  let total = 0
  let winter = 0
  let summer = 0
  let onPeak = 0
  let offPeak = 0
  let monthlies = []
  for(i=0 ; i<12 ; i++) {
    monthlies.push({
      total: 0,
      onPeak: 0,
      offPeak: 0
    })
  }

  // for(interval of intervalsParsed) {
  //   let usage = interval.valueKWH
  //   let month = interval.timeStamp.getMonth()
  //   let hour = interval.timeStamp.getHours()
  //   total += usage
  //   if(month>=5 && month<=8) {
  //     summer += usage
  //     if(hour>=15 && hour<20) {
  //       onPeak += usage
  //     } else {
  //       offPeak += usage
  //     }
  //   } else {
  //     winter += usage
  //     if(hour>=15 && hour<20) {
  //       onPeak += usage
  //     } else {
  //       offPeak += usage
  //     }
  //   }
  // }


  for(interval of intervalsParsed) {
    let usage = interval.valueKWH
    let month = interval.timeStamp.getMonth()
    let hour = interval.timeStamp.getHours()
    let onPeak = hour>=peakStart && hour<peakEnd
    monthlies[month].total += usage
    if(onPeak) {
      monthlies[month].onPeak += usage
    } else {
      monthlies[month].offPeak += usage
    }
  }

  for(month of monthlies) {
    total+=month.total
    onPeak+=month.onPeak
    offPeak+=month.offPeak
  }

  createTable(monthlies)
  
  //console.log(`total: ${total} \t winter: ${winter} \t summer: ${summer}`);
  console.log(`on peak: ${onPeak} \t off peak: ${offPeak} \t total: ${total}`)
  
  
}


function readSingleFile() {
  let file = fileInput.files[0]
  if(!file) {
    alert('No File!!!')
  }
  
  let reader = new FileReader()
  reader.onload = function(e) {
    let contents = e.target.result
    if(file.type === 'text/xml') {
      parseXML(contents)
    }
  }
  reader.readAsText(file)
}

function parseXML(xmlContent) {
  let parser = new DOMParser()
  let xmlDoc = parser.parseFromString(xmlContent, 'application/xml')
  main(xmlDoc)
}






