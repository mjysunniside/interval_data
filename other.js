const button = document.querySelector('button')
const fileInput = document.getElementById('file-input')

button.addEventListener('click', readSingleFile)



function main(xmlParsed) {
  console.log(xmlParsed)
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



