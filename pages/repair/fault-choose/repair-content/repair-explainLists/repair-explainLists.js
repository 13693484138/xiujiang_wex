let http=require("../../../../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    explainLists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.requestLists()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  requestLists(){
    http.request({
      apiName: "reqair/deviceexplainlist",
      method: "get",
      success: (res) => {
        // console.log(res)
        this.setData({
          explainLists:res
        })
      }
    })
  },
  //进入故障详细 说明
  explainDetail(e){
    wx.navigateTo({
      url: '../repair-explain/repair-explain?id=' + e.currentTarget.id,
    })
  },
})