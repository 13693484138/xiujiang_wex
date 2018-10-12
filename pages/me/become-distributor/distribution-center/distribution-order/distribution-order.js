
const http = require("../../../../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    data: [],
    allmoney: "",
    pageIndex: 1, //分页默认第一页
    noMore:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    this.requestOrder()
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setData({
      data:[]
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let index = this.data.pageIndex + 1;//每下拉一次请求页码+1
    this.setData({
      pageIndex: index
    })
    if(!this.data.noMore){
      this.requestOrder()
    }else{
      console.log("没有更多")
    }

  },

  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function() {

  },
  requestOrder() {
    http.request({
      apiName: 'my/distributororder',
      method: 'POST',
      data: {
        'currentPage': this.data.pageIndex
      },
      success: res => {
        console.log(res)
        if (res.list.length==0) {
          this.setData({
            noMore:true
          })
        }else{
          let newArray = this.data.data.concat(res.list)
          this.setData({
            data: newArray
          })
        }
        
        //总佣金
        let sum = 0;
        for (let value of this.data.data) {
          sum = sum + Number(value.income)
        }
        this.setData({
          allmoney: sum
        })
      },

    })

})