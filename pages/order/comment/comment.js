// pages/order/comment/comment.js
const http = require('../../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [false, false, false, false, false],
    stars1: [false, false, false, false, false],
    stars2: [false, false, false, false, false],
    stars3: [false, false, false, false, false],
    text: '非常好',
    text1: '非常好',
    text2: '非常好',
    text3: '非常好',
    score: 5,
    servscore: 5,
    techscore: 5,
    satiscore: 5,
    orderno: '',
    comment: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderno: options.id
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
  starClick1: function(event) {
    var servscore = 5;
    var index = event.currentTarget.dataset.id + 1;
    var newStars = [];
    for(var i = 1; i <= 5; i++) {
      newStars.push(i > index);
    }
    var text = '';
    if(index == 5) {
      text = '非常好';
      servscore = 5;
    }else if(index == 4) {
      text = '很好';
      servscore = 4;
    }else if(index == 3) {
      text = '不错';
      servscore = 3;
    }else if(index == 2) {
      text = '一般';
      servscore = 2;
    }else if(index == 1) {
      text = '较差';
      servscore = 1
    }
    for (var item of this.data.stars2) {
      if (!item) {
        index++;
      }
    }
    for (var item of this.data.stars2) {
      if (!item) {
        index++;
      }
    }
    var newstars2 = [];
    for (var i = 1; i <= 5; i++) {
      newstars2.push(i > (index/3));
    }
    var text2 = ''
    if(index/3 >= 5) {
      text2 = '非常好'
    }else if(index/3 >= 4) {
      text2 = '很好'
    }else if(index/3 >= 3) {
      text2 = '不错'
    }else if(index/3 >= 2) {
      text2 = '一般'
    }else if(index/3 >= 1) {
      text2 = '较差'
    }
    this.setData({
      stars: newstars2,
      text: text2,
      stars1: newStars,
      text1: text,
      servscore: servscore
    })
  },
  starClick2: function (event) {
    var techscore = 5;
    var index = event.currentTarget.dataset.id + 1;
    var newStars = [];
    for (var i = 1; i <= 5; i++) {
      newStars.push(i > index);
    }
    var text = '';
    if (index == 5) {
      text = '非常好';
      techscore = 5
    } else if (index == 4) {
      text = '很好';
      techscore = 4
    } else if (index == 3) {
      text = '不错';
      techscore = 3
    } else if (index == 2) {
      text = '一般';
      techscore = 2
    } else if (index == 1) {
      text = '较差';
      techscore = 1
    }
    for (var item of this.data.stars1) {
      if (!item) {
        index++;
      }
    }
    for (var item of this.data.stars3) {
      if (!item) {
        index++;
      }
    }
    var newstars2 = [];
    for (var i = 1; i <= 5; i++) {
      newstars2.push(i > (index / 3));
    }
    var text2 = ''
    if (index / 3 >= 5) {
      text2 = '非常好'
    } else if (index / 3 >= 4) {
      text2 = '很好'
    } else if (index / 3 >= 3) {
      text2 = '不错'
    } else if (index / 3 >= 2) {
      text2 = '一般'
    } else if (index / 3 >= 1) {
      text2 = '较差'
    }
    this.setData({
      stars: newstars2,
      text: text2,
      stars2: newStars,
      text2: text,
      techscore: techscore
    })
  },
  starClick3: function (event) {
    var satiscore = 5;
    var index = event.currentTarget.dataset.id + 1;
    var newStars = [];
    for (var i = 1; i <= 5; i++) {
      newStars.push(i > index);
    }
    var text = '';
    if (index == 5) {
      text = '非常好';
      satiscore: 5
    } else if (index == 4) {
      text = '很好';
      satiscore = 4
    } else if (index == 3) {
      text = '不错';
      satiscore = 3
    } else if (index == 2) {
      text = '一般';
      satiscore = 2
    } else if (index == 1) {
      text = '较差';
      satiscore = 1
    }
    for(var item of this.data.stars1){
      if(!item) {
        index++;
      }
    }
    for (var item of this.data.stars2) {
      if (!item) {
        index++;
      }
    }
    var newstars2 = [];
    for (var i = 1; i <= 5; i++) {
      newstars2.push(i > (index / 3));
    }
    var text2 = ''
    if (index / 3 >= 5) {
      text2 = '非常好'
    } else if (index / 3 >= 4) {
      text2 = '很好'
    } else if (index / 3 >= 3) {
      text2 = '不错'
    } else if (index / 3 >= 2) {
      text2 = '一般'
    } else if (index / 3 >= 1) {
      text2 = '较差'
    }
    this.setData({
      stars: newstars2,
      text: text2,
      stars3: newStars,
      text3: text,
      satiscore: satiscore
    })
  },
  getComment: function(event) {
    this.setData({
      comment: event.detail.value
    })
  },
  submitComment: function() {
    this.setData({
      score: parseInt((this.data.servscore + this.data.techscore + this.data.satiscore) / 3)
    })
    console.log(this.data.score+'---'+this.data.servscore+'---'+this.data.techscore+'---'+this.data.satiscore);
    console.log(this.data.comment);
    http.request({
      apiName: 'order/commentorder',
      method: 'PUT',
      data: {
        orderno: this.data.orderno, comment: this.data.comment,
        score: this.data.score, servscore: this.data.servscore,
        techscore: this.data.techscore, satiscore: this.data.satiscore},
      success: function(res) {
        console.log(res);
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }
})