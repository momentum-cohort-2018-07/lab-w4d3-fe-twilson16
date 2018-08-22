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

function createNoteDivsDOM (results) {
  document.getElementById('notes-list').innerHTML = ''
//   let noteList
  for (let result of results) {
    let noteList = document.createElement('div')
    noteList.classList.add('note')
    noteList.id = `${'results._id'}`
    noteList.innerHTML = `<h5>${result.title}</h5> <p>${result.text}</p>`
    document.getElementById('notes-list').appendChild(noteList)
  }
}


// 6. Add event listener to create the JS object you need to create a new note and log it
// 7. Add Ajax POST to create note on the server and add code to add note to page
// 8. Add ability to delete notes with Ajax
