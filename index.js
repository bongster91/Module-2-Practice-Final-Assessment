
const allCharacters = document.querySelector('#all-characters')
const form = document.querySelector('#character-comments-section form')
const commentList = document.getElementById('character-comments-ul')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const currCharacterName = document.querySelector('title').textContent
    const comment = document.querySelector('input[type="text"]').value
    const li = document.createElement('li')
    
    li.innerHTML= `<b>${currCharacterName}:</b> ${comment}`
    commentList.appendChild(li)

})

async function getCharacters() {
    try {
        const res = await axios.get('https://rickandmortyapi.com/api/character')
        const apiResults = res.data.results

        for(let character of apiResults) {
            const item = makeCharItem(character)
            allCharacters.appendChild(item)
        }
    } catch(e) {
        console.log(e)
    }
}

function makeCharItem(character) {
    const li = document.createElement('li')
    const profPic = document.createElement('img')
    profPic.src = character.image
    //for single class profPic.classname = 'photo-img'
    profPic.classList.add('photo-img')
    li.appendChild(profPic)

    const label = document.createElement('p')
    label.textContent = character.name
    li.appendChild(label)

    li.addEventListener('click', () => {
        const hidden = document.querySelector('main')
        hidden.classList.remove('hidden')

        const name = document.querySelector('#character-info h3')
        const pic = document.querySelector('#character-info img')
        const status = document.querySelector('#character-info p:first-of-type')
        const location = document.querySelector('#character-info p:last-of-type')
        const title = document.querySelector('title')

        title.textContent = character.name
        name.textContent = character.name
        pic.src = character.image
        status.innerHTML = `<b>Status:</b> ${character.status}`
        location.innerHTML = `<b>Location:</b> ${character.location.name}`
    
    })

    return li
}

getCharacters()