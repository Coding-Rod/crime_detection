import axios from "axios"

const register_fcm_token = () => {
    const store = this.$store;
    try{
        axios.patch(this.$store.state.api_url + 'auth/token/', 
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token')
                },
                params: {
                    fcm_token: localStorage.getItem('fcm_token')
                }
            }
        ).then((response) => {
            console.log(response)
        })    
    }catch(err){
        console.log(err)
    }
};

export { register_fcm_token };