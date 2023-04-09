import axios from 'axios';
import { CHECK_SERVER } from 'src/FileInterface/const_setting';
import { connectionInterface } from 'src/FileInterface/file_message_type.interface';

export async function refrechConnection(): Promise<connectionInterface> {
    let data: connectionInterface;
    await axios.get(CHECK_SERVER)
        .then((res) => {console.log('server live');data = "Online";})
        .catch((err) => {console.log('server dead');data = "Offline";})
    return data;
}