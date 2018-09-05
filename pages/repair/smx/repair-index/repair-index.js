const http = require('../../../../utils/http');
const AppConfig = require("../../../../utils/config");
// pages/repair/repair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandindex:0,
    brandList : [],
    brandVersionList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getBrandList(this);
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
  sectionLeftClick: function (e) {
    var listIndex = e.currentTarget.dataset.index;
    this.setData({
      brandindex: listIndex
    });
    var brandid = this.data.brandList[listIndex].id;
    getVersionList(brandid,this);
  }

});
function getVersionList(brandid,me){
  http.request({
    apiName: "reqair/versionlist/"+brandid,
    method: 'get',
    success: (res) => {
      me.setData({
        brandVersionList: res,
      })
      var tempList = me.data.brandVersionList;
      var srcPath = AppConfig.apiHost;
      srcPath = srcPath.substr(0, srcPath.length - 4) + 'attachment/download/';
      for (var i in tempList){
        var tempVersionList = tempList[i].versionList;
        for(var j in tempVersionList){
          var tempSrcPath = srcPath;
          var tempImg = tempVersionList[j].img;
          tempSrcPath = tempSrcPath + tempImg; 
          tempVersionList[j].img = tempSrcPath;
        }
      }
        me.setData({
          brandVersionList:tempList
        })
    }
  })
};
function getBrandList(me) {
  http.request({
    apiName: "reqair/brandlist",
    method: 'get',
    success: (res) => {
      if(res.length > 0){
        me.setData({
          brandList: res,
        })
        var brandid = me.data.brandList[me.data.brandindex].id;
        getVersionList(brandid, me);
      }
    }
  })
}
