// pages/home-page/home-page.js
let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/swiper1.jpg',
      '/images/swiper2.jpg',
      '/images/swiper3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true
  },

  /**
   * 生命周期函数--监听页面加载
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
  /*自定义方法*/

  //电话预约
  subscribe(){
    wx.makePhoneCall({
      phoneNumber:'预约电话',
      success:res=>{
        console.log("ok")
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  enterRepair(){
    wx.switchTab({
      url: '../repair/smx/repair-index/repair-index'
    })
  },
  
  //联系客服
  customerService(){
    wx.makePhoneCall({
      phoneNumber:'17761295425',
      success:res=>{
        console.log("ok")
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  //请求评论
  requestData(){
    http.request({
      apiName: 'index/curmembercomment',
      method: 'post',
      isShowProgress: true,
      success: res => {
        console.log(res)
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
})