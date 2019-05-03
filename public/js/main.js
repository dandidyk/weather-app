console.log('Hi from js');


const form = document.querySelector('form');
const input = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


form.addEventListener('submit', e => {
    e.preventDefault();

    const searchValue = input.value;
    message1.textContent = 'Loading...'
    message2.textContent = ''  

    fetch(`/weather/?address=${searchValue}`)
        .then(response => {
            console.log(response)
            return response.json()
        }).then(data => {
            if (data.error) {
                message1.textContent = data.error
                return
            }
            message1.textContent = data.location
            message2.textContent = `${data.temperature} ${data.precipProbability}`
        });

})