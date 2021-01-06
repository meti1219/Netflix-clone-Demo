import axios from 'axios';

const instance = axios.create({
    baseURL : "https://api.themoviedb.org/3",
});
 export default instance;

 /**base url to make request to the movie databse */