export const DIRECTORY: string = "localStorage";
export const FINGERPRINT_DATA_FILE: string = "fingerprintData.json";
export const MESSAGE_NOTIFICATION_FILE: string = "messageNotificationData.json";
export const ERROR_MESSAGE_FILE: string = "errorMessage.json";
export const IMAGE_FOLDER: string = "images/";

export const MESSAGE_FOLDER_PATH: string = "./" + DIRECTORY + "/" + MESSAGE_NOTIFICATION_FILE;
export const FINGERPRINT_FOLDER_PATH: string = "./" + DIRECTORY + "/" + FINGERPRINT_DATA_FILE;
export const ERROR_MESSAGE_FOLDER_PATH: string = "./" + DIRECTORY + "/" + ERROR_MESSAGE_FILE;

export const WRITE_FILE_SYNC: string = 'WRITE_FILE_SYNC';
export const READ_FILE_SYNC: string = 'READ_FILE_SYNC';
export const WRITE_MESSAGE_SYNC: string = 'WRITE_MESSAGE_SYNC';
export const READ_MESSAGE_SYNC: string = 'READ_MESSAGE_SYNC';

export const enum SUBMIT_VALUE {
    INITIALIZE_DEVICE = 'INITIALIZE_DEVICE',
    ENROLL_FINGERPRINT = 'ENROLL_FINGERPRINT',
    VERIFY_FINGERPRINT = 'VERIFY_FINGERPRINT',
    IDENTIFY_FINGERPRINT = 'IDENTIFY_FINGERPRINT',
    CLOSE_DEVICE = 'CLOSE_DEVICE'
}
export const enum FILE_EXTENSION {
    JPEG = 'jpeg',
    BITMAP = 'bmp',
    PNG = 'png'
}

export const enum ERROR_MESSAGE {
    FAILED_SAVE_IMAGE = "Failed to save image, Jimp error.",
    READ_DIR_FAILED = "Read directory failed, readdir method error."
}

export const enum SUCCESS_MESSAGE {
    SUCCESS_SAVE_IMAGE = "Save image successful."
}