export declare const DIRECTORY: string;
export declare const FINGERPRINT_DATA_FILE: string;
export declare const FINGERPRINT_TEMPLATE_DATA_FILE: string;
export declare const MESSAGE_NOTIFICATION_FILE: string;
export declare const RESPONSE_MESSAGE_FILE: string;
export declare const IMAGE_FOLDER: string;
export declare const LOCATION_TAG_FILE: string;
export declare const LOCATION_RELATION_FILE: string;
export declare const MESSAGE_FILE_PATH: string;
export declare const FINGERPRINT_FILE_PATH: string;
export declare const FINGERPRINT_TEMPLATE_FILE_PATH: string;
export declare const RESPONSE_MESSAGE_FILE_PATH: string;
export declare const LOCATION_TAG_FILE_PATH: string;
export declare const LOCATION_RELATION_FILE_PATH: string;
export declare const enum SUBMIT_VALUE {
    INITIALIZE_DEVICE = "INITIALIZE_DEVICE",
    BEGIN_DEVICE = "BEGIN_DEVICE",
    ENROLL_FINGERPRINT = "ENROLL_FINGERPRINT",
    VERIFY_FINGERPRINT = "VERIFY_FINGERPRINT",
    IDENTIFY_FINGERPRINT = "IDENTIFY_FINGERPRINT",
    CLOSE_FINGERPRINT = "CLOSE_FINGERPRINT"
}
export declare const enum FILE_EXTENSION {
    JPEG = "jpeg",
    BITMAP = "bmp",
    PNG = "png"
}
export declare const enum ERROR_MESSAGE {
    FAILED_SAVE_IMAGE = "Failed to save image.",
    READ_DIR_FAILED = "Read directory failed, readdir method error.",
    VERIFY_FAILED = "Verify failed."
}
export declare const enum SUCCESS_MESSAGE {
    SUCCESS_SAVE_IMAGE = "Save image successful.",
    SUCCESS_VERIFY = "Verify Success."
}
export declare const REMOTE_SERVER: string;
export declare const CHECK_SERVER: string;
export declare const enum fingerprint {
    LEFT_THUMB = 0,
    LEFT_INDEX = 1,
    LEFT_MIDDLE = 2,
    LEFT_RING = 3,
    LEFT_PINKY = 4,
    RIGHT_THUMB = 5,
    RIGHT_INDEX = 6,
    RIGHT_MIDDLE = 7,
    RIGHT_RING = 8,
    RIGHT_PINKY = 9,
    UNKNOWN = 10
}
export declare namespace DB {
    const FILE: string;
    const MONGO: string;
}
export declare namespace FPEVENT {
    const RES_MSG: string;
    const NOTIF_MSG: string;
    const FP_TPL_MSG: string;
    const IMG_TTL: string;
    const LOC_TAG: string;
    const LOC_REL: string;
}
