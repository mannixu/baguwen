Page({
  data:{
    currentTab:0,//swiper 当前页数
    topic:[], //题目集合
    results:[],//题目未提交是题目是否回答，提交题目回答结果true false
    fillvalue:[],//判断填空题是否有数据标志符   true ''
    chapterName:'',//接收初次访问页面传过来章节用于 继续练习传参数
    unitName:'',//接收初次访问页面传过来小节 用于继续练习传参数
    inputtwo:[], //实时的填空值
    radiosflag:true,  //是否提交标志符 用于提交完展示题目
    selectflag:[], // 我选的答案的顺序集合

    

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
      // console.log(options.chapterName)
      // console.log(options.unitName)
      this.setData({
        chapterName:options.chapterName,
        unitName:options.unitName
      })
    wx.request({
      method:'get',//依据接口情况
      url: 'http://43.139.60.104:8080/baguwen/topic/order',//微信小程序必须是https:
      data: {
        chapterTitle:options.chapterName,
        unitName:options.unitName
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
  
  truntopic(e){//选择题的点击事件  跳转下一页与设置选择题有值
    // console.log(e)
    var page=this
    //获取参数跳转那一页
    let renum1= e.currentTarget.dataset.num1//1_2 传过来第一题第二个答案
    let num1=renum1.charAt(0);//获取第几题
    let seleid=renum1.charAt(2);//表示第几个答案 用于展示那个是我选的
    let setsele=this.data.selectflag;
    //获取data里做题结果results
    let isresult=this.data.results
    setsele[num1-1]=seleid  //把我选的答案顺序放到集合里
    //如果为空情况点击 设置true有值  如果非空情况点击 去掉值  设置flase没值
    if(isresult[num1-1]==""||isresult[num1-1]==undefined||isresult[num1-1]==false){
      isresult[num1-1]=true //选择题做题结果 true代表不空显示蓝色
    }else{
      // isresult[num1-1]=""
    }
    this.setData({
      results:isresult,
      selectflag:setsele
    })
    // console.log(this.data.results)

    page.setData({
      currentTab:num1  //设置跳转下一页
      
    })
  },
  changeContent:function(e){
    // console.log(e);
      var current = e.detail.current;

     this.setData({ currentTab: current});
  },
  submitData(event){  //提交题目效验 错题入库  题目记录 number+1
    let that=this
    let result=  event.detail.value;
    //题目答题结果
    let newresult=[]
    //错误题目结果
    let errorid=[]
   
    let topic=that.data.topic;

   
    const keys = Object.keys(result)
    const values=Object.entries(result)//传过来参数
    // console.log(values)
    let index=0;  //用于题目遍历
    let erid=0;  //用于存放错误题目集合的索引
    let flag=true; //用于判断填空题做的可对
    let nums=0;//用于判断填空题问题个数
    
    
    for (let key in values) {
      //获取正确答案集合
      let listtrue=topic.data[index].listTrue
      //获取题目id
      let topicid=topic.data[index].id
      //获取答案名前缀
      let rename=values[key][0].substring(0,5)
      //获取提交答案值
      let revalue=values[key][1]
     
      // console.log(values[key])
      if(rename=="radio"){
        //选择题处理逻辑
        
        if(revalue==listtrue[0]){//答对
          newresult[index]=true
         
        
        }else{
          newresult[index]=false //向结果集合存答题情况
          errorid[erid]=topicid   //向错题id结合存错题id
          erid++
         
        }
        
        index++
      }

        
        //填空题处理逻辑
        
        if(rename=="topic"){
          //题目次数
        let g= values[key][0]
        let z=g.charAt(5)
        let f=values[key][0].charAt(5)
         let topid= values[key][0].charAt(5)
         //题目哪个个问题
         let qusid=values[key][0].charAt(12)
         //正确答案 
         let trueresult=listtrue[qusid]
         
         //判断
         if(revalue==trueresult){
          
         }else{ //不正确
          flag=false  //有一个问题不正确 则flag标志设置为false 表示此题错误
         }

         //设置结果结合newresult和errorid 错题id集合
         if(nums<listtrue.length-1){//  小于问题个数
          nums++
         }else{ //等于问题个数即当前题目最后一个问题
           if(flag){ //问题都回答正确
            newresult[index]=true
           
           }else{//有问题回答错误
            newresult[index]=false  //向结果集合存答题情况
            errorid[erid]=topicid   //向错题id结合存错题id
            erid++
            flag=true     //重置flag
           }
           nums=0  //重置nums
           index++  //表示问题遍历完开始遍历下一题
         }

         
        }
        
        
      }//循环结束 获取到 错误id接 errorid  和newrsult 题目结果集合
     
      //把答题情况设置到data里
      that.setData({
        results:newresult,
        radiosflag:false  //表示已经提交过
        
      })
      
      // console.log(errorid)
      // console.log(newresult)
      // console.log(JSON.stringify(errorid))
      let eid=JSON.stringify(errorid)  //数组类型 先转为字符串 再转对象才能传参成功
      
      // console.log(JSON.parse(eid))
      let re =JSON.parse(eid)
      //把错题返回服务器保存
      wx.request({
        method:'post',//依据接口情况
        url: 'http://43.139.60.104:8080/baguwen/topic/errorid',//微信小程序必须是https:
        data: {
          errorId:JSON.parse(eid),
          
          userId:1     //没做登录先设置为1
        },
        header:{
          'content-type': 'application/json' // 默认值
        },
        success(res){
          // 没有返回结果后面可以设置预测分 
        },
        fail(err){
          //  console.log(err)
        }
      })



    },
  
    
//输入框失去焦点事件
  bloselur(e){

    let that=this
    //填空传过来参数
    let strid=e.currentTarget.dataset.num2
    //填空里值
   let vlu= e.detail.value
   //题目id
   let topid=strid.charAt(0)
   //问题id
   let qusid=strid.charAt(2)
   let fivalue=this.data.fillvalue
   if(vlu==""||vlu==undefined){
     //输入框无值
    fivalue[qusid]=""
   }else{
     //输入框有值
     fivalue[qusid]=true
   }
   //填空题正确答案个数
  let trid= this.data.topic.data[topid].listTrue.length
  //获取题目回答结果
 let  preresult=this.data.results

  that.setData({
    fillvalue:fivalue
  })
  // console.log(fivalue)
  let okfill=this.data.fillvalue//用于判断填空是否都有值
  let flg=true;
  for (const key in okfill) {//判断填空是否都有值
    if (okfill[key]!=true||okfill.length!=trid) { //有一个没值设置为flase
      flg=false  
    }
  }
   if (flg) { //表示填空都有值
    
      preresult[topid]=true

      that.setData({
        results:preresult
      })

      //都有值设置fillvalue为空不然 下一题默认fillvalue是有值的
      that.setData({
        fillvalue:[]
      })
     }else{  //不是都有值重新设置一下 防止都有值 然后去掉一个空格值 不能及时更新
      preresult[topid]=""
      that.setData({
        results:preresult
      })
     }

  },

  bindKeyInput: function (e) {  //获取输入值  //键盘输入时触发
    // console.log(e)
     //题目id
    let topid=e.currentTarget.dataset.num2.charAt(0)
    let tiid=e.currentTarget.dataset.num2.charAt(2) //问题id
    
    
    let inputtw=this.data.inputtwo //获得题目数组  inputtwo是个二维数组  二维数组每一行是一道填空题各个答案
    if (inputtw[topid]==undefined) {
      inputtw[topid]=[]  //定义第二层是个数组 不然为undefined
    }   //不能直接给二维数组第二层赋值 必须先定义第二层数组
  
    inputtw[topid][tiid]=e.detail.value   //设置此行数据
    
    
    this.setData({
     
      inputtwo:inputtw
    })
    
    // console.log(inputtw)
    
    
    
  },

  doagagin(){
    let that=this
    
   
    
    //重新加载页面
    let a=this.data.chapterName
   let b=this.data.unitName
    that.onLoad({chapterName:a,unitName:b})

    let c=this.data.radiosflag
   let d=this.data.topic

   this.setData({
    radiosflag:true,  //设置为提交
    currentTab:0  //设置跳转第一页
  })

  }
 
})