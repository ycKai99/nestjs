export async function onlyFpData(fileData: any) {
  let dataArray = []
  fileData.forEach(element => {
    dataArray.push(element['fpid'])
  });
  return dataArray
}