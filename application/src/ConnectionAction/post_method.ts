const axios = require('axios')

export async function postMethod(url: string, data:any) {
    let newVerififedFingerPrints = await axios.post(url, data)
      .then(res => {
        console.log('success post method')
        return res.data;
      })
      .catch(err => {
        console.log('error get method : ',err.code);
        return "error post method : "+err
      })
    return newVerififedFingerPrints;
}