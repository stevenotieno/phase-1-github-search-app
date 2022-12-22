document.addEventListener('DOMContentLoaded', ()=>{
    let form = document.getElementById('github-form')
    let user = document.getElementById('user-list')
    let repos = document.getElementById('repos-list')
    let data
    let name
    console.log(form);
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        name = e.target.search.value
        console.log(name);
        renderUser()
        form.reset()
   
    })

    const renderUser = ()=>{
        fetch (`https://api.github.com/search/users?q=${name}`)
        .then(resp=>resp.json())
        .then(userData=>{
            user.innerHTML = ''
            repos.innerHTML = ''
            data = userData
            console.log(data);
            userList()
            
        })
   
    }

    const userList = ()=>{
        console.log(data.items[0].login);
            let userName = document.createElement('li')
            let avatar = document.createElement('li')
            let link = document.createElement('li')
            userName.append(data.items[0].login)
            avatar.innerHTML = `<img src = "${data.items[0].avatar_url}">`
            link.append(data.items[0].url)

            user.appendChild(userName)
            user.appendChild(avatar)
            user.appendChild(link)

            console.log(userName);
            userName.addEventListener('click',()=>{
                console.log(data.items[0].repos_url);
                renderRepos()
            })
    }

    const renderRepos = ()=>{
        fetch (`https://api.github.com/users/${name}/repos`)
        .then(resp=>resp.json())
        .then(data=>{
           
           
            console.log(data);
            console.log(name);
            data.forEach(repo=>{
                if(repo.name){
                    let repoList = document.createElement('li')
                    repoList.append(repo.name)
                    repos.appendChild(repoList)
                }
            })
           
            
        })
    }
})