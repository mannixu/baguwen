var app = getApp();
Page({
  data:{
    userInfo:{},
    subjects:[],

    imag: ['/images/pract/bgw1.jpeg', '/images/pract/bgw2.jpeg', '/images/pract/bgw3.jpeg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  
  onShow:function(){  //onload  页面加载只调用一次  onshow每次跳到页面都会调用
    var page = this;
    // app.getUserInfo(function(userInfo){
     let user= app.globalData.userInfo //从app获取用户
      page.setData({ 
        userInfo: user});
    // });
    this.loadSubjects();
  },
  loadSubjects:function(){
    var subjects = wx.getStorageSync("subjects");
    var result = new Array();
    for(var i=0;i<subjects.length;i++){
       if(subjects[i].status == "1"){
         result.push(subjects[i]);
       }
    }
    this.setData({ subjects: result});
  },
  more:function(){
    wx.navigateTo({
      url: '../subjects/subjects'
    })
  },
  seeSubject:function(e){
     var name = e.target.id;
     wx.navigateTo({
       url: '../grade/grade?subjectName='+name
     })
  }
})