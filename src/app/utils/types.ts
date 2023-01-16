export interface NotificationDataType {
    message: string
}

export interface ImagesType {
    data: Array<ImagesDataType>
}

export interface ImagesDataType {
    contentType: string
    imageBuffer: string
    imageId: number
    imageName: string
    uploadTime: string
}

export interface DeleteImageResponseDataType {
    deletedImage: {
        acknowledged: boolean,
        deletedCount: number
    },
    imageId: number
}

export interface DeleteImageResponseType {
    data: DeleteImageResponseDataType,
    message: string
}

export interface UploadImageResponseType {
    data: {
        imageId: number,
        imageName: string
    }
}
export interface ConfrimationDialogueType {
    imageId: number
}