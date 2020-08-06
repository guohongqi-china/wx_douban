//app.js
App({
  onLaunch: function () {

    wx.app = {};
    let systemInfo = wx.getSystemInfoSync()
    // px转换到rpx的比例
    let pxToRpxScale = 750 / systemInfo.windowWidth;
    // 状态栏的高度
    let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
    // 导航栏的高度
    let navigationHeight = 44 * pxToRpxScale
    // window的宽度
    let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
    // window的高度
    let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
    // 屏幕的高度
    let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
    // 底部tabBar的高度
    let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight

    wx.app.navigationHeight = navigationHeight;
    wx.app.tabBarHeight = tabBarHeight;
    wx.app.statusHeight = ktxStatusHeight;

    if (systemInfo.model.search('iPhone X') != -1) {//IPhoneX底部大约为68rpx
      wx.app.safeHeight = 68
    } else {
      wx.app.safeHeight = 0
    }

    if (systemInfo.model.search('iPhone') != -1) {//IPhoneX底部大约为68rpx
      wx.app.tabBarHeight = 49 * pxToRpxScale
    } else {
      wx.app.tabBarHeight = 48 * pxToRpxScale
    }

    wx.app.bottomBarHeight = wx.app.tabBarHeight + wx.app.safeHeight;
    wx.app.contentHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - wx.app.bottomBarHeight;
    wx.app.topBarHeight    =  ktxStatusHeight +  navigationHeight

    wx.db = {};
    wx.db.url = (url) => {
      return `https://douban.uieee.com/${url}`
    }
    this.initToast();

    // 获取手机系统状态栏导、航栏高度
    const info = wx.getSystemInfoSync();
    wx.db.statusBarHeight = info.statusBarHeight;
    if (info.platform == 'android') {
      wx.db.navBarHeight = 48;
    } else {
      wx.db.navBarHeight = 44;
    }
    wx.db.barHeight = wx.db.statusBarHeight + wx.db.navBarHeight
  },
  initToast: function () {
    // type == 0 正常
    // type == 1 成功信息
    // type == 2 错误信息
    const ToastTypeNormal = 0;
    const ToastTypeSuccess = 1;
    const ToastTypeError = 2;
    let commonToast = (title, type, duration = 1500) => {
      let options = {
        title: title,
        icon: 'none',
        duration: duration
      };
      if (type == ToastTypeSuccess) {
        options.icon = 'success'
      } else if (type == ToastTypeError) {
        options.image = '/imgs/upsdk_cancel_normal.png'
      }
      wx.showToast(options);
    };
    wx.db.toast = (title, duration) => {
      commonToast(title, ToastTypeNormal, duration);
    },
      wx.db.toastSuccess = (title, duration) => {
        commonToast(title, ToastTypeSuccess, duration);

      },
      wx.db.toastError = (title, duration) => {
        commonToast(title, ToastTypeError, duration);
      }
  },

  globalData: {
    userInfo: null
  }
})