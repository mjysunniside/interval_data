

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
    popupContainer.appendChild(header)
    let textArea = document.createElement('div')
    textArea.className = 'popup-text'
    popupContainer.appendChild(textArea)
    let title = document.createElement('div')
    title.className = 'popup-title'
    textArea.appendChild(title) 
    title.innerHTML = 'Error Title'
    let message = document.createElement('div')
    message.className = 'popup-message'
    textArea.appendChild(message) 
    message.innerHTML = 'error message containing a brief synopsis of the issue'
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