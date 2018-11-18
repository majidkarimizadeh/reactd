import axios from 'axios';

export class CarService {
    
    getCarsSmall() {
        return axios.get('assets/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getCarsMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getCarsLarge() {
        return axios.get('http://localhost:3002/assets/demo/data/cars-large.json')
                .then(res => res.data.data);
    }
}