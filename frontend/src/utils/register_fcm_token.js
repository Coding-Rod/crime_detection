import axios from "axios"
import store from "../store"

const register_fcm_token = async () => {
    try {
        console.log("Auth token: Bearer " + localStorage.getItem('token'))
        await axios.patch(store.state.API_URL + '/auth/token/', {
            token: localStorage.getItem('fcm_token')
        },
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            }
        ).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });
    } catch (err) {
        console.log(err)
    }
};

export { register_fcm_token };