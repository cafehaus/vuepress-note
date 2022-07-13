/**
*  公共参数
*
*  @param {object} row 当前行数据
*  @param {string} key 当前单元格表头 key
*  @param {number} i 数据行序号
*  @param {array} errors 错误数据
*  @param {object} other 可选，其他额外的参数
*/
export function orderId(row, key, i, errors, other) {
    let val = row[key]

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    } else if ((val + '').length > 10) {
        errCallback(key + '不能大于10个字符', { row, key, i, errors, other })
    }
}

export function name(row, key, i, errors, other) {
    let val = row[key]

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    }
}

export function englishName(row, key, i, errors, other) {
    let val = row[key]
    let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    } else if (reg.test(val)) {
        errCallback(key + '不能包含中文', { row, key, i, errors, other })
    }
}

export function quantity(row, key, i, errors, other) {
    let val = row[key]

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    }
}

export function userName(row, key, i, errors, other) {
    let val = row[key]

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    }
}

export function phone(row, key, i, errors, other) {
    let val = row[key]
    let reg = /^1[3-9]\d{9}$/

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    } else if (!reg.test(val)) {
        errCallback(key + '格式错误', { row, key, i, errors, other })
    }
}

export function email(row, key, i, errors, other) {
    let val = row[key]
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!val) {
        errCallback(key + '不能为空', { row, key, i, errors, other })
    } else if (!reg.test(val)) {
        errCallback(key + '格式错误', { row, key, i, errors, other })
    }
}

// 统一错误处理
function errCallback(msg, arg = {}) {
    let idx = arg.i
    if (!arg.errors[idx]) arg.errors[idx] = []

    arg.errors[idx].push({
        msg,
        key: arg.key,
        index: arg.i,
        y: arg.other.y,
        x: arg.other.x,
    })
}