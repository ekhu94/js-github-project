const searchURL = 'https://api.github.com/search/users'
const repoURL = 'https://api.github.com/users'
const userList = document.querySelector('#user-list')
const userHeader = document.querySelector('#user-header')
const reposHeader = document.querySelector('#repos-header')
const reposList = document.querySelector('#repos-list')
const form = document.querySelector('#github-form')
let search = form.querySelector('#search')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value !== "") {
        getUsers(search.value)
        search.value = ""
    }
})

const getUsers = user => {
    deleteLis(userList)
    deleteLis(reposList)
    userHeader.classList.remove('hidden')
    reposHeader.classList.add('hidden')
    axios.get(`${searchURL}?q=${user}`)
        .then(resp => {
            for (let git of resp.data.items) {
                createUserLi(git)
            }
        })
        .catch(err => console.log(err))
}

const getRepos = user => {
    deleteLis(userList)
    deleteLis(reposList)
    userHeader.classList.add('hidden')
    reposHeader.classList.remove('hidden')
    axios({
        method: "get",
        url: `${repoURL}/${user}/repos`,
        headers: {
            "Content-Type": "application/json",
            Accept: 'application / vnd.github.v3 + json'
        }
    })
        .then(resp => {
            for (let repo of resp.data) {
                createRepoLi(repo)
            }
        })
        .catch(err => console.log(err))
    }

const createUserLi = user => {
    const li = document.createElement('li')
    const avatar = document.createElement('img')
    li.style.cursor = "pointer"
    avatar.src = user.avatar_url
    avatar.style.width = "20px"
    li.innerHTML = `<strong>${user.login}: </strong>Github: ${user.url} `
    li.appendChild(avatar)

    li.addEventListener('click', () => getRepos(user.login))

    userList.appendChild(li)
}

const createRepoLi = repo => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = repo.html_url
    a.target = "_blank"
    a.innerText = "Link to Repository"
    li.innerText = repo.name + " - "
    li.appendChild(a)
    reposList.appendChild(li)
}

const deleteLis = ul => {
    while (ul.firstChild) {
        ul.firstChild.remove()
    }
}