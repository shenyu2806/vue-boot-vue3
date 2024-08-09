import instance from "@/http/index";

//产品入库
export const createProduct = data => {
    const {
        product_id,
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        product_create_person,
        in_memo
    } = data
    return instance({
        url: '/pro/createProduct',
        method: 'post',
        data: {
            product_id,
            product_name,
            product_category,
            product_unit,
            product_inwarehouse_number,
            product_single_price,
            product_create_person,
            in_memo
        }
    })
}
//编辑产品信息
export const editProduct = data => {
    const {
        product_id,
        product_name,
        product_category,
        product_unit,
        product_inwarehouse_number,
        product_single_price,
        in_memo
    } = data
    return instance({
        url: '/pro/editProduct',
        method: 'post',
        data: {
            product_id,
            product_name,
            product_category,
            product_unit,
            product_inwarehouse_number,
            product_single_price,
            in_memo
        }
    })
}
//获取产品列表
export const getProductList = () => {
    return instance({
        url: '/pro/getProductList',
        method: 'post',
    })
}
//产品申请出库
export const applyOutProduct = data => {
    const {
        product_id,
        product_out_id,
        product_name,
        product_out_price,
        product_out_number,
        product_out_apply_person,
        apply_memo
    } = data
    return instance({
        url: '/pro/applyOutProduct',
        method: 'post',
        data: {
            product_id,
            product_out_id,
            product_name,
            product_out_price,
            product_out_number,
            product_out_apply_person,
            apply_memo
        }
    })
}
//产品全部数据列表
export const ProductAllList = () => {
    return instance({
        url: '/pro/ProductAllList',
        method: 'post',
    })
}
//产品审核列表
export const applyProductList = () => {
    return instance({
        url: '/pro/applyProductList',
        method: 'post',
    })
}
//产品审核
export const auditProduct = data => {
    const {
        product_out_id,
        product_out_status,
        audit_memo,
        product_out_audit_person,
        product_out_price,
        product_out_apply_person,
        product_out_number
    } = data
    return instance({
        url: '/pro/auditProduct',
        method: 'post',
        data: {
            product_out_id,
            product_out_status,
            audit_memo,
            product_out_audit_person,
            product_out_price,
            product_out_apply_person,
            product_out_number
        }
    })
}
//通过入库编号获取数据
export const searchProductForId = data => {
    const {
        product_id
    } = data
    return instance({
        url: '/pro/searchProductForId',
        method: 'post',
        data: {
            product_id
        }
    })
}
//通过出库编号获取数据
export const searchProductOutId = data => {
    const {
        product_out_id
    } = data
    return instance({
        url: '/pro/searchProductOutId',
        method: 'post',
        data: {
            product_out_id
        }
    })
}
//删除入库产品
export const deletProductForId = (product_id) => {
    return instance({
        url: '/pro/deletProductForId',
        method: 'post',
        data: {
            product_id
        }
    })
}
//删除 申请出库产品
export const deletProductOutId = (product_out_id) => {
    return instance({
        url: '/pro/deletProductOutId',
        method: 'post',
        data: {
            product_out_id
        }
    })
}
//删除 出库产品
export const deletProductfopsForId = (product_out_id) => {
    return instance({
        url: '/pro/deletProductfopsForId',
        method: 'post',
        data: {
            product_out_id
        }
    })
}
//撤回产品出库申请
export const WithdrawApplyProduct = (product_out_id) => {
    return instance({
        url: '/pro/WithdrawApplyProduct',
        method: 'post',
        data: {
            product_out_id
        }
    })
}
//获取 库存产品总数
export const getProductListLength = () => {
    return instance({
        url: '/pro/getProductListLength',
        method: 'post',
    })
}
//获取 申请出库产品总数
export const getApplyProdcutListLength = () => {
    return instance({
        url: '/pro/getApplyProdcutListLength',
        method: 'post',
    })
}
//获取 出库产品总数
export const getoutprofuctListLength = () => {
    return instance({
        url: '/pro/getoutprofuctListLength',
        method: 'post',
    })
}
//监听换页 库存产品
export const returnProdcutListData = (zhid,pager) => {
    return instance({
        url: '/pro/returnProdcutListData',
        method: 'post',
        data: {
            zhid,
            pager
        }
    })
}
//监听换页 申请出库产品
export const returnApplyProdcutListData = (zhid,pager) => {
    return instance({
        url: '/pro/returnApplyProdcutListData',
        method: 'post',
        data: {
            zhid,
            pager
        }
    })
}
//监听换页 出库产品
export const returnoutprofuctListData = (zhid,pager) => {
    return instance({
        url: '/pro/returnoutprofuctListData',
        method: 'post',
        data: {
            zhid,
            pager
        }
    })
}

//修改状态码 300
export const setad300 = (product_id) => {
    return instance({
        url: '/pro/setad300',
        method: 'post',
        data: {
            product_id
        }
    })
}

//修改状态码 null
export const setadnull = (product_id) => {
    return instance({
        url: '/pro/setadnull',
        method: 'post',
        data: {
            product_id
        }
    })
}
//更新库存数量 申请出库
export const updateproduct = (product_id,product_all_price) => {
    return instance({
        url: '/pro/updateproduct',
        method: 'post',
        data: {
            product_id,
            product_all_price
        }
    })
}
//更新库存数量 取消出库
export const upopesproduct = (product_id,product_out_number) => {
    return instance({
        url: '/pro/upopesproduct',
        method: 'post',
        data: {
            product_id,
            product_out_number
        }
    })
}