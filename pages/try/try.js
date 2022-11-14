Page({
  data:{
    currentTab:1,
    topic:[],

    answer: null,
    
      chapterTitle: '八股文',
      count: 1,
      createTime: "2022-11-03T23:03:55",
      errorList: "上海,昆明,深圳",
      id: 1,
      listError:[
      "上海",
      "昆明",
      "深圳"
    ],
      length:'3',
      listTrue: ["云南"],
      topicName: "",
      trueList: "云南",
      type: 1,
      updateTime: "2022-11-04T09:34:18.405",

    },
   

  changeData(){
    var that = this;
    wx.request({
      method:'get',//依据接口情况
      url: 'http://43.139.60.104:8080/baguwen/topic/order',//微信小程序必须是https:
      data: {
        chapterTitle:'八股文'
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success(res){
        //  console.log(res)
         that.setData({
           topic:res.data,
           
          
         })
        //  console.log(that.data.topic)
         
      },
      fail(err){
        //  console.log(err)
      }
    })
  },
  changeContent:function(e){
    // console.log(e);
     var current = e.detail.current;
     this.setData({ currentTab: current+1});
  }


})