// pages/order/comment/comment.js
const http = require('../../../utils/http');
const util = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhpjStar: 5,
    zhpjStarg: 0,
    fwtdStar: 5,
    fwtdStarg: 0,
    wxjsStar: 5,
    wxjsStarg: 0,
    mycdStar: 5,
    mycdStarg: 0,
    orderno: '',
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderno: options.id
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
  starClick: function(e) {
    var starType = e.currentTarget.dataset.in;
    if ('fwtdStar' == starType) {
      let tempStargNum = Number(e.currentTarget.id);
      if (this.data.fwtdStar > 0) {
        tempStargNum = tempStargNum + this.data.fwtdStarg;
      }
      this.setData({
        fwtdStarg: tempStargNum,
        fwtdStar: 5 - tempStargNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    } else if ('fwtdStarg' == starType) {
      let tempStarNum = Number(e.currentTarget.id);
      if (this.data.fwtdStar > 0) {
        tempStarNum = tempStarNum + this.data.fwtdStar;
      }
      this.setData({
        fwtdStar: tempStarNum,
        fwtdStarg: 5 - tempStarNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    } else if ('wxjsStar' == starType) {
      let tempStargNum = Number(e.currentTarget.id);
      if (this.data.wxjsStarg > 0) {
        tempStargNum = tempStargNum + this.data.wxjsStarg;
      }
      this.setData({
        wxjsStarg: tempStargNum,
        wxjsStar: 5 - tempStargNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    } else if ('wxjsStarg' == starType) {
      let tempStarNum = Number(e.currentTarget.id);
      if (this.data.wxjsStar > 0) {
        tempStarNum = tempStarNum + this.data.wxjsStar;
      }
      this.setData({
        wxjsStar: tempStarNum,
        wxjsStarg: 5 - tempStarNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    } else if ('mycdStar' == starType) {
      let tempStargNum = Number(e.currentTarget.id);
      if (this.data.mycdStarg > 0) {
        tempStargNum = tempStargNum + this.data.mycdStarg;
      }
      this.setData({
        mycdStarg: tempStargNum,
        mycdStar: 5 - tempStargNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    } else if ('mycdStarg' == starType) {
      let tempStarNum = Number(e.currentTarget.id);
      if (this.data.mycdStar > 0) {
        tempStarNum = tempStarNum + this.data.mycdStar;
      }
      this.setData({
        mycdStar: tempStarNum,
        mycdStarg: 5 - tempStarNum
      })
      var score = this.data.fwtdStarg + this.data.wxjsStarg + this.data.mycdStarg;
      score = parseInt(score / 3);
      this.setData({
        zhpjStarg: score,
        zhpjStar: 5 - score
      })
    }
  },
  getComment: function(event) {
    this.setData({
      comment: event.detail.value
    })
  },
  submitComment: function() {
    if (this.data.comment == null || this.data.comment == ""){
      util.showRemind("请填写维修评价");
    }
    http.request({
      apiName: 'order/commentorder',
      method: 'PUT',
      isShowProgress: true,
      progressTitle: "评论中...",
      data: {
        orderno: this.data.orderno,
        comment: this.data.comment,
        score: this.data.zhpjStarg,
        servscore: this.data.fwtdStarg,
        techscore: this.data.wxjsStarg,
        satiscore: this.data.mycdStarg
      },
      success: res => {
        wx.showToast({
          title: '评论成功',
          duration:1000,
          icon:'success',
          success: res => {
            wx.switchTab({
              url: '/pages/order/home-page/home-page',
            })
          }
        })
      }
    })
  }
})