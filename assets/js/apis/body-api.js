import request from '@/assets/js/axios-request.js'
import { getBlobType } from '@/assets/js/utils.js'

/* 人体识别接口相关*/

export const bodyTypeConfig = {
    basic: 'basicBody',
    bodyRecognition: 'bodyRecognition',
    personDetect: 'personDetect'
}

export const keyToChineseConfig = {
    gender: '性别',
    age: '年龄',
    glasses: '眼镜',
    orientation: '方位',
    umbrella: '伞',
    lower_color: '下身颜色',
    face_mask: '口罩',
    smoke: '烟',
    bag: '背包',
    upper_wear: '上衣',
    is_human: '人类',
    vehicle: '交通工具',
    headwear: '帽子',
    upper_wear_fg: '上衣类型',
    upper_wear_texture: '上衣纹理',
    upper_cut: '上衣截断',
    occlusion: '遮挡',
    lower_cut: '下衣截断',
    cellphone: '手机',
    carrying_item: '手提',
    lower_wear: '下衣',
    upper_color: '上衣颜色',
}

export const valueToChineseConfig = {
}

export const bodyApiUrlConfig = {
    requestBodyApi: '/scan/body',
    requestContrastApi: '/scan/contrast'
}

// 识别接口
export const requestBodyApi = function ({ side = '', type = '', file = null, src = '' }) {
    const url = `${bodyApiUrlConfig.requestBodyApi}?side=${side}&type=${type}&url=${src}`;
    const method = 'post';
    if (src) {
        return request({
            method,
            url
        })
    }
    if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
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
export const requestBodyContrastApi = function ({ side = '', type = '', apiType, list = [] }) {
    // if (apiType !== 1 && apiType !== 2) return new Promise((resolve, reject) => reject('类型异常'));
    if (list.length !== 2) return new Promise((resolve, reject) => reject('文件数量异常！'));
    // const url = `${bodyApiUrlConfig.requestContrastApi}?type=${type}`;
    const url = bodyApiUrlConfig.requestContrastApi;
    const data = new FormData();
    list.forEach((item, index) => {
        typeof item === 'string' ? data.append(`url${index + 1}`, item) : data.append('images', item, `blob${index + 1}.${getBlobType(item)}`)
    })
    data.append('type', type);
    return request({
        method: 'post',
        url,
        data
    })
}