
// const date = new Date(1627196400*1000)

// const dString = date.toLocaleString()

// console.log(dString);

const submitButton = document.getElementById('submit')
const fileButton = document.getElementById('myFile')

submitButton.addEventListener('click', main)




async function main() {
    getFile()
    
}

async function getFile() {
    if(fileButton.files.length === 0) {
        alert('No Files!!')
        return 
    }
    let file = fileButton.files[0]
    let type = file.type
    let reader = new FileReader()
    
    if(type === 'text/xml') {
        console.log(type)
        reader.onload = function(e) {
            let readXml = e.target.result
            console.log(readXml);
            let parser = new DOMParser()
            let xmlDoc = parser.parseFromString(readXml, 'application/xml')
            console.log(xmlDoc)
        }
    } else {
        console.log('else');
    }

}

// function xmlParse(file) {
//     let parser = new DOMParser()
//         // xmlDoc = parser.parseFromString(file, 'text/xml')
//         xmlDoc = parser.xmlParse(file)
//     console.log(xmlDoc);
// }









// var readXml=null;
//        $('#xmlForm').submit(function(event) {
//            event.preventDefault();
//            var selectedFile = document.getElementById('input').files[0];
//            console.log(selectedFile);
//            var reader = new FileReader();
//            reader.onload = function(e) {
//                readXml=e.target.result;
//                console.log(readXml);
//                var parser = new DOMParser();
//                var doc = parser.parseFromString(readXml, "application/xml");
//                console.log(doc);
//            }
//            reader.readAsText(selectedFile);

//        });