Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarActiveIndex: 0,
    navScrollLeft: 0,
    navbarTitle: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7"
    ],
    navbarTitle1: [
      { id: 0, navbarTitle2: [{ id: 0, name: "1" }, { id: 1, name: "2" },]},
      { id: 1, navbarTitle2: [{ id: 0, name: "3" }, { id: 1, name: "33" },] },
      { id: 2, navbarTitle2: [{ id: 0, name: "4" }, { id: 1, name: "44" },] },
      { id: 3, navbarTitle2: [{ id: 0, name: "5" }, { id: 1, name: "55" },] },
      { id: 4, navbarTitle2: [{ id: 0, name: "6" }, { id: 1, name: "66" },] },
      { id: 5, navbarTitle2: [{ id: 0, name: "7" }, { id: 1, name: "77" },] },
     
    ]
  },
  onLoad: function() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (navbarTapIndex - 2) * singleNavWidth
    })
    if (this.data.navbarActiveIndex == navbarTapIndex) {
      return false;
    } else {
      this.setData({
        navbarActiveIndex: navbarTapIndex
      })
    }
    // this.setData({
    //   navbarActiveIndex: navbarTapIndex
    // })
  },

  /**
   * 
   */
  onBindAnimationFinish: function({
    detail
  }) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    let navbarTapIndex = detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (navbarTapIndex - 2) * singleNavWidth
    })
    if (this.data.navbarActiveIndex == navbarTapIndex) {
      return false;
    } else {
      this.setData({
        navbarActiveIndex: detail.current
      })
    }

  }
})