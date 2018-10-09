// 引入HTTP请求
let http = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist: [], //请求回的地址列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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
    this.queryAddLists()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //查询地址列表请求
  queryAddLists() {
    http.request({
      apiName: 'my/addresslist',
      method: 'get',
      isShowProgress: true,
      success: res => {
        console.log(res)
        this.setData({
          addressList: res
        })
      }
    })
  },

  //删除地址弹框
  deleteAddress(e){
    let deleteId = e.currentTarget.id;//删除需要的id参数
    wx.showModal({
      title: '删除地址',
      content: '请确认是否删除',
      success:res=>{
        if(res.confirm){
          console.log('准备提交删除请求')
          this.confirmDelete(deleteId)
        }
      }
    })
  },
  
  //删除地址请求
  confirmDelete(deleteId){
    http.request({
      apiName: 'my/deleteAddress',
      method: 'delete',
      isShowProgress: true,
      data:{
        id: deleteId
      },
      success: res => {
        console.log(res)
        if(res=='删除成功'){
          this.queryAddLists()
        }
      }
    })
  },

  //页面跳转至新增地址
  goToAddAddress: function() {
    wx.navigateTo({
      url: '/pages/me/address-manage/add-address/add-address?tt=0'
    })
  }
})