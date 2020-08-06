// cmps/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '豆瓣'
    },
    titleColor:{
      type: String,
      value: '#000'
    },
    titleSize:{
      type:Number,
      value:30
    },
    titleWeight:{
      type:String,
      value:'normal'
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: '#fff'
    },
    back: {
      type: String,
      value: 'true'
    },
    home: {
      type: String,
      value: 'true'
    },



  },

  /**
   * 组件的初始数据
   */
  data: {
    // statusBarHeight:20,
    // navBarHeight:100,
    statusBarStyle: '', // 状态栏样式
    navBarStyle: ''     // 导航栏样式

  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    back:function(){
      wx.navigateBack({})
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('eventAction', myEventDetail, myEventOption)
      // wx.navigateBack({})
    },
    home:function(){
      wx.navigateBack({
        delta:999
      })
      this.triggerEvent('home')

    }

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
    },
    hide: function () { },
    resize: function () { },
  },
  lifetimes: {
    attached: function () {
      const statusBarStyle = `height: ${wx.app.statusHeight}rpx;
      background-color:${this.data.statusBarColor};
      `;
      const navBarStyle = `
      color:${this.data.titleColor};
      height:${wx.app.navigationHeight}rpx;
      font-size: ${this.data.titleSize}rpx;
      font-weight: ${this.data.titleWeight};
      padding-top:12rpx;
      background-color:${this.data.navBarColor};
      `
      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle,
      })
    }
  }
})
