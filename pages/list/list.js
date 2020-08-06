// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    title:'',
    contentHeight:800,
    topHead:100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title:options.title
    })
    // wx.setNavigationBarTitle({
    //   title:options.title
    // })
    wx.getStorage({
      key: options.title,
      success: (result)=>{
        this.setData({
          movies:result.data
        })
        console.log(result.data)
      }
    });

      // 设置内容高度
      this.setData({
        contentHeight: wx.app.contentHeight,

        topHead:wx.app.statusHeight + wx.app.navigationHeight
      });
  },
  backAction:function(evt){
   console.log('back')
   wx.db.toast('back')
  },
  homeAction:function(evt){
    console.log('home',evt)
  }


  
})