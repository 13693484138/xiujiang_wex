// pages/me/apply-distribution/apply-distribution-01/apply-distribution-01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tel: '',
    gender: '',
    address: '',
    corporateName: '',
    corporateAddress: '',
    homeAddress: '',
    position: '',
    agent: '',
  },


  dataInput: function(event) {
    if (event.target.id == 'name'){
      this.setData({
        name: event.detail.value
      })
    }                         
    //console.log(event.detail.value);
  },
  goToBecomeDistritutor:function() {
    let name = this.data.name;
    if(!name){
      wx.showToast({
        title: '请完善信息！',
      })
    }
    // wx.navigateTo({
    //   url: '/pages/me/become-distributor/become-distributor'
    // })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {

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
})