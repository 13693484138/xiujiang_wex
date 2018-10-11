// pages/me/apply-distribution/apply-distribution-01/apply-distribution-01.js
const http = require('../../../../utils/http.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    namejudge: '',
    tel: '',
    gender: '',
    address: '',
    corporateName: '',
    corporateAddress: '',
    homeAddress: '',
    position: '',
    agent: '',
    id: '',
    pid: '',
    showOrdinary: false,
    showCooperation: false,
    showAgent: false,
    Array: ['平台区代', '平台市代', '平台省代'],
    index: 8,
    Arr: ['请选择您的性别','男', '女'],
    idx: 0
  },


  changeSelect: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  Select: function (e) {
    this.setData({
      idx: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log(e);
    if (this.data.id == 1) {
      this.setData({
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        address: e.detail.value.address,
        position: e.detail.value.position,
        gender: e.detail.value.gender
      })
      let flag = true;
      let warn = '';
      if (!this.data.name || !this.data.tel || !this.data.gender || !this.data.address || !this.data.position) {
        warn = '请完善信息！';
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
        warn: '请输入正确的姓名！';
      }
      else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
        warn = '请输入正确的手机号！';
      }
      else {
        flag = false;
      }
      if (flag == true) {
        wx.showToast({
          title: warn,
          icon: 'none'
        })
      } else {
        http.request({
          apiName: 'my/applycommondistributor',
          method: 'PUT',
          data: {
            username: this.data.name,
            job: this.data.position,
            familyaddress: this.data.address,
            sex: this.data.gender
          }, 
          success: function(res) {
            wx.showToast({
              title: '申请成功！',
              icon: 'success'
            })
            // wx.navigateTo({
            //   url: '/pages/me/me'
            // })
            wx.switchTab({
              url: '/pages/me/me'
            })
          },
          fail: function(res) {
            console.log(res);
          }
        })
      };
    }
    if (this.data.id == 3) {
      this.setData({
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        homeAddress: e.detail.value.homeAddress,
        position: e.detail.value.position,
        agent: e.detail.value.agent,
        gender: e.detail.value.gender
      })
      let flagone = true;
      let warnone = '';
      if (!this.data.name || !this.data.tel || !this.data.gender || !this.data.homeAddress || !this.data.position || !this.data.agent) {
          warnone = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warnone = '请输入正确的姓名！'
      }else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
          warnone = '请输入正确的手机号！'
      }else {
        flagone = false;
      }
      if (flagone == true) {
        wx.showToast({
          title: warnone,
          icon: 'none'
        })
      } else {
        http.request({
          apiName: 'my/applyagent',
          method: 'PUT',
          data: {
            username: this.data.name,
            job: this.data.position,
            familyaddress: this.data.homeAddress,
            sex: this.data.gender,
            level: this.data.index
          },
          success: function (res) {
            wx.showToast({
              title: '申请成功！',
              icon: 'success'
            })
            wx.switchTab({
              url: '/pages/me/me'
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      };
    }
    if (this.data.id == 2) {
      if(this.data.pid == 2){
        this.setData({
          agent: '2'
        })
      }else{
        this.setData({
          agent: '7'
        })
      }
      this.setData({
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        corporateName: e.detail.value.corporateName,
        corporateAddress: e.detail.value.corporateAddress,
        position: e.detail.value.position
      })
      let flagtwo = true;
      let warntwo = '';
      if (!this.data.name || !this.data.tel || !this.data.corporateName || !this.data.corporateAddress || !this.data.position) {
          warntwo = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warntwo = '请输入正确的姓名！'
      } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
        warntwo = '请输入正确的手机号！'
      } else {
        flagtwo = false;
      }
      if (flagtwo == true) {
        wx.showToast({
          title: warntwo,
          icon: 'none'
        })
      } else {
        http.request({
          apiName: 'my/applypartner',
          method: 'PUT',
          data: {
            username: this.data.name,
            job: this.data.position,
            companyname: this.data.corporateName,
            companyaddress: this.data.corporateAddress,
            level: this.data.agent
          },
          success: function (res) {
            wx.showToast({
              title: '申请成功！',
              icon: 'success'
            })
            wx.switchTab({
              url: '/pages/me/me'
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      };   
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.setData({
      id: options.id,
      pid: options.pid
    })
    console.log(this.data.id);
    if (this.data.id == 1) {
      this.setData({
        showOrdinary: true
      })
    } else if (this.data.id == 3) {
      this.setData({
        showAgent: true
      })
    } else {
      this.setData({
        showCooperation: true
      })
    }
  },
})