Page({
  data:{
    subjects:[]
  },
   onLoad:function(){
     this.setData({ subjects:wx.getStorageSync("subjects")});
   },
   switchChange:function(e){
      var status = e.detail.value;
      var id = e.target.id;
      var subjects = wx.getStorageSync("subjects");
      var result = new Array();
      for(var i=0;i<subjects.length;i++){
         if(subjects[i].id==id){
           subjects[i].status = status==true?'1':'2';
         }
         result.push(subjects[i]);
      }
      wx.setStorageSync("subjects", result);
      this.setData({ subjects: result});
   }
})