const axios = require('axios')

export async function getMethod(url: string) {

    let fptemplate: Promise<string> = axios.get(url)
        .then(res => { 
            console.log('success get method');
            return res.data;
        })
        .catch(err => { 
            console.log('error get method : ',err);
            return "error get method : "+err;
        })
    return fptemplate;
}