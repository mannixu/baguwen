Page({
  data:{
    currentTab:0,
    chapterTitle:'',
    chapter:[],//存放章节数据data
    unit:[],//二维数组存放多个章节的多个小节数据data
    unitid:'',//小节所属章节   解决bug章节打开状态都有相同数据
    unitflag:[],  //是否展示小节
    num:[
      "一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","其他"
    ],
    img:{//动态图片
      close:"/images/icon/shousuo.jpg",
      open:"/images/icon/zhankai.jpg"
    },
    imag:[]//每个章节是开是关
  },
  changedata(e){
      // console.log(e)
    



      var that = this;
      let index = 0;
      // console.log(that)
      let array = that.data.chapter.data;//获取循环数组对象
      let initunitflag=that.data.unitflag;//存放是否展示小节的变量
      let imag=that.data.imag; //存放展示+或-图标的变量
      let n=e.currentTarget.dataset.nums;//获取传递参数
      let twunit=that.data.unit;//获取存放小节的二维数组 用于下面设置值

      for (var i = 0; i < array.length; ++i) {

         //如果当前点击的对象id和循环对象里的id一致
         
         let a=array[i].id;
         
         if (a == n) {
          
          //设置小节状态图片打开或关闭
          if(imag[i]==""||imag[i]== undefined){
            imag[i]="true";
          }else{
            imag[i]="";
          }
          
          //设置小节打开关闭
          if (initunitflag[i] == "" || initunitflag[i] == undefined) {
            initunitflag[i] = "true"
          
          } else {
            initunitflag[i] = ""
          }
        }
        index++;
      }
      // console.log(initunitflag)
      
      //将数据动态绑定 
      that.setData({
        unitflag: initunitflag,
        imag: imag
        
      });
  








    //发请求
    if(imag[n-1]=='true'){ //在关闭状态 点击发送请求
     wx.request({
       method:'get',//依据接口情况
       url: 'http://127.0.0.1:8080/baguwen/unit/findUnitByChapterTitle',//微信小程序必须是https:
       data: {
         chapterName:e.currentTarget.dataset.titles
       },
       header:{
         'content-type': 'application/json' // 默认值
       },
       success(res){
          console.log(res)
          //给数组一维下标n赋值一个数组
         
          twunit[n-1]=res.data  //n为章节id 要减一为下标
          that.setData({
            
            unit:twunit
            
          
            // unitflag:!that.data.unitflag//动态显示子节点
            
           
          })
          // console.log(that.data.topic)
          
       },
       fail(err){
          console.log(err)
       }
     })
    }
    
},

  onLoad:function(e){
     var subjetcName = e.subjectName;
     wx.setNavigationBarTitle({ title: subjetcName});

     var that = this;
     wx.request({
       method:'get',//依据接口情况
       url: 'http://127.0.0.1:8080/baguwen/chapter/findCapterByCourse',//微信小程序必须是https:
       data: {
         courseTitle:'八股文'
       },
       header:{
         'content-type': 'application/json' // 默认值
       },
       success(res){
          console.log(res)
          that.setData({
            chapter:res.data

            
          })
          

          
       },
       fail(err){
          console.log(err)
       }
     })

    

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
  
  edit:function(e){
    // console.log(e)


    
    let chapterName=e.currentTarget.dataset.chaptername;  //传参在e里 参数名都改为小写
    let unitName=e.currentTarget.dataset.unitname;
    chapterName=(chapterName==undefined?'':chapterName);//处理一下underfined
    unitName=(unitName==undefined?'':unitName);
    
    // console.log('../base/base?chapterName='+chapterName+'&unitName='+unitName)
    wx.navigateTo({
      url: '../base/base?chapterName='+chapterName+'&unitName='+unitName
    })
  }
})