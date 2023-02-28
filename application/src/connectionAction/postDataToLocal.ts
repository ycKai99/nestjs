const axios = require('axios')
import * as net from 'net'
var CryptoJS = require("crypto-js")

var tempCount: number = 1;

export function postData(fileData) {

  // console.log('data is ',ciphertext)
  // axios.post('http://192.168.100.54:8080', ciphertext)
  // .then(res => console.log("res is ",res.data))
  // .catch(err => console.log("error is ",err))

  let socket: net.Socket;
  socket = new net.Socket();
  socket.connect(8080, 'localhost', async () => {
    console.log('Connected to Java server');

    if (fileData.length > 0) {
      let data = calResult(fileData)
      socket.write(JSON.stringify(data));
    }
    else {
      socket.write("no data");
    }
  });
  socket.on('data', (data) => {
    if (tempCount < (fileData.length + 1)) {
      let data = calResult(fileData)
      socket.write(data.toString());
    } else {
      socket.write("done");
      socket.destroy();
    }
  });
  socket.on('error', (error) => {
    console.log('error is ', error)
    setTimeout(postData, 5000);
  })
  socket.on('end', () => {
    console.log('disconnected from server')
  })
  socket.on('close', () => {
    console.log('Close')
    // setTimeout(asyncsocketFirstTimeConnect, 1000);
  })
}

function calResult(fileData) {
  let tempA = []
  for (let i = tempCount; i < (fileData.length + 1); i++) {
    tempCount += 1
    tempA.push(fileData[i - 1]['fpid'])
    if (i % 4 == 0) {
      console.log('break')
      break
    }
  }
  console.log('tempA is ', JSON.stringify(tempA, null, 2))
  return tempA
}