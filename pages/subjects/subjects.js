Page({
  data:{
    subjects:[]
  },
   onLoad:function(){
     this.setData({ subjects:wx.getStorageSync("subjects")});
   },
   switchChange:function(e){
     //获取科目状态
      var status = e.detail.value;
      //获取科目id
      var id = e.target.id;
      //本地缓存获取数据
      var subjects = wx.getStorageSync("subjects");
      var result = new Array();
      for(var i=0;i<subjects.length;i++){
         if(subjects[i].id==id){
           //获取被点击的组件修改它状态
           subjects[i].status = status==true?'1':'2';
         }
         result.push(subjects[i]);
      }
      //放到本地缓存
      wx.setStorageSync("subjects", result);
      this.setData({ subjects: result});

      //此页面调用完刷新上一个页面
      var pages = getCurrentPages();
    if (pages.length > 1) {
    //上一个页面实例对象
    var prePage = pages[pages.length - 2];
    //关键在这里,这里面是触发上个界面
    prePage.onLoad();
    }
      
   }
})