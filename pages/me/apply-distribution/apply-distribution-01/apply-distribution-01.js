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
    showOrdinary: false,
    showCooperation: false,
    showAgent: false,
    Array: ['未分销', '普通分销', '合作伙伴', '高级门店', '高级区代', '高级市代', '高级省代', '高级合作伙伴', '平台区代', '平台市代', '平台省代'],
    index: 0
  },


  changeSelect: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function(e) {
    if (this.data.id == 1) {
      // this.setData({
      //   name: e.detail.value.name,
      //   tel: e.detail.value.tel,
      //   address: e.detail.value.address,
      //   position: e.detail.value.position,
      // })
      // if (e.detail.value.gender == '男') {
      //   this.setData({
      //     gender: 1
      //   })
      // } else {
      //   this.setData({
      //     gender: 2
      //   })
      // }
      // let flag = true;
      // let warn = '';
      // if (!this.data.name || !this.data.tel || !this.data.gender || !this.data.address || !this.data.position) {
      //   warn = '请完善信息！';
      // } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
      //   warn: '请输入正确的姓名！';
      // }
      // else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
      //   warn = '请输入正确的手机号！';
      // }
      // else if (!(/^['男'|'女']$/.test(e.detail.value.gender))) {
      //   warn = '性别请输入男或女！';
      // }
      // else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.address))) {
      //   warn = '请输入详细的地址！';
      // }
      // else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.position))) {
      //   warn = '请输入你的职位！';
      // }
      // else {
      //   flag = false;
      // }
      // if (flag == true) {
      //   wx.showToast({
      //     title: warn,
      //     icon: 'none'
      //   })
      // } else {
        // http.request({
        //   apiName: 'my/applycommondistributor',
        //   method: 'PUT',
        //   data: {
        //     username: this.data.name,
        //     job: this.data.position,
        //     familyaddress: this.data.address,
        //     sex: this.data.gender
        //   }, 
        //   success: function(res) {
        //     wx.showToast({
        //       title: '申请成功！',
        //       icon: 'success'
        //     })
            wx.navigateTo({
              url: '/pages/me/become-distributor/become-distributor'
            })
        //   },
        //   fail: function(res) {
        //     console.log(res);
        //   }
        // })
      // };
    }
    if (this.data.id == 3) {
      this.setData({
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        homeAddress: e.detail.value.homeAddress,
        position: e.detail.value.position,
        agent: e.detail.value.agent
      })
      if (e.detail.value.gender == '男') {
        this.setData({
          gender: 1
        })
      } else {
        this.setData({
          gender: 2
        })
      }
      let flagone = true;
      let warnone = '';
      if (!this.data.name || !this.data.tel || !this.data.gender || !this.data.homeAddress || !this.data.position || !this.data.agent) {
          warnone = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warnone = '请输入正确的姓名！'
      }else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
          warnone = '请输入正确的手机号！'
      } else if (!(/^['男'|'女']$/.test(e.detail.value.gender))) {
          warnone = '性别请输入男或女！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.homeAddress))) {
          warnone = '请输入详细的地址！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.position))) {
          warnone = '请输入你的职位！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.agent))) {
          warnone = '请输入你的代理！'
      } else {
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
            wx.navigateTo({
              url: '/pages/me/become-distributor/become-distributor'
            })
          },
          fail: function (res) {
            console.log(res);
          }
        })
      };
    }
    if (this.data.id == 2) {
      this.setData({
        name: e.detail.value.name,
        tel: e.detail.value.tel,
        corporateName: e.detail.value.corporateName,
        corporateAddress: e.detail.value.corporateAddress,
        position: e.detail.value.position,
      })
      let flagtwo = true;
      let warntwo = '';
      if (!this.data.name || !this.data.tel || !this.data.corporateName || !this.data.corporateAddress || !this.data.position) {
          warntwo = '请完善信息！'
      }else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.name))) {
          warntwo = '请输入正确的姓名！'
      } else if (!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e.detail.value.tel))) {
        warntwo = '请输入正确的手机号！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.corporateName))) {
        warntwo = '请输入你的公司名称！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.position))) {
        warntwo = '请输入你的职位！'
      } else if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(e.detail.value.corporateAddress))) {
        warntwo = '请输入详细的公司地址！'
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
            level: this.data.position
          },
          success: function (res) {
            wx.showToast({
              title: '申请成功！',
              icon: 'success'
            })
            wx.navigateTo({
              url: '/pages/me/become-distributor/become-distributor'
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
    this.setData({
      id: JSON.parse(options.id)
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