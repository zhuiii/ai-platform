import request from '@/assets/js/axios-request.js'
import { getBlobType } from '@/assets/js/utils.js'

/* 人脸识别接口相关*/

export const faceTypeConfig = {
    detect: 'faceDetect',
    keyPoint: 'faceKeyPoints',
    contrast: 'FaceContrast',
    mosaic: 'codingFace',
    headNumber: 'headNumber',
    compare: 'FaceContrast',
}

export const faceKeyToChineseConfig = {
    beauty: '颜值',
    gender: '性别',
    age: '年龄',
    expression: '表情',
    glasses: '眼镜',
    emotion: '情绪',
    mask: '戴口罩',
}

export const faceValueToChineseConfig = {
    expression: {
        none: '不笑',
        smile: '微笑'
    },
    emotion: {
        neutral: '无情绪',
        angry: '愤怒',
        happy: '高兴'
    },
    glasses: {
        common: '普通眼镜',
        none: '无眼镜'
    },
    gender: {
        female: '女性',
        male: '男性'
    },
    mask: ['无', '有']
}

export const faceApiUrlConfig = {
    requestFaceApi: '/scan/face',
    requestContrastApi: '/scan/contrast',
}

// 识别接口
export const requestFaceApi = function ({ side = '', type = '', file = null, src = '' }) {
    const url = `${faceApiUrlConfig.requestFaceApi}?side=${side}&type=${type}&url=${src}`;
    const method = 'post';
    if (src) {
        return request({
            method,
            url
        })
    }
    if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'));
    const formData = new FormData();
    // formData.append('image', file, `blob.${getBlobType(file)}`);
    formData.append('image', file.blob, file.fileName);
    return request({
        method,
        url,
        data: formData
    })
}

/* 
比对接口
apiType：1：路径提交；2：文件提交
*/
export const requestFaceContrastApi = function ({ side = '', type = '', apiType, list = [] }) {
    // if (apiType !== 1 && apiType !== 2) return new Promise((resolve, reject) => reject('类型异常'));
    if (list.length !== 2) return new Promise((resolve, reject) => reject('参数异常！'));
    // const url = `${faceApiUrlConfig.requestContrastApi}?type=${type}`;
    const url = faceApiUrlConfig.requestContrastApi;
    // const data = apiType === 1 ? {} : new FormData();
    const data = new FormData();
    list.forEach((item, index) => {
        // if (apiType === 1) {
        //     // data[`url${index + 1}`] = item;
        //     data.append(`url${index + 1}`, item);
        // } else {
        //     data.append('images', item);
        // }
        typeof item === 'string' ? data.append(`url${index + 1}`, item) : data.append('images', item, `blob${index + 1}.${getBlobType(item)}`)
    })
    data.append('type', type);
    return request({
        method: 'post',
        url,
        data
    })
}