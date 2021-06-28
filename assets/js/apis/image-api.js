import request from '@/assets/js/axios-request.js'
import { getBlobType } from '@/assets/js/utils.js'

/* 图像技术接口相关*/

export const imageDetectTypeConfig = {
    basic: 'basicImage', //通用识别
    quality: 'imageQuality', //图像质量
    faceQuality: 'faceQuality', // 人脸质量
    IDPhotoQuality: 'IDPhotoQuality', // 证件照质量
    car: 'carImage', //车辆识别
    align: 'textAlignment', //文本对齐
    cycling: 'cycling', // 人骑车属性分析
}

export const imageKeyCNConfig = {
    color: "色彩",
    limpid: "清晰度",
    bright: "亮度",
    cover: "遮挡",
    font: "正脸度",
    tilt: "倾斜度",
}

export const imageDetectApiUrl = {
    requestImageDetectApi: '/scan/image',
}

// 识别接口
export const requestImageDetectApi = function ({ side = '', type = '', file = null, src = '' }) {
    if (src) {
        return request({
            method: 'post',
            url: `${imageDetectApiUrl.requestImageDetectApi}?side=${side}&type=${type}&url=${src}`
        })
    }
    
    if(!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
    const formData = new FormData();
    // formData.append('image', file, `blob.${getBlobType(file)}`);
    formData.append('image', file.blob, file.fileName);
    return request({
        method: 'post',
        url: `${imageDetectApiUrl.requestImageDetectApi}?side=${side}&type=${type}`,
        data: formData
    })
}