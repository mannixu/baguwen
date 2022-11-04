Page({
  data: {
    currentTab: 0
  },
  switchNav: function (e) {
    var page = this;
    var index = e.target.dataset.current;
    if (this.data.currentTab == index) {
      return false;
    } else {
      page.setData({ currentTab: index });
    }
  }
})