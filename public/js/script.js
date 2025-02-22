
let form = document.getElementById('form1')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    weatherFun()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const latitudeF = document.getElementById('latitude')
const longitudeF = document.getElementById('longitude')
const forecastF = document.getElementById('forecast')
const weatherp = document.getElementById('weatherp')

let weatherFun = async () => {
    try {
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if (data.error) {
            errorF.innerText = data.error
            locationF.innerText = ""
            latitudeF.innerText = ""
            longitudeF.innerText = ""
            forecastF.innerText = ""
            weatherp.style.display = 'block'
           
        }
        else {
            locationF.innerText = data.location
            forecastF.innerText = data.forcast
            latitudeF.innerText = data.latitude
            longitudeF.innerText = data.longitude
            weatherp.style.display = 'none'
            errorF.innerText = ""
            
        }
    }
    catch (e) {
        console.log(e)
    }
}