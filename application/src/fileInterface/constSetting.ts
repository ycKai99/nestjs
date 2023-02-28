export const file_path = {
    directory: 'localStorage',
    filename: 'fingerprintData.json'
};
export const message_path = {
    directory: 'localStorage',
    filename: 'messageNotificationData.json'
}
export const message_full_path: string = "./" + message_path.directory + "/" + message_path.filename;
export const data_full_path: string = "./" + file_path.directory + "/" + file_path.filename;

export const WRITE_FILE_SYNC: string = 'WRITE_FILE_SYNC';
export const READ_FILE_SYNC: string = 'READ_FILE_SYNC';
export const WRITE_MESSAGE_SYNC: string = 'WRITE_MESSAGE_SYNC';
export const READ_MESSAGE_SYNC: string = 'READ_MESSAGE_SYNC';