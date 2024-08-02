import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:4000/api'
});


export const saveShoppingList = async (prodcuts:any) => {
    await api.post('/save',{prodcuts})
}