export declare const DIRECTORY: string;
export declare const FINGERPRINT_DATA_FILE: string;
export declare const MESSAGE_NOTIFICATION_FILE: string;
export declare const ERROR_MESSAGE_FILE: string;
export declare const IMAGE_FOLDER: string;
export declare const MESSAGE_FOLDER_PATH: string;
export declare const FINGERPRINT_FOLDER_PATH: string;
export declare const ERROR_MESSAGE_FOLDER_PATH: string;
export declare const WRITE_FILE_SYNC: string;
export declare const READ_FILE_SYNC: string;
export declare const WRITE_MESSAGE_SYNC: string;
export declare const READ_MESSAGE_SYNC: string;
export declare const enum SUBMIT_VALUE {
    INITIALIZE_DEVICE = "INITIALIZE_DEVICE",
    ENROLL_FINGERPRINT = "ENROLL_FINGERPRINT",
    VERIFY_FINGERPRINT = "VERIFY_FINGERPRINT",
    IDENTIFY_FINGERPRINT = "IDENTIFY_FINGERPRINT",
    CLOSE_DEVICE = "CLOSE_DEVICE"
}
export declare const enum FILE_EXTENSION {
    JPEG = "jpeg",
    BITMAP = "bmp",
    PNG = "png"
}
export declare const enum ERROR_MESSAGE {
    FAILED_SAVE_IMAGE = "Failed to save image, Jimp error.",
    READ_DIR_FAILED = "Read directory failed, readdir method error."
}
export declare const enum SUCCESS_MESSAGE {
    SUCCESS_SAVE_IMAGE = "Save image successful."
}
