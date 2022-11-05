Page({
  data:{
    currentTab:0,
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
   
    onLoad(options){//生命周期函数 每次页面加载 从option取穿过来参数
      var that = this;
      console.log(options.chapterName)
      console.log(options.unitName)
    wx.request({
      method:'get',//依据接口情况
      url: 'http://127.0.0.1:8080/baguwen/topic/order',//微信小程序必须是https:
      data: {
        chapterTitle:options.chapterName,
        unitName:options.unitName
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success(res){
         console.log(res)
         that.setData({
           topic:res.data,
           
          
         })
         console.log(that.data.topic)
         
      },
      fail(err){
         console.log(err)
      }
    })
    // wx.showLoading({
    //   title: '加载中',
    // })
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)

    },
  // changeData(){
  //   var that = this;
  //   wx.request({
  //     method:'get',//依据接口情况
  //     url: 'http://127.0.0.1:8080/baguwen/topic/order',//微信小程序必须是https:
  //     data: {
  //       chapterTitle:'八股文'
  //     },
  //     header:{
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res){
  //        console.log(res)
  //        that.setData({
  //          topic:res.data,
           
          
  //        })
  //        console.log(that.data.topic)
         
  //     },
  //     fail(err){
  //        console.log(err)
  //     }
  //   })
  // },
  truntopic(e){
    console.log(e)
    var page=this
    let num1=e.currentTarget.dataset.num1;
    
    page.setData({
      currentTab:num1
    })
  },
  changeContent:function(e){
    console.log(e);
      var current = e.detail.current;

     this.setData({ currentTab: current});
  }


})