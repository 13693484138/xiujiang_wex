const http = require('../../../../utils/http');
const AppConfig = require("../../../../utils/config");
// pages/repair/fault-choose/repair-content/repair-content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    versionID: 0,
    showModal:false,
    versionName: '',
    versionImg: '',
    versionColor: '选择您的机型配色',
    showMore: false,
    showMorePid: -1,
    showModel: false,
    transformFlag: -1,//图标旋转标致
    colors: [],
    color_index: -1,
    pfaultList: [],
    chooseFaultList: [],
    totalPrice: 0.00,
    preOrderNo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      versionID: options.versionID
    })
    /**
     * 请求机器信息
     */
    http.request({
      apiName: "reqair/versioninfo/" + this.data.versionID,
      method: "get",
      success: (res) => {
        var srcPath = AppConfig.apiHost;
        srcPath = srcPath.substr(0, srcPath.length - 4) + 'attachment/download/';
        this.setData({
          versionImg: srcPath + res.img,
          versionName: res.title
        })
      }
    })

    getColors(this);
    /**
     * 请求故障信息
     */
    http.request({
      apiName: "reqair/deviceinfo/" + this.data.versionID,
      method: "get",
      success: (res) => {
        console.log(res)
        for(let i in res){
          var tempFault = res[i].faultList;
          for (let j in tempFault){
            var tempPrice = tempFault[j].fee;
            tempPrice = tempPrice.toFixed(2);
            tempFault[j].fee = tempPrice
          }
          res[i].faultList = tempFault;
        }
        this.setData({
          pfaultList: res
        })
      }
    })
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
  goToConfirmOrder: function () {
   var faultidStr = this.data.chooseFaultList.join(',');
    var params = {
      'versionid': this.data.versionID,
      'color': this.data.versionColor,
      'faultid': faultidStr
    }
    http.request({
      apiName:'reqair/getpreorderno',
      method:'post',
      data: params,
      success:(res) => {
        this.setData({
          preOrderNo:res
        })
        wx.navigateTo({
          url: '/pages/repair/fault-choose/repair-content/confirm-order/confirm-order?addressId=0&preOrderNo=' + this.data.preOrderNo
        })
      }
    })
  
  },
  goToRepairExplain: function () {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/repair-explain/repair-explain'
    })
  },
  alertTips: function () {
    getColors(this);
  },
  changeVersionColor: function (e) {
    var index = e.currentTarget.dataset.index;
    var color = this.data.colors[index];
    this.setData({
      color_index: index,
      versionColor: color,
      showModal: false
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  preventTouchMove: function () { },
  showMoreFault: function (e) {
    var faultpid = e.currentTarget.dataset.faultpid;
    this.setData({
      transformFlag: faultpid
    })
    var versionid = this.data.versionID;
    if (faultpid == this.data.showMorePid) {
      this.setData({
        showMore: !this.data.showMore,
        transformFlag: -1
      })
      console.log(this.data.showMore + "0000000000000")
    } else {
      this.setData({
        showMore: true,
        showMorePid: faultpid
      })
    }
    // this.setData({
    //   showMore: !this.data.showMore
    // })
  },
  checkboxChange: function (e) {
    var chooseArr = e.detail.value;
    var tempChooseFaultList = [];
    var pId = this.data.showMorePid;
    var tempPFaultList = this.data.pfaultList;
    var tempTotalPrice = 0;
    for (var i = 0; i < tempPFaultList.length; i++) {
      var tempPFault = tempPFaultList[i];
      var chooseFaultNumber = 0;
      var tempPrice = 0;
      var tempFaultList = tempPFault.faultList;
      for (var j = 0; j < tempFaultList.length; j++) {
        var tempFault = tempFaultList[j];
        var tempPId = tempFault.faultpid;
        if (tempPId == pId) {//判断顶层故障id是否相等
          var tempId = tempFault.id;
          tempId = tempId + '';
          if (chooseArr.indexOf(tempId) > -1) {
            tempFault.check_ED = true;
          } else {
            tempFault.check_ED = false;
          }
        }
        if (tempFault.check_ED) {
          tempChooseFaultList.push(tempFault.id);
          chooseFaultNumber++;
          tempPrice += parseFloat(tempFault.fee);
        }
      }
      tempTotalPrice += tempPrice;
      tempPFault.chooseFaultNumber = chooseFaultNumber;
    }
    tempTotalPrice = tempTotalPrice.toFixed(2);
    this.setData({
      pfaultList: tempPFaultList,
      totalPrice: tempTotalPrice,
      chooseFaultList: tempChooseFaultList
    })
  },
  changeVersion: function (e) {
    wx.navigateBack({
      url: '../../smx/repair-index/repair-index'
    });
  }

})

function getColors(me){
  http.request({
    apiName: "reqair/versioncolor/" + me.data.versionID,
    method: 'get',
    success: (res) => {
      me.setData({
        colors: res,
        showModal: true
      })
    }
  })
}

function concat_(arr1, arr2) {
  //不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响  
  var arr = arr1.concat();
  //或者使用slice()复制，var arr = arr1.slice(0)  
  for (var i = 0; i < arr2.length; i++) {
    arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
  }
  return arr;
}

