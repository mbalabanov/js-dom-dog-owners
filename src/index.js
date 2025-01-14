const ALL_DOG_CARDS = {}
const DOGS_MENU = document.querySelector('.dogs-list')
const MAIN_SECTION = document.querySelector('main')
const ADD_DOG_BUTTON = document.querySelector('.dogs-list__button--add')

setUpApp()

function setUpApp() {
  for (const DOG of data) {
    generateMenuItem(DOG.id, DOG.name, 'append')
    ALL_DOG_CARDS[DOG.id] = generateDogCard(DOG.id, DOG.name, DOG.image, DOG.bio, DOG.isGoodDog)
  }
  addEventlistenersToAddDogButton()
}

function generateMenuItem(dogId, dogName, prependOrAppend) {
  const MENU_ITEM = document.createElement('li')
  MENU_ITEM.setAttribute('id', dogId)
  MENU_ITEM.setAttribute('class', 'dogs-list__button')
  MENU_ITEM.innerText = dogName

  if ( prependOrAppend === 'append' ) {
    DOGS_MENU.appendChild(MENU_ITEM)
  } else if ( prependOrAppend === 'prepend' ) {
    ADD_DOG_BUTTON.after(MENU_ITEM, '')
  }

  addEventlistenersToMenuItem(dogId)
}

function addEventlistenersToMenuItem(dogId) {
  document.getElementById(dogId).addEventListener("click", function () {
    replaceCard(this.id)
    addEventListenerToNaughtyButtonOfThisCard(this.id)
  });
}

function addEventlistenersToAddDogButton() {
  ADD_DOG_BUTTON.addEventListener("click", function () {
    document.querySelector('.main__dog-section').remove()
    MAIN_SECTION.appendChild(generateForm())
    addEventListenerToFormSubmitButton()
  });
}

function replaceCard(thisId) {
  document.querySelector('.main__dog-section').remove()
  MAIN_SECTION.appendChild(ALL_DOG_CARDS[thisId])
}

function generateDogCard(dogId, dogName, dogImagePath, dogBio, isGoodDog) {
  const DOG_CARD = document.createElement('section')
  DOG_CARD.setAttribute('class', 'main__dog-section')

  const BOOL_STRING = isGoodDog.toString()

  DOG_CARD.appendChild(generateCardHeading(dogName))
  DOG_CARD.appendChild(generateDogImage(dogImagePath, dogName))
  DOG_CARD.appendChild(generateBioSection(dogBio))
  DOG_CARD.appendChild(generateNaughtyLabel(BOOL_STRING))
  DOG_CARD.appendChild(generateNaughtyButton(dogId, BOOL_STRING))

  return DOG_CARD
}

function generateCardHeading(dogName) {
  const DOG_HEADING = document.createElement('h2')
  const DOG_HEADING_TITLE_NODE = document.createTextNode(dogName);
  DOG_HEADING.appendChild(DOG_HEADING_TITLE_NODE)

  return DOG_HEADING
}

function generateDogImage(dogImagePath, dogName) {
  const DOG_IMAGE = document.createElement('img')
  DOG_IMAGE.setAttribute('alt', dogName)
  DOG_IMAGE.setAttribute('src', dogImagePath)

  return DOG_IMAGE
}

function generateBioSection(dogBio) {
  const DOG_BIO_SECTION = document.createElement('div')
  DOG_BIO_SECTION.setAttribute('class', 'main__dog-section__desc')

  const DOG_BIO_TITLE = document.createElement('h3')
  const BIO_TITLE_NODE = document.createTextNode('Bio');
  DOG_BIO_TITLE.appendChild(BIO_TITLE_NODE)

  const DOG_BIO_MAIN_TEXT = document.createElement('p')
  const BIO_TEXT_NODE = document.createTextNode(dogBio);
  DOG_BIO_MAIN_TEXT.appendChild(BIO_TEXT_NODE)

  DOG_BIO_SECTION.appendChild(DOG_BIO_TITLE)
  DOG_BIO_SECTION.appendChild(DOG_BIO_MAIN_TEXT)

  return DOG_BIO_SECTION
}

function generateNaughtyLabel(isGoodDog) {
  const NAUGHTY_LABEL = document.createElement('p')
  NAUGHTY_LABEL.setAttribute('class', 'naughtyGoodStatus')
  const NAUGHTY_TEXT_NODE = document.createTextNode('Is naughty?');
  const NAUGHTY_EM = document.createElement('em')
  const NAUGHTY_STATUS_SPAN = document.createElement('span')
  NAUGHTY_STATUS_SPAN.setAttribute('class', 'naughtyGoodStatus')
  const NAUGHTY_STATUS_NODE = document.createTextNode(naughtyStatus(isGoodDog));
  NAUGHTY_STATUS_SPAN.appendChild(NAUGHTY_STATUS_NODE)
  const NAUGHTY_STATUS_SPACE = document.createTextNode(' ');
  NAUGHTY_EM.appendChild(NAUGHTY_TEXT_NODE)
  NAUGHTY_LABEL.appendChild(NAUGHTY_EM)
  NAUGHTY_LABEL.appendChild(NAUGHTY_STATUS_SPACE)
  NAUGHTY_LABEL.appendChild(NAUGHTY_STATUS_SPAN)

  return NAUGHTY_LABEL
}

function generateNaughtyButton(dogId, isGoodDog) {
  const NAUGHTY_BUTTON = document.createElement('button')
  NAUGHTY_BUTTON.setAttribute('id', `naughtyButtonId#${dogId}`)
  NAUGHTY_BUTTON.setAttribute('data-isgood', isGoodDog)
  const BUTTON_TEXT_NODE = document.createTextNode(naughtyButtonStatus(isGoodDog))
  NAUGHTY_BUTTON.appendChild(BUTTON_TEXT_NODE)

  return NAUGHTY_BUTTON
}

function addEventListenerToNaughtyButtonOfThisCard(dogId) {
  const NAUGHTY_BUTTON_ID = `naughtyButtonId#${dogId}`

  document.getElementById(NAUGHTY_BUTTON_ID).addEventListener("click", function () {
    changeIsGoodStatus(dogId, NAUGHTY_BUTTON_ID)
    replaceCard(dogId)
  });

}

function addEventListenerToFormSubmitButton() {
  document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault()
    processFormInputs()
  })
}

function changeIsGoodStatus(dogCardId, buttonID) {
  let currentIsGoodStatus = document.getElementById(buttonID).getAttribute('data-isgood')

  if (currentIsGoodStatus == 'true') {
    currentIsGoodStatus = 'false'
  } else if (currentIsGoodStatus === 'false') {
    currentIsGoodStatus = 'true'
  }

  ALL_DOG_CARDS[dogCardId].querySelector('.naughtyGoodStatus').remove()
  ALL_DOG_CARDS[dogCardId].querySelector('button').remove()

  ALL_DOG_CARDS[dogCardId].appendChild(generateNaughtyLabel(currentIsGoodStatus))
  ALL_DOG_CARDS[dogCardId].appendChild(generateNaughtyButton(dogCardId, currentIsGoodStatus))

  addEventListenerToNaughtyButtonOfThisCard(dogCardId)
}

function naughtyStatus(booleanStatus) {
  if (booleanStatus === 'true') {
    return 'No!'
  }
  return 'Yes!'
}

function naughtyButtonStatus(booleanStatus) {
  if (booleanStatus === 'true') {
    return 'Good dog!'
  }
  return 'Naughty Dog!'
}

function generateForm() {
  const FORM_SECTION = document.createElement('section')
  FORM_SECTION.setAttribute('class', 'main__dog-section')

  FORM_SECTION.appendChild(createFormHeading())
  FORM_SECTION.appendChild(createDogForm())

  return FORM_SECTION
}

function createFormHeading() {
  const FORM_HEADING = document.createElement('h2')
  const FORM_HEADING_TEXT_NODE = document.createTextNode('Add a new Dog')
  FORM_HEADING.appendChild(FORM_HEADING_TEXT_NODE)

  return FORM_HEADING
}

function createDogForm() {
  const DOG_FORM = document.createElement('form')
  DOG_FORM.setAttribute('class', 'form')
  DOG_FORM.setAttribute('action', '#')

  DOG_FORM.appendChild(createDogNameLabel())
  DOG_FORM.appendChild(createDogNameInput())
  DOG_FORM.appendChild(createDogNameErrorField())
  DOG_FORM.appendChild(createDogImageLabel())
  DOG_FORM.appendChild(createDogImageInput())
  DOG_FORM.appendChild(createDogImageErrorField())
  DOG_FORM.appendChild(createDogBioLabel())
  DOG_FORM.appendChild(createDogBioTextArea())
  DOG_FORM.appendChild(createSubmitButton())

  return DOG_FORM
}

function createDogNameLabel() {
  const DOG_NAME_LABEL = document.createElement('label')
  DOG_NAME_LABEL.setAttribute('for', 'name')
  const DOG_NAME_LABEL_TEXT_NODE = document.createTextNode("Dog's name")
  DOG_NAME_LABEL.appendChild(DOG_NAME_LABEL_TEXT_NODE)

  return DOG_NAME_LABEL
}

function createDogNameInput() {
  const DOG_NAME_INPUT = document.createElement('input')
  DOG_NAME_INPUT.setAttribute('required', '')
  DOG_NAME_INPUT.setAttribute('type', 'text')
  DOG_NAME_INPUT.setAttribute('id', 'name')
  DOG_NAME_INPUT.setAttribute('name', 'name')

  return DOG_NAME_INPUT
}

function createDogNameErrorField() {
  const DOG_NAME_ERROR = document.createElement('div')
  DOG_NAME_ERROR.setAttribute('id', 'formErrorName')
  DOG_NAME_ERROR.setAttribute('class', 'formErrorMessage')

  return DOG_NAME_ERROR
}

function createDogImageLabel() {
  const DOG_IMAGE_LABEL = document.createElement('label')
  DOG_IMAGE_LABEL.setAttribute('for', 'image')
  const DOG_IMAGE_LABEL_TEXT_NODE = document.createTextNode("Dog's picture")
  DOG_IMAGE_LABEL.appendChild(DOG_IMAGE_LABEL_TEXT_NODE)

  return DOG_IMAGE_LABEL
}

function createDogImageInput() {
  const DOG_IMAGE_INPUT = document.createElement('input')
  DOG_IMAGE_INPUT.setAttribute('required', '')
  DOG_IMAGE_INPUT.setAttribute('type', 'url')
  DOG_IMAGE_INPUT.setAttribute('id', 'image')
  DOG_IMAGE_INPUT.setAttribute('name', 'image')

  return DOG_IMAGE_INPUT
}

function createDogImageErrorField() {
  const DOG_IMAGE_ERROR = document.createElement('div')
  DOG_IMAGE_ERROR.setAttribute('id', 'formErrorImage')
  DOG_IMAGE_ERROR.setAttribute('class', 'formErrorMessage')

  return DOG_IMAGE_ERROR
}

function createDogBioLabel() {
  const DOG_BIO_LABEL = document.createElement('label')
  DOG_BIO_LABEL.setAttribute('for', 'bio')
  const DOG_BIO_LABEL_TEXT_NODE = document.createTextNode("Dog's bio")
  DOG_BIO_LABEL.appendChild(DOG_BIO_LABEL_TEXT_NODE)

  return DOG_BIO_LABEL
}

function createDogBioTextArea() {
  const DOG_BIO_TEXT_AREA = document.createElement('textarea')
  DOG_BIO_TEXT_AREA.setAttribute('rows', '5')
  DOG_BIO_TEXT_AREA.setAttribute('id', 'bio')
  DOG_BIO_TEXT_AREA.setAttribute('name', 'bio')

  return DOG_BIO_TEXT_AREA
}

function createSubmitButton() {
  const SUBMIT_BUTTON = document.createElement('input')
  SUBMIT_BUTTON.setAttribute('type', 'submit')
  SUBMIT_BUTTON.setAttribute('id', 'submit')
  SUBMIT_BUTTON.setAttribute('name', 'submit')
  SUBMIT_BUTTON.setAttribute('value', "Let's add a dog!")
  SUBMIT_BUTTON.setAttribute('class', "form__button")

  return SUBMIT_BUTTON
}

function processFormInputs() {
  const DOG_NAME_VALUE = document.querySelector('#name').value
  const DOG_IMAGE_VALUE = document.querySelector('#image').value
  const DOG_BIO_VALUE = document.querySelector('#bio').value

  if (DOG_NAME_VALUE.length < 2) {
    document.getElementById('formErrorName').innerText = 'The entered dog name is either empty or too short'
    setTimeout(function () {
      document.getElementById('formErrorName').innerText = ''
    }, 5000)

    return
  }
  if (DOG_IMAGE_VALUE.length < 5) {
    document.getElementById('formErrorImage').innerText = 'This does not look like it is long enough for a valid URL'
    setTimeout(function () {
      document.getElementById('formErrorImage').innerText = ''
    }, 5000)
    
    return
  }

  const NEW_DOG_ID = Object.keys(ALL_DOG_CARDS).length + 1

  ALL_DOG_CARDS[NEW_DOG_ID] = generateDogCard(NEW_DOG_ID, DOG_NAME_VALUE, DOG_IMAGE_VALUE, DOG_BIO_VALUE, 'true')
  
  generateMenuItem(NEW_DOG_ID, DOG_NAME_VALUE, 'prepend')
  replaceCard(NEW_DOG_ID)
  addEventListenerToNaughtyButtonOfThisCard(NEW_DOG_ID)
}