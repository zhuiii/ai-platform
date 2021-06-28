import request from '@/assets/js/axios-request.js'

// 查询盛视路由接口列表,带tree
export const requestAIList = function () {
    return request({
        method: 'get',
        url: '/route/api/treeList'
    })
}

/* 
算法点赞拉黑
@param {Boolean} algorithmEstimateStatus 1：赞；0：踩
@param {String} algorithmId 算法id
@param {String} userId 用户id
*/
export const requestIsLike = function ({algorithmEstimateStatus, algorithmId, userId}) {
    const data = {
        algorithmEstimateStatus,
        algorithmId
    }
    return request({
        method: 'post',
        url: '/algorithm/estimate/record/add',
        data
    })
}

/* 
根据算法ID查询点赞拉黑数
@param {String} algorithmId 算法id
*/
export const requestPraiseCount = function (algorithmId) {
    return request({
        method: 'get',
        url: '/algorithm/estimate/record/count/' + algorithmId,
    })
}

/* 
根据算法ID查询用户是否点赞
@param {String} algorithmId 算法id
*/
export const requestIsPraised = function (algorithmId) {
    return request({
        method: 'get',
        url: '/algorithm/estimate/record/check/' + algorithmId,
    })
}

/* 
根据算法ID取消用户点赞或拉踩
@param {String} algorithmId 算法id
*/
export const requestCancelPraise = function ({algorithmId}) {
    const data = {
        algorithmId
    }
    return request({
        method: 'post',
        url: '/algorithm/estimate/record/cancel',
        data
    })
}
