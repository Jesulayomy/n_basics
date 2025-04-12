document.querySelector('button').addEventListener('click', getRapper)

function getRapper(){
    const rapper = document.querySelector('input').value
    const url = `/api/${rapper}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('#govName').innerText = data.birthName
        document.querySelector('#age').innerText = data.age
        document.querySelector('#birthPlace').innerText = data.birthLocation
    })
}
