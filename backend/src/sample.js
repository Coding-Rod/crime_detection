import axios  from 'axios';

const base_url = 'https://whatsapp.toolhero.tech/api/send';

let data = {                
    type: 'text',
    number: '59169761943',
    message: 'Hola Mundo',
    instance_id: '648A1DB6301A7',
    access_token: '6485f0d26b432'
};

const url = base_url 
            +'?type='+data.type
            +'&number='+data.number
            +'&message='+data.message
            +'&instance_id='+data.instance_id
            +'&access_token='+data.access_token;

let req_config = {
    method: 'post',
    url: url,
    headers: { 
        'Content-Type': 'application/json'
    },
};

console.log(JSON.stringify(req_config));

axios.request(req_config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });