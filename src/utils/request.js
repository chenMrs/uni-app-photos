
export default (params)=>{

    //加载中
    uni.showLoading({
        title:"加载中"
    })
    return new Promise((resolve,reject)=>{
       // 微信小程序api的铺垫
        wx.request({
            ...params,
            success(res){
                resolve(res);
            },
            fail(err){
                reject(error);
            },
            complete(){
                uni.hideLoading()
            }
        })
    })
}