document.querySelector('.button').addEventListener('click', loadXML)

function loadXML(callback) {
    
    let xml = fetch('./usage_data/pge_electric_interval_data_8285320756_2021-07-25_to_2022-07-25 - Rieger_ns.xml')
        .then(function(response) {
            return response.text()
        })
        .then(function(data) {
            let parser = new DOMParser()
             xmlDoc = parser.parseFromString(data, 'application/xml')
             console.log(xmlDoc);
            let entries = xmlDoc.getElementsByTagName('entry')
            let address = entries[0].getElementsByTagName('title')[0].textContent
            let totalInterval = xmlDoc.getElementsByTagName('interval')[0]
            let readings = xmlDoc.getElementsByTagName('IntervalReading')
            //console.log();
        })
        .catch(function(err) {
            console.log(err)
        })
        
    
}

function loadCallback(xml) {
    console.log(xml)
}

