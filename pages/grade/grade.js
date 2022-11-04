Page({
  data:{
    currentTab:0
  },
  onLoad:function(e){
     var subjetcName = e.subjectName;
     wx.setNavigationBarTitle({ title: subjetcName});
  },
  switchNav:function(e){
    var page = this;
    var index = e.target.dataset.current;
    if (this.data.currentTab==index){
      return false;
    }else{
      page.setData({ currentTab: index});
    }
  },
  edit:function(){
    wx.navigateTo({
      url: '../base/base'
    })
  }
})