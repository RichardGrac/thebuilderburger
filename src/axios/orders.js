import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-e5ba3.firebaseio.com/'
})

export default instance