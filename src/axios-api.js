import axios from 'axios';

export default  axios.create({
    baseURL :  "https://amazon-clone-olive-kappa.vercel.app" // the api cloud function url
})
