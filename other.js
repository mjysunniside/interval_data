import { readFilePromise } from "./lib/readSingleFile.js"
import { parseXML, createIntervalsXML } from "./lib/parseXML.js"
import { createTable, renderTable } from "./lib/createTable.js"
import { Structure } from "./lib/Structure.js"
import { Rate } from "./lib/Rate.js"
import { findHeaders, createIntervalsCSV } from "./lib/parseCSV.js"


const button = document.querySelector('button')
const fileInput = document.getElementById('file-input')
const tableArea = document.querySelector('.table-area')

const runButton = document.querySelector('.button')
runButton.addEventListener('click', main)

async function main() {
  try {
    let file = fileInput.files[0]
    let fileRead = await readFilePromise(file)
    let rate = new Rate('E-TOU-C')
    let universalStructure = new Structure(rate)
    //xml case
    if(fileRead.type === 'xml'){
      let xmlDoc = await parseXML(fileRead.contents)
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
      let initialSplit = findHeaders(fileRead.contents)
      let intervalArray = createIntervalsCSV(initialSplit.data)
      //not sure why this is happening more tests needed
      let undefinedLastItem = intervalArray.pop()
      console.log(undefinedLastItem)
      
      for(let i=0 ; i<=11 ; i++) {
        let monthArray = intervalArray.filter(interval => {
          return interval.timeStamp.getMonth() === i
        })
        universalStructure.addMonth(monthArray)
      }
      
    }
    //now we have the structure
    renderTable(universalStructure)
    
  } catch (error) {
    console.log(error)
  }
  
}










