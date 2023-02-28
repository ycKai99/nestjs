import { generateMessage } from 'src/fileAction/appMessage';
const axios = require('axios')

export async function syncData(fileData: any) {
    let message = generateMessage()
    console.log(message)
    console.log(JSON.stringify(fileData,null,0))
    axios.post('http://192.168.100.46:4040/syncFpStorage',{
      data: fileData,
      message: message
    })
    .then(res => console.log("res is ",res.data))
    .catch(err => console.log("error is ",err))
  }