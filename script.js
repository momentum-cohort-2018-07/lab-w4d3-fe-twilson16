import request from 'superagent'
import 'shoelace-css/dist/shoelace.css'
import './styles.css'

request.get('https://notes-api.glitch.me/api/notes')
  .auth('twilson', 'password1')
  .then(response => {
    let results = response.body.notes
    console.log(results)
    createNoteDivsDOM(results)
  })

document.getElementById('add-note-button').addEventListener('submit', event => {
  event.preventDefault()

  let noteData = {
    title: document.getElementById('note-title').value.trim(),
    text: document.getElementById('note-text'),
    tags: document.getElementById('tags')
  }

  request.post('https://notes-api.glitch.me/api/notes')
    .auth('twilson', 'password1')
    .send()
    .send(noteData)
    .then(response => {
      document.getElementById('note-title').reset()
      document.getElementById('note-text').reset()
      document.getElementById('tags').reset()
      let results = response.body.notes
      createNoteDivsDOM(results)
    })
})

function createNoteDivsDOM (results) {
  document.getElementById('notes-list').innerHTML = ''
  let noteList
  for (let result of results) {
    noteList = document.createElement('div')
    noteList.classList.add('note')
    noteList.id = `${'result._id'}`
    document.getElementById('notes-list').appendChild(noteList)
    let deleteLink = document.createElement('a')
    deleteLink.href = '#'
    // deleteLink.style.paddingLeft = '0.5rem'
    deleteLink.classList.add('text-danger')
    deleteLink.innerText = 'x'
    deleteLink.addEventListener('click', event => {
      deleteNote(results)
    })
    noteList.innerHTML = `<h5 class="title">${result.title}</h5> <p class="text">${result.text}</p> <p class="tags">${result.tags}</p>`
    document.getElementById('notes-list').appendChild(deleteLink)
  }
}

function deleteNote (result) {
  request.delete(`https://notes-api.glitch.me/api/notes/${result._id}`)
    .then(response => {
      document.getElementById(`${result._id}`).remove()
    })
}

// function sortDate () {
//     forEach (noteList) {
//         isMoment('MMMM Do YYYY, h:mm:ss a').sort()
//     }
// }
// 6. Add event listener to create the JS object you need to create a new note and log it
// 7. Add Ajax POST to create note on the server and add code to add note to page
// 8. Add ability to delete notes with Ajax
