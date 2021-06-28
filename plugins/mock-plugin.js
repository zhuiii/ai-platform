var Mock = require('mockjs')

Mock.mock('/ocr/usetypes', 'get', {
    data: [
        {
            id: 1,
            title: '云端服务',
            desc: '提供各类文字识别的云端服务接口，用户可直接调用API或使用SDK对图片中的文字进行识别',
            linkText: 'API文档',
            url: '#'
        },
        {
            id: 2,
            title: '离线识别SDK',
            desc: '集成到移动设备中（Android、iOS)，无需网络即可实现身份证、银行卡扫描识别功能',
            linkText: '合作咨询',
            url: '#'
        },
        {
            id: 3,
            title: '私有化部署',
            desc: '部署至客户本地服务器，在客户内网中实现文字识别功能，保障数据私密性，提供一体机和软件部署包两种私有化方案',
            linkText: '立即申请',
            url: '#'
        },
    ]
})