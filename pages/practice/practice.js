var app = getApp();
Page({
  data:{
    userInfo:{},
    subjects:[]
  },
  onLoad:function(){
    var page = this;
    app.getUserInfo(function(userInfo){
      page.setData({ userInfo: userInfo});
    });
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
       url: '../grade/grade?subjectName='+name+"|免费"
     })
  }
})