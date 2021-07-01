import request from '@/assets/js/axios-request.js'
import { getBlobType } from '@/assets/js/utils.js'

/* 文字识别接口相关 */

// 识别类型配置
export const ocrTypeConfig = {
    basic: 'generalOcr', //通用文字识别
    idcard: 'idcardOcr',  //身份证识别
    bankcard: 'bankcardOcr', //银行卡
    drivingLicense: 'drivingLicenseOcr',  //驾驶证
    vehicleLicense: 'vehicleLicenseOcr',  //行驶证识别
    plateLicense: 'plateLicenseOcr',  //车牌识别
    businessLicense: 'businessLicenseOcr',  //营业执照识别
    receipt: 'receiptOcr', //通用票据识别
    entryExit: 'entryExitOcr', //出入境证件识别
    impression: 'impressionOcr', //印模日期识别
    entryStamp: 'entryStampOcr', //验讫章日期识别
    container: 'containerOcr', //集装箱信息识别
    textCorrection: 'textCorrectionOcr', //文本对齐
    passport: 'passportOcr', //护照识别
    ticket: 'trainTicketOcr', //火车票识别
}

// 银行卡类型
export const bankcardTypeConfig = {
    0: '',
    1: '借记卡',
    2: '贷记卡',
}

// 通用票据字段-中文配置
export const ocrKeyToChineseConfig = {
    /* 出租车票 */
    invoice_code: '发票代码',
    invoice_number: '发票号码',
    invoice_rate: '价格（大写）',
    invoice_rate_in_word: '价格（大写）',
    invoice_rate_in_figure: '价格',
    invoice_type: '发票类型',
    Province: '省',
    City: '市',
    Distance: '里程',
    PricePerkm: '价格/千米',
    TotalFare: '总价',
    Fare: '单价',
    Date: '日期',
    date: '日期',
    Time: '时间',
    FuelOilSurcharge: '燃油费',
    CallServiceSurcharge: '服务费',
    /* 火车票 */
    seat_num: '座位号',
    time: '发车时间',
    name: '姓名',
    starting_station: '起始站',
    destination_station: '终点站',
    seat_category: '车票类型',
    id_num: '身份证号',
    serial_number: '序列号',
    ticket_rates: '票价',
    train_num: '车号',
    ticket_num: '票号',
    Waiting_area: '售票地',
    /* 增值税发票 */
    AmountInWords: '价税合计（大写）',
    'CommodityPrice#1#1': '单价',
    'CommodityNum#1#1': '数量',
    'CommodityTaxRate#1#1': '税率',
    'CommodityAmount#1#1': '金额',
    'CommodityTax#1#1': '税额',
    'CommodityUnit#1#1': '单位',
    'CommodityName#1#1': '货物或税劳务、服务名称',
    NoteDrawer: '开票人',
    SellerAddress: '销售方地址',
    SellerRegisterNum: '销售方纳税人识别号',
    MachineCode: '机器码',
    Remarks: '备注',
    SellerBank: '销售方开户行及账号',
    TotalTax: '税额',
    InvoiceDate: '开票日期',
    PurchaserRegisterNum: '购买方纳税人识别号',
    InvoiceTypeOrg: '发票名称',
    Password: '密码区',
    AmountInFiguers: '价税合计（小写）',
    PurchaserBank: '购买方开户行及账号',
    Checker: '复核',
    TotalAmount: '合计',
    PurchaserName: '购买方名称',
    InvoiceType: '发票类型',
    SheetNum: '联',
    PurchaserAddress: '购买方地址',
    Payee: '收款人',
}

export const ocrApiUrl = {
    requestOcrApi: '/scan/ocr',
}

// 文字识别接口
export const requestOcrApi = function ({ side = '', type = '', file = null, src = '' }) {
    if (src) {
        return request({
            method: 'post',
            url: `${ocrApiUrl.requestOcrApi}?side=${side}&type=${type}&url=${src}`
        })
    }

    if (!file) return new Promise((resolve, reject) => reject('识别文件不存在！'))
    const formData = new FormData();
    // formData.append('image', file, `blob.${getBlobType(file)}`);
    formData.append('image', file.blob, file.fileName);
    return request({
        method: 'post',
        url: `${ocrApiUrl.requestOcrApi}?side=${side}&type=${type}`,
        data: formData
    })
}

export const requestUseTypeApi = function () {
    return request({
        method: 'get',
        url: '/ocr/usetypes'
    })
}