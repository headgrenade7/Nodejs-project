console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#message_1')
const m2 = document.querySelector('#message_2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    m1.textContent = 'Loading'

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                m1.textContent = data.error
            }
            else{
                m1.textContent = data.location
                //m2.textContent = `Temp is ${data.forecast.temp} and it feels like ${data.forecast.feelslike}`
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})