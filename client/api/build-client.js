import axios from 'axios';

const buildClient = ({ req }) => {
    if (typeof window === "undefined") {
        //we are on the server

        return axios.create({
            baseURL:
              "http://www.ticketing-app-pc508.xyz",
            headers: req.headers,
          });
    }else{
        //we are on the browser
        return axios.create({
            baseUrl: '/',
        });
    }
};

export default buildClient;