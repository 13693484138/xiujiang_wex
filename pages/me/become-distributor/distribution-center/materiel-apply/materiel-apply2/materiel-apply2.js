// pages/me/become-distributor/distribution-center/materiel-apply/materiel-apply2/materiel-apply2.js
const http = require('../../../../../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    isChoose: false,
    name: '',
    tel: '',
    address: '',
    num: '',
    email: '',
    type: '',
    Array: ['请选择种类','门店物料'],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  changeSelect: function (e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.index)
  },
  alertTips: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  preventTouchMove: function () {
  },
  changeIsChoose: function() {
    this.setData({
      isChoose: !this.data.isChoose
    })
  },
  formSubmit: function(e) {
    this.setData({
      name: e.detail.value.name,
      tel: e.detail.value.tel,
      address: e.detail.value.address,
      num: e.detail.value.num,
      email: e.detail.value.email,
      type: this.data.index
    })
    let flag = true;
      let warn = '';
    if (!this.data.name || !this.data.tel || !this.data.address || !this.data.num || !this.data.email) {
          warn = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warn = '请输入正确的姓名！'
      } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
        warn = '请输入正确的手机号！'
      } else if (!(/^[0-9]{1,4}$/.test(e.detail.value.num))) {
        warn = '您输入的数量不正确！'
      } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(e.detail.value.email)){
      warn = '请输入正确的邮箱！'
      }else {
        flag = false;
      }
      if (flag == true) {
        wx.showToast({
          title: warn,
          icon: 'none'
        })
      } else {
        http.request({
          apiName: 'my/leaflettype',
          method: 'PUT',
          data: {
            name: this.data.name,
            phone: this.data.tel,
            address: this.data.address,
            num: this.data.num,
            email: this.data.email,
            type: this.data.index
          },
          success: function (res) {
            wx.showToast({
              title: res.msg,
              icon: 'success'
            })
            wx.navigateTo({
              url: '/pages/me/become-distributor/distribution-center/materiel-apply/materiel-apply'
            })
          },
          fail: function (res) {
            console.log(res)
          }
        })
      };   
  }
})