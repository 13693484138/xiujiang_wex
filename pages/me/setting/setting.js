// pages/me/setting/setting.js
let http = require("../../../utils/http.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "/images/me/head-image.png", //头像
    imgid: '', //上传头像所取回的id
    nickname: '', //昵称
    username: '', //姓名
    phone: '', //手机号
    isBind: false, //是否已经绑定手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // let imgPath = http.config.downloadPath;
    // this.setData({
    //   imgPath: imgPath
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.requestInfo()
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
  //根据微信登录渲染已有信息
  requestInfo() {
    http.request({
      apiName: 'my/getmyinfo',
      method: 'get',
      isShowProgress: true,
      success: res => {
        // console.log(res)
        if (res.avatar !== '' && res.nickname !== '') {
          console.log(res.avatar.substring(0, 5) === "https" && res.avatar.length > 32)
          if (res.avatar.substring(0, 5) === "https" && res.avatar.length > 32) {
            this.setData({
              avatar: res.avatar,
              nickname: res.nickname,
              username: res.username,
              phone: res.phone
            })
          } else {
            this.setData({
              avatar: http.config.downloadInterface + res.avatar,
              nickname: res.nickname,
              username: res.username,
              phone: res.phone
            })
          }

        }
      }
    })
  },
  //更换头像
  changeAvatar() {
    let uploadInterface = http.config.uploadInterface; //上传文件的地址
    let downloadInterface = http.config.downloadInterface; //下载文件地址
    wx.chooseImage({
      count: '1',
      success: res => {
        let uploadPath = res.tempFilePaths[0];
        let token = wx.getStorageSync('_hgc'); //取得token  
        //上传头像取得id
        wx.uploadFile({
          url: uploadInterface,
          filePath: uploadPath,
          name: 'file',
          header: {
            'Authorization': token
          },
          success: res => {
            let obj = JSON.parse(res.data)
            let avatartId = obj.data
            this.setData({
              imgid: avatartId,
              avatar: downloadInterface + avatartId
            })

          }
        })
      },
    })
  },
  //失焦事件拿取已输入的手机号
  getPhoneNum(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getCode() {
    console.log(this.data.phone)
    http.request({
      apiName: `my/changepasswordcode/${this.data.phone}`,
      method: 'get',
      isShowProgress: true,
      success: res => {
        console.log(res)
      }
    })
  },
  //表单提交
  saveData(e) {
    console.log(e.detail.value)
    let values = e.detail.value;
    values.imgid = this.data.imgid
    //表单验证---判断昵称姓名手机号是否为空
    if(values.nickname===""){
      wx.showToast({
        image:'../../../images/icon/err.png',
        title: '昵称不能为空',
      })
      return false;
    }
    if(values.username===""){
      wx.showToast({
        image: '../../../images/icon/err.png',
        title: '姓名不能为空',
      })
      return false;
    }
    if(values.code===""){
      wx.showToast({
        image: '../../../images/icon/err.png',
        title: '验证码不能为空',
      })
      return false;
    }        
    //人机交互--弹窗
    wx.showModal({
      title: '提示',
      content: '请确认你修改的信息',
      success: res => {
        if (res.confirm) {
          console.log(values)
          this.submitRequest(values)
        }
      }
    })
  },
  //提交请求
  submitRequest(json) {
    http.request({
      apiName: `my/updateMyInfo`,
      method: 'put',
      data: json,
      isShowProgress: true,
      success: res => {
        if (res.phone !== "") {
          wx.showToast({
            title: '保存成功',
          })
        }
        wx.navigateBack({})
      }
    })
  },
})