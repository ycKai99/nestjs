export async function identifyFp(fileData: any) {
  let dataArray = []
  fileData.forEach(element => {
    dataArray.push(element['fpid'])
  });
  return dataArray
}