let http = require("../../../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distributionData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    this.requestData()
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
  //页面跳转函数
  goToDistributionMoney: function () {
    wx.navigateTo({
      url: '/pages/me/become-distributor/distribution-center/distribution-money/distribution-money'
    })
  },
  goToDistributionOrder: function () {
    wx.navigateTo({
      url: '/pages/me/become-distributor/distribution-center/distribution-order/distribution-order'
    })
  },
  goToMeDownline: function () {
    wx.navigateTo({
      url: '/pages/me/become-distributor/distribution-center/me-downline/me-downline'
    })
  },
  goToGetMoney: function () {
    wx.navigateTo({
      url: '/pages/me/become-distributor/distribution-center/get-money/get-money'
    })
  },
  goToMaterielApply: function () {
    wx.navigateTo({
      url: '/pages/me/become-distributor/distribution-center/materiel-apply/materiel-apply'
    })
  },

  //请求分销中心数据
  requestData() {
    http.request({
      apiName: 'my/distributor',
      method: 'GET',
      success: res => {
        console.log(res.level)
        if (res.level == 0) {
          res.level = "未分销"
        } else if (res.level == 1) {
          res.level = "普通分销"
        } else if (res.level == 2) {
          res.level = "合作伙伴"
        } else if (res.level == 3) {
          res.level = "高级门店"
        } else if (res.level == 4) {
          res.level = "高级区代"
        } else if (res.level == 5) {
          res.level = "高级市代"
        } else if (res.level == 6) {
          res.level = "高级省代"
        } else if (res.level == 7) {
          res.level = "高级合作伙伴"
        } else if (res.level == 8) {
          res.level = "平台区代"
        } else if (res.level == 9) {
          res.level = "平台市代"
        } else if (res.level == 10) {
          res.level = "平台省代"
        }
        this.setData({
          distributionData: res
        })
      },
    })
  },
  //二维码
  QRcode() {
    http.request({
      apiName: 'my/scanconcern',
      method: 'GET',
      success: res => {
        console.log(res)
      },
    })
  }
})