

export function createCornerPopup(messageObject) {
    if(document.querySelector('.popup')) {
        removeCornerPopup()
    }
    let popupContainer = document.createElement('div')
    popupContainer.className = 'popup'
    let closeButton = document.createElement('div')
    closeButton.className = 'close'
    closeButton.innerHTML = '&times'
    closeButton.addEventListener('click', removeCornerPopup)
    popupContainer.appendChild(closeButton)
    let header = document.createElement('div')
    header.className = 'header'
    header.innerText = messageObject
    popupContainer.appendChild(header)
    document.body.appendChild(popupContainer)
    setTimeout(cornerPopupSequence , 10000)
}

export function removeCornerPopup() {
    let popup = document.querySelector('.popup')
    popup.remove()
} 

function cornerPopupSequence() {
    

    if(document.querySelector('.popup')) {
        removeCornerPopup()
    }
}