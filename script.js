console.log('Script is live!')
//Variables
let search = document.querySelector('#search')
let form = document.querySelector('#form')
let searchToggle = document.querySelector('#search')
let popular = document.querySelector('#popular')
let anime = document.querySelector('#anime')
let london = document.querySelector('#london')
let australia = document.querySelector('#australia')
//API KEY
const apiKey = 'Bd2d6wWl5U1AwPdR18KDQ14ETH9nXF1q20uhgea5FQE'
//Defaults search Value to null
let searchValue = null
//Defaults slides array to null
let slides = null
//Stores images in 3 arrays
gallery1 = []
gallery2 = []
gallery3 = []
//Event listener for submit button
form.addEventListener('submit', (e) => {
    e.preventDefault()
    //Sets searchValue to what was put in the input box
    searchValue = search.value
    //Sets slides array back to null so new slides can populate
    slides = null
    //Calls the Start function
    start()
})
//Event listener for slideout menu button Popular
popular.addEventListener('click', (e) => {
    e.preventDefault()

    slides = null

    document.querySelector('.slider').src = ""
    document.querySelectorAll('#toggle-pics').forEach(e => e.parentNode.removeChild(e))

    populateImages(`https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=popular`)

})
//Event listener for slideout menu button Anime
anime.addEventListener('click', (e) => {
    e.preventDefault()

    slides = null

    document.querySelector('.slider').src = ""
    document.querySelectorAll('#toggle-pics').forEach(e => e.parentNode.removeChild(e))

    populateImages(`https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=anime`)

})
//Event listener for slideout menu button London
london.addEventListener('click', (e) => {
    e.preventDefault()

    slides = null

    document.querySelector('.slider').src = ""
    document.querySelectorAll('#toggle-pics').forEach(e => e.parentNode.removeChild(e))

    populateImages(`https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=london`)

})
//Event listener for slideout menu button Australia
australia.addEventListener('click', (e) => {
    e.preventDefault()

    slides = null

    document.querySelector('.slider').src = ""
    document.querySelectorAll('#toggle-pics').forEach(e => e.parentNode.removeChild(e))

    populateImages(`https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=australia`)

})
//Function to send URL to the populate images function
let start = () => {
    if (searchValue === null) {
        const url = `https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=popular`
        populateImages(url)
    } else {
        let url = `https://api.unsplash.com/search/photos?page=1&per_page=30/&client_id=${apiKey}&query=${search.value}`

        document.querySelector('.slider').src = ""
        document.querySelectorAll('#toggle-pics').forEach(e => e.parentNode.removeChild(e))

        populateImages(url)
    }
}
//Function to fetch image from API with the recieved URL
let populateImages = (url, searchUrl) => {
    fetch(url, searchUrl)
        .then(res => res.json())
        .then(res => {
            console.log('Got it!')

            gallery1 = [res.results[0], res.results[1], res.results[2], res.results[3], res.results[4], res.results[5], res.results[6], res.results[7], res.results[8], res.results[9]]
            gallery2 = [res.results[10], res.results[11], res.results[12], res.results[13], res.results[14], res.results[15], res.results[16], res.results[17], res.results[18], res.results[19]]
            gallery3 = [res.results[20], res.results[21], res.results[22], res.results[23], res.results[24], res.results[25], res.results[26], res.results[27], res.results[28], res.results[29]]

            slides = (res.results)

            buildSlides()
            createGallery1()
            createGallery2()
            createGallery3()
        })
        .catch(err => {
            console.log('Something went wrong!')
        })
}
//Function to build the slider with recieved images array
let buildSlides = (res) => {
    let number = 0;
    let display = document.querySelector('#picChange');

    display.src = slides[slides.length - 1].urls.full

    setInterval(() => {
        display.src = slides[number].urls.full
        number++

        if (number === slides.length) {
            number = 0
        }
    }, 8000)
}
//Function to create image gallery 1
let createGallery1 = () => {
    let col1 = document.querySelector('#col1')
    for (let i = 0; i < gallery1.length; i++) {
        let newPics1 = document.createElement('img')

        col1.appendChild(newPics1)

        newPics1.className = "pics"
        newPics1.id = "toggle-pics"
        newPics1.src = gallery1[i].urls.full
    }
}
//Function to create image gallery 2
let createGallery2 = () => {
    let col2 = document.querySelector('#col2')
    for (let i = 0; i < gallery2.length; i++) {
        let newPics2 = document.createElement('img')

        col2.appendChild(newPics2)

        newPics2.className = "pics"
        newPics2.id = "toggle-pics"
        newPics2.src = gallery2[i].urls.full
    }
}
//Function to create image gallery 3
let createGallery3 = () => {
    let col3 = document.querySelector('#col3')
    for (let i = 0; i < gallery3.length; i++) {

        let newPics3 = document.createElement('img')

        col3.appendChild(newPics3)
        newPics3.className = "pics"
        newPics3.id = "toggle-pics"
        newPics3.src = gallery3[i].urls.full
    }
}
//Calls start function
start()