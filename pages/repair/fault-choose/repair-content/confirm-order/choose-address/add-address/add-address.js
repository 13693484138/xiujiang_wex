// pages/repair/fault-choose/repair-content/confirm-order/choose-address/add-address/add-address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    name:'',
    phone:'',
    area:'',
    detailAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tt = options.tt; //判断是从哪个页面跳转过来的
    this.setData({
      type: tt
    })
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
  createAddress: function() {
    var tt = this.data.type;
    // var name = this.data.name;
    // var phone = this.data.phone;
    // var area = this.data.area;
    // var detailAddress = this.data.detailAddress;
    // if(name == ''){
    //   showRemind('请输入收货人姓名')
    // } else if (phone == ''){
    //   showRemind('请输入手机号')
    // }else if(area==''){
    //   showRemind('请选择区域信息')
    // } else if (detailAddress == ''){
    //   showRemind('请输入详细地址')
    // }


    if(1 == tt){
      wx.navigateBack({
        url:'/pages/repair/fault-choose/repair-content/confirm-order/confirm-order'
      })
    }
  }
})
function showRemind(content) {
  wx.showModal({
    title: '提示',
    content: content,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}