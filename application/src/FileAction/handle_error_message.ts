
import { ERROR_MESSAGE, RESPONSE_MESSAGE_FILE_PATH, SUCCESS_MESSAGE } from 'src/FileInterface/const_setting';
import { v4 as uuidv4 } from 'uuid';
import { handleResponseMessage } from './generate_message';
import { readFileData } from './read_file_data';
import { fingerprintWriteMessage } from './write_data_into_file';

export function handleErrorMessage(message: string) {
    let data = readFileData(RESPONSE_MESSAGE_FILE_PATH)
    let errMessage = JSON.parse(JSON.stringify(message, null, 2));
    let uuid = uuidv4(); // create uuid v4
    let responseMessage
    
    switch(parseInt(errMessage)) {
      case 0 :
        responseMessage = handleResponseMessage(ERROR_MESSAGE.VERIFY_FAILED, uuid);
        data.push(responseMessage);
        fingerprintWriteMessage(RESPONSE_MESSAGE_FILE_PATH, data);
        break;
      case 1 :
        responseMessage = handleResponseMessage(SUCCESS_MESSAGE.SUCCESS_VERIFY, uuid);
        data.push(responseMessage);
        fingerprintWriteMessage(RESPONSE_MESSAGE_FILE_PATH, data);
        break;
    }
    return data;
}