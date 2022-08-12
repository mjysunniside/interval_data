export function readFilePromise(file) { 
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function(e) {
            let contents = e.target.result
            if(file.type === 'text/xml') {
                resolve({
                    contents,
                    type: 'xml'
                })
            }
            if(file.type == 'text/csv') {
                resolve({
                    contents,
                    type: 'csv'
                })
            }
        }
        reader.onerror = (e) => reject(e)
        reader.readAsText(file)
    })
}


