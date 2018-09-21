// pages/repair/fault-choose/repair-content/confirm-order/confirm-order.js
var util = require('../../../../../utils/util.js');
const http = require('../../../../../utils/http');
const AppConfig = require("../../../../../utils/config");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTop: true,
    showModal: false,
    radioData: 1,
    showDate: false,
    preOrderNo: '',
    addressId: 0,
    repairObj: {},
    address: {},
    recommendationNetworkId: 0,
    recommendationNetwork:{},
    dateList:[],
    dateIndex: 0,
    date:'今天',
    curDate:'',
    tempCurDate:'',
    timeList:[],
    timeIndex:0,
    time:'立即服务',
    curTime:'',
    tempCurTime:'',
    orderRemarks:'ssss',
    orderNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      preOrderNo: options.preOrderNo,
      addressId: options.addressId,
      showTop: false
    })
    http.request({
      apiName: 'reqair/getdefaultaddress',
      method: 'get',
      success: (res) => {
        console.log(res);
        if(res != null && res != ''){
        this.setData({
          address: res,
          addressId: res.id
        })

        }
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
    if (this.data.addressId > 0) {
      http.request({
        apiName: 'reqair/getOneAddress/' + this.data.addressId,
        method: 'get',
        success: (res) => {
          this.setData({
            address: res,
            showTop: false
          })
          if (this.data.radioData > 1){
            if (this.data.recommendationNetworkId > 0){
              getRecommendationById(this, this.data.recommendationNetworkId)
            }else{
              getRecommendation(this,this.data.addressId)
            }
          }
        }
      })
    }

    if (this.data.radioData == 1){
      getDateList(this);
    }

    var srcPath = AppConfig.apiHost;
    srcPath = srcPath.substr(0, srcPath.length - 4) + 'attachment/download/';
    http.request({
      apiName: 'reqair/getfaultinfo/' + this.data.preOrderNo,
      method: 'get',
      success: (res) => {
        var faultList = res.faultList;
        for(let i in faultList){
          var tempImg = faultList[i].versionimg;
          tempImg = srcPath + tempImg;
          faultList[i].versionimg = tempImg;
        }
        this.setData({
          repairObj: res
        })
      }
    })



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
  goToAddAddress: function () {
    wx.navigateTo({
      url: '/pages/repair/fault-choose/repair-content/confirm-order/choose-address/choose-address?preOrderNo=' + this.data.preOrderNo
    })
  },
  alertTips: function () {
    if (this.data.addressId <= 0) {
      showRemind("请先选择服务地址");
    } else {
      this.setData({
        showModal: true
      })
    }
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  preventTouchMove: function () {
  },
  radioChange: function (event) {
    var radioValue = event.detail.value;
    this.setData({
      showModal: false
    })
    if (this.data.addressId > 0){
      if (radioValue > 1){
        getRecommendation(this, this.data.addressId);
        this.setData({
          radioData: radioValue,
          dateList:[]
        })
      }else{
        getDateList(this)
      }
    }else{
      showRemind("请先选择服务地址");
    }
  },
  goToRecommendShop: function () {
    if (this.data.addressId > 0) {
      wx.navigateTo({
        url: '/pages/repair/fault-choose/repair-content/confirm-order/recommend-shop/recommend-shop?addressId=' + this.data.addressId
      })
    } else {
      showRemind("请先选择服务地址");
    }
  },
  hideModal1: function () {
    this.setData({
      showDate: false
    });
  },
  chooseDate: function () {
    this.setData({
      showDate: true
    })
  },
  chooseRepairDate:function (e) {
    var tempDateIndex = e.currentTarget.dataset.dateindex;
    var tempRepairDate = e.currentTarget.dataset.curdate;
    var tempTimeList = this.data.dateList[tempDateIndex].time;
    this.setData({
      dateIndex: tempDateIndex,
      tempCurDate: tempRepairDate,
      timeList: tempTimeList,
      timeIndex:0,
      tempCurTime:this.data.timeList[this.data.timeIndex]
    })
  },
  chooseRepairTime:function (e) {
    var tempTimeIndex = e.currentTarget.dataset.timeindex;
    var tempTime = this.data.timeList[tempTimeIndex];
    this.setData({
      timeIndex: tempTimeIndex,
      tempCurTime: tempTime
    })
  }, 
  enterDate:function (e) {
    console.log(this.data.tempCurDate + '-----' + this.data.tempCurTime)
    if (this.data.tempCurDate != '' && this.data.tempCurTime != ''){
        this.setData({
          date:this.data.dateList[this.data.dateIndex].date,
          time:this.data.timeList[this.data.timeIndex],
          curDate: this.data.tempCurDate,
          curTime:this.data.tempCurTime,
          showDate: !this.data.showDate
        })
    }
  },
  enterOrder:function (e) {
    let params = {};
    let addressId = this.data.addressId;
    if(addressId <= 0){
      showRemind("请选择服务地址")
    }
    params['addressid'] = addressId;
    let radioData = this.data.radioData;
    params["repairtype"] = radioData
    if (radioData == 1){
      params["sendtime"] = this.data.curDate +' '+this.data.curTime
    }else{
      params["shopid"] = this.data.recommendationNetworkId;
    }
    params["preorderno"] = this.data.preOrderNo;
    params["remark"] = this.data.orderRemarks;
    console.log(params);
    http.request({
      apiName:'reqair/submitorder',
      method:'post',
      data:params,
      success:(res) => {
        this.setData({
          orderNo:res
        })
        wx.navigateTo({
          url: '/pages/order/repair/repair?orderNo='+this.data.orderNo+'&status=1'
        })
      }
    })
  }
})
/**
 * 根据地址查询离它最近的服务站点
 */
function getRecommendation(me, addressId){
  http.request({
    apiName: 'reqair/getnearbyshop/' + addressId,
    method: 'get',
    success: (res) => {
      me.setData({
        recommendationNetwork: res,
        recommendationNetworkId: res.id
      })
    }
  })
}
function getRecommendationById(me,id){
  http.request({
    apiName:'reqair/getShopById/'+id,
    method:'get',
    success: (res) => {
      me.setData({
        recommendationNetworkId: res.id,
        recommendationNetwork: res
      })
    }
  })
}

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

function getDateList(me){
  http.request({
    apiName:'reqair/getrepairdate',
    method:'get',
    success:(res) => {
      console.log(res)
      me.setData({
        dateList:res,
        timeList: res[me.data.dateIndex].time,
        radioData: 1,
        curDate: res[me.data.dateIndex].curdate,
        tempCurDate: res[me.data.dateIndex].curdate,
        curTime: res[me.data.dateIndex].time[me.data.timeIndex],
        tempCurTime: res[me.data.dateIndex].time[me.data.timeIndex],
        recommendationNetworkId: 0,
        recommendationNetwork: {}
      })
      console.log(me.data.timeList)
    } 
  })
}