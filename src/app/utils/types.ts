export interface Notification {
    message: string
}

export interface ImageList {
    data: Array<ImageData>
}

export interface ImageData {
    contentType: string
    imageBuffer: string
    imageId: number
    imageName: string
    uploadTime: string
}

export interface DeleteImageResponse {
    deletedImage: {
        acknowledged: boolean,
        deletedCount: number
    },
    imageId: number
}

export interface DeleteImageResponseType {
    data: DeleteImageResponse,
    message: string
}

export interface UploadImageResponse {
    data: {
        imageId: number,
        imageName: string
    }
}
export interface DeleteConfirmation {
    imageId: number
}