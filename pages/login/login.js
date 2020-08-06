// pages/login/login.js
Page({
  wechatLogin:function(){
    
  },
  doubanLogin:function () {
    
  },
  data:{
    barTop:Number,
    contentHeight:800,
  },
  onLoad:function(){
    this.setData({
      barTop:wx.app.topBarHeight ,
      contentHeight:wx.app.contentHeight ,
    })
  },
  openAgreement(){
    wx.navigateTo({
      url: '/pages/agreement/agreement',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})