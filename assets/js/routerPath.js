/* 页面路由配置 */

const prefixConfig = {
    ai: '/ai',
    case: '/case',
    ocr: '/ocr',
    face: '/face',
    image: '/image',
    lang: '/lang',
    body: '/body',
    attr: '/attr'
}

export default {
    home: '/',
    login: '/Login',
    register: '/register',
    /* 开放能力 */
    home_ai: prefixConfig.ai,
    hoem_case: prefixConfig.case,
    /* 卡证识别 */
    ocr_idcard: prefixConfig.ai + prefixConfig.ocr + '/idcard', // 身份证识别
    ocr_basic: prefixConfig.ai + prefixConfig.ocr + '/basic', // 通用文字识别
    ocr_bankcard: prefixConfig.ai + prefixConfig.ocr + '/bankcard', // 银行卡识别
    ocr_drivingLicense: prefixConfig.ai + prefixConfig.ocr + '/drivingLicense', // 驾驶证识别
    ocr_vehicleLicense: prefixConfig.ai + prefixConfig.ocr + '/vehicleLicense', // 行驶证识别
    ocr_plateLicense: prefixConfig.ai + prefixConfig.ocr + '/plateLicense', // 车牌识别
    ocr_businessLicense: prefixConfig.ai + prefixConfig.ocr + '/businessLicense', // 营业执照识别
    ocr_receipt: prefixConfig.ai + prefixConfig.ocr + '/receipt', // 通用票据识别
    ocr_entryStamp: prefixConfig.ai + prefixConfig.ocr + '/entryStamp', // 验讫章识别
    ocr_container: prefixConfig.ai + prefixConfig.ocr + '/container', // 集装箱识别
    ocr_impression: prefixConfig.ai + prefixConfig.ocr + '/impression', // 印模识别
    ocr_textalign: prefixConfig.ai + prefixConfig.ocr + '/textalign', // 文本对齐
    ocr_passport: prefixConfig.ai + prefixConfig.ocr + '/passport', // 护照识别
    ocr_ticket: prefixConfig.ai + prefixConfig.ocr + '/ticket', // 火车票识别
    /* 人脸识别 */
    face_detect: prefixConfig.ai + prefixConfig.face + '/detect', // 人脸检测
    face_keypoint: prefixConfig.ai + prefixConfig.face + '/keypoint', // 人脸检测
    face_contrast: prefixConfig.ai + prefixConfig.face + '/contrast', // 人脸比对
    face_quality: prefixConfig.ai + prefixConfig.face + '/qulity', // 人脸质量
    face_mosaic: prefixConfig.ai + prefixConfig.face + '/mosaic', // 人脸马赛克
    /* 图像技术 */
    image_basic: prefixConfig.ai + prefixConfig.image + '/basic', // 通用目标检测
    image_quality: prefixConfig.ai + prefixConfig.image + '/quality', // 图像质量
    image_quality_face: prefixConfig.ai + prefixConfig.image + '/quality_face', // 人脸质量
    image_quality_credential: prefixConfig.ai + prefixConfig.image + '/quality_credential', // 证件质量
    image_credential_type: prefixConfig.ai + prefixConfig.image + '/credential_type', // 证件类型
    image_car: prefixConfig.ai + prefixConfig.image + '/car', // 车辆识别
    image_align: prefixConfig.ai + prefixConfig.image + '/align', // 图像对齐
    image_censor: prefixConfig.ai + prefixConfig.image + '/censor', // 图像审核
    /* 语言处理 */
    lang_textcensor: prefixConfig.ai + prefixConfig.lang + '/textcensor', // 文本审核
    /* 人体技术 */
    body_basic: prefixConfig.ai + prefixConfig.body + '/basic', // 人体识别
    body_repeat: prefixConfig.ai + prefixConfig.body + '/repeat', // 行人重识别
    /* 属性识别 */
    attr_pet: prefixConfig.ai + prefixConfig.attr + '/pet', // 宠物识别
}