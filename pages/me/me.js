var app = getApp();
Page({

  data:{
    userInfo:''
  },
  onShow:function(){
    var page = this;
    // app.getUserInfo(function (userInfo){
    //   page.setData({ userInfo:userInfo});
    // });
    let userInfo=app.globalData.userInfo
    page.setData({
      userInfo:userInfo
    })
  },

  userdetail(){
    let islogin=app.globalData.is_login
    if (!islogin) {  //判断用户是否登录 
      wx.showToast({//打印错误信息
        title: '用户未登录',
        icon: 'none',
        duration: 1000
      })
      wx.navigateTo({  //未登录 跳转登录页面
        url: '../logincode/logincode',
      })
    }else{  //登录跳转用户信息页面
      wx.navigateTo({  //未登录 跳转登录页面
        url: '../medetail/medetail',
      })
    }
  }
})