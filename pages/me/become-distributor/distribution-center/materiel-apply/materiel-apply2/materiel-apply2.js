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
    kind: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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
    console.log(e.detail.value);
    this.setData({
      name: e.detail.value.name,
      tel: e.detail.value.tel,
      address: e.detail.value.address,
      num: e.detail.value.num,
      email: e.detail.value.email
    })
    let flag = true;
      let warn = '';
    if (!this.data.name || !this.data.tel || !this.data.address || !this.data.num || !this.data.email) {
          warn = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warn = '请输入正确的姓名！'
      } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
        warn = '请输入正确的手机号！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.corporateName))) {
        warn = '请选择物料种类！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.position))) {
        warn = '您输入的数量不正确！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.corporateAddress))) {
        warn = '请输入详细的地址！'
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2, 6} $/)){
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
            type: this.data.kind
          },
          success: function (res) {
            wx.showToast({
              title: '申请成功！',
              icon: 'success'
            })
            // wx.navigateTo({
            //   url: '/pages/me/become-distributor/become-distributor'
            // })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      };   
  }
})