// pages/release/release.js
const app = getApp()
var util = require('../../utils/util.js')
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDialogRight: false,
    /**显示不显示 */
    textareahidden:true,
    measures: "风控措施",
    chengshiopen:0,
    coverhidden:true,
    disabled:false,
    zhouqiopen:0,
    zhaiquanpingjiopen:0,
    zhutipingjiopen:0,
    currentTime: 61,
    bian: false,
    yanzhengma: '获取验证码',//倒计时 

    value1:'请选择',
    value2:'请选择',
    value3:'请选择',
    value4: '选择公司所在地',
    showDialogRight: false,
    tempFilePaths:'../../image/upload@3x.png',
    cityname:null,
    zhouqiname:null,
    tempFilePathss:null,
    /**验证码 */
    sms_code:0,
    /**各个id */
    cityid:0,
    cycle_id:0,
    funds_rate_id:0,
  
  },
  footerqueding: function () {
    console.log('666')
    var that = this
    that.setData({
      show: false
    })
    wx.navigateTo({
      url: '../CorporateBonds/CorporateBonds',
    })
  },
  /**
   * textarea输入失去焦点时出发事件
   */
  textareaInput:function(e){
    console.log(e.detail.value)
    var that = this
    that.setData({
      measures: e.detail.value,
      textareahidden: true,
    })
  },
  textareaFocus: function (e) {
    console.log(e.detail.value)
    var that = this
    that.setData({
      textareahidden: false,
    })
  },




   
  focus:function(e){
    var that = this
    console.log(e.detail.value)
    var textar = e.detail.value
    if (textar.length==0){
      that.setData({
        coverhidden: true
      })
    }else{
      that.setData({
        coverhidden: false
      })
    }
  },
  preventTouchMove: function (e) {

  },
  /**侧面picker */
  freetoBackRight: function () {
    this.setData({
      checked: false,
      showDialogRight: !this.data.showDialogRight,
      disableding: false
    })
  },
  freeBackRight: function () {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      disableding: false,
    });
  },

  toggleDialogRight() {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      chengshiopen: 1,
      zhouqiopen: 0,
      zhaiquanpingjiopen: 0,
      zhutipingjiopen: 0,
      height:100+'vh',
      disableding:true,
    });
  },
  toggleDialogRight2() {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      chengshiopen: 0,
      zhouqiopen: 1,
      zhaiquanpingjiopen: 0,
      zhutipingjiopen: 0,
      height: 100 + 'vh',
      disableding: true,
    });
  },
  toggleDialogRight3() {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      chengshiopen: false,
      zhouqiopen: false,
      zhaiquanpingjiopen: true,
      zhutipingjiopen: false,
      height: 100 + 'vh',
      disableding: true,
    });
  },
  toggleDialogRight4() {
    this.setData({
      showDialogRight: !this.data.showDialogRight,
      chengshiopen: false,
      zhouqiopen: false,
      zhaiquanpingjiopen: false,
      zhutipingjiopen: true,
      height: 100 + 'vh',
      disableding: true,
    });
  },

  /**城市选择 */
  regionChange: function (e) {
    console.log(e)
    console.log('城市选项发生change事件，携带value值为：', e.detail.value)
    var that = this
    that.setData({
      chengshi: e.detail.value
    })
    var chengshishuzu = e.detail.value
    var chengshi222 = chengshishuzu.split("+")
    this.data.region_id = chengshi222[0]
    that.setData({
      cityname: chengshi222[1],
      region_id: chengshi222[0]
    })
  },
  regionclick: function (e) {
    console.log('城市发生change事件，携带value值为：', e.detail.value)
    var id = e.currentTarget.dataset.regionnum
    console.log(e)
    console.log(e.currentTarget.dataset.regionnum)
    var that = this
    that.setData({
      regionnum: id
    })
  },
  /**周期选择 */
  rateclick: function (e) {
    var id = e.currentTarget.dataset.ratenum
    console.log(e)
    console.log(e.currentTarget.dataset.ratenum)
    var that = this
    that.setData({
      ratenum: id
    })
  },
  pingjiChange: function (e) {
    console.log(e)
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    var zhouqishuzu  = e.detail.value
    var zhouqi222 = zhouqishuzu.split("+")
    this.data.cycle_id = zhouqi222[0]
    var that = this
    that.setData({
      zhouqiname: zhouqi222[1],
      zhouqiid: zhouqi222[0]
    })
  },

  /*债券评级*/
  zhaiquanclick: function (e) {
    var id = e.currentTarget.dataset.zhaiquannum
    console.log(e)
    console.log(e.currentTarget.dataset.zhaiquannum)
    var that = this
    that.setData({
      zhaiquannum: id
    })
  },
  zhaiquanChange:function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    console.log(this.data.funds_rate_id)
    var zhaiquanshuzu = e.detail.value
    var zhaiquan222 = zhaiquanshuzu.split("-")
    this.data.funds_rate_id = zhaiquan222[0]
    this.data.funds_rate_sort = zhaiquan222[2]
    console.log('sort'+zhaiquan222[2])
    var that = this
    that.setData({
      zhaiquanname: zhaiquan222[1],
      zhaiquanid: zhaiquan222[0],
      zhaiquansort: zhaiquan222[2],
    })
  },
  bindDateChange: function (e) {
    console.log('时间发送选择改变，携带值为', e.detail.value)
    this.data.date= e.detail.value
    this.setData({
      date: e.detail.value
    })
  },
  /*主体评级*/
  zhuticlick: function (e) {
    var id = e.currentTarget.dataset.zhutinum
    console.log(e)
    console.log(e.currentTarget.dataset.zhutinum)
    var that = this
    that.setData({
      zhutinum: id
    })
  },
  zhutiChange: function (e) {
    console.log('评级发生change事件，携带value值为：', e.detail.value)
    console.log(this.data.main_rate_id)
    var zhutishuzu = e.detail.value
    var zhuti222 = zhutishuzu.split("-")
    this.data.main_rate_id = zhuti222[0]

    var that = this
    that.setData({
      zhutiname: zhuti222[1],
      zhutiid: zhuti222[0]
    })
  },


   bphone:function(e){
       this.data.bphone = e.detail.value
  },
   yzmjianyan: function (e) {
     console.log(e.detail.value)
     this.data.yanzhengmacode = e.detail.value
     console.log(this.data.yanzhengmacode)
   },
  /**发短信 */
  faduanxin:function(e){
    var that = this
	console.log(this.data.bphone)
  if (this.data.bphone){
    that.setData({
      bian: true,
      disabled: true
    })
    wx.request({
      url: app.globalData.send_sms,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        phone: this.data.bphone,
        type:1,
      },
      success: function (res) {
        console.log('验证码：'+res.data.sms_code)
        if (res.data.sms_code==undefined){
          wx.showModal({
            title: '提示',
            content: '您的短信发送已上限，请明天再发布债券',
          })
          that.setData({
            yanzhengma: '发送验证码',
            currentTime: 61,
            disabled: false,
            bian: false,
          })
        }else{
          that.dianjiing();
          that.setData({
            sms_code: res.data.sms_code
          })
        }
      }
    })
  }else{
    wx.showModal({
      title: '提示',
      content: '请输入手机号',
    })
  }
  },
  dianjiing: function (options) {
    var that = this;
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        yanzhengma: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          yanzhengma: '重新发送',
          currentTime: 61,
          disabled: false,
          bian: false,
        })
      }
    }, 1000)  
  },
  formSubmit:function(e){
    console.log(e.detail.value)
  },
  /**选择图片 */
  xuanzetupian: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        console.log(tempFilePaths[0])
        wx.uploadFile({
          url: app.globalData.upload,
          filePath: tempFilePaths[0],
          name: 'img',
          success: function (res) {
            console.log('上传照片：')
            console.log(res)
            console.log(res.data)
            console.log('选择的图片：')
            console.log(JSON.parse(res.data).img)
            console.log('选择的图片：')
            var imageurl = JSON.parse(res.data).img
            wx.setStorage({ key: "imageUrl", data: JSON.parse(res.data).img })
          }
        })
      }
    })
  },
  formSubmit2: function (e) {
    console.log('formid:'+e.detail.formId)
    var that = this
    console.log('form2:')
    console.log(e.detail.value)

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;  
    if (e.detail.value.phone == '' || e.detail.value.company == '' || this.data.region_id == ''||e.detail.value.person == '' || e.detail.value.sms_code == ''){
      if (e.detail.value.phone == ''){
        wx.showModal({
          title: '提示',
          content: '请输入手机号',
        })
      }
      if (e.detail.value.company == '') {
        wx.showModal({
          title: '提示',
          content: '请输入发行人简称',
        })
      }
      if (this.data.region_id == '') {
        wx.showModal({
          title: '提示',
          content: '请选择发行人所在地',
        })
      }
      if (e.detail.value.person == '') {
        wx.showModal({
          title: '提示',
          content: '请输入联系人姓名',
        })
      }
      if (e.detail.value.sms_code == '') {
        wx.showModal({
          title: '提示',
          content: '请输入验证码',
        })
      }
    }else{
      if (!myreg.test(e.detail.value.phone) || e.detail.value.phone.length!=11){
        wx.showModal({
          title: '提示',
          content: '你输入的手机号有误',
        })
      }else{
        console.log('填写的验证码' + this.data.yanzhengmacode)
        console.log('真正的验证码' + this.data.sms_code)
        if (this.data.yanzhengmacode != this.data.sms_code){
          wx.showModal({
            title: '提示',
            content: '你输入的验证码有误',
          })
        }else{
          var imageUrl = wx.getStorageSync('imageUrl')
          console.log('上传的照片')
          console.log(imageUrl)
          console.log('上传的照片')
          wx.request({
            url: app.globalData.create_funds,
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              card: imageUrl,
              user_id: app.globalData.user_id,
              person: e.detail.value.person,
              region_id: this.data.region_id,
              company: e.detail.value.company,
              phone: e.detail.value.phone,
              money: e.detail.value.money,
              limit: e.detail.value.limit,
              interest: e.detail.value.interest,
              cycle_id: this.data.zhouqiid,
              funds_rate_id: this.data.zhaiquanid,
              main_rate_id: this.data.zhutiid,
              issue_time: e.detail.value.issue_time,
              risk: e.detail.value.measures,
              funds_rate_sort: this.data.zhaiquansort,
              sms_code: e.detail.value.sms_code,
              formid: e.detail.formId
            },
            success: res => {
              console.log(res)
              console.log(res.data.code)
              if (res.data.code==200){
               this.setData({
                 show: true
               })
              } else if (res.data.code == 400){
                wx.showModal({
                  title: '提示',
                  content: res.data.code+res.data.message,
                })
              }

            }
          })
    
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      time: time,
      phone: app.globalData.phone,
      show:false
    });  
    wx.request({
      url: app.globalData.screen,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          /**城市 */
          region: res.data.region,
        })
      }
    })


    wx.request({
      url: app.globalData.cycle_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log('周期数据：')
        console.log(res.data.data)
        that.setData({
          /**周期 */
          zhouqi: res.data.data,
        })
      }
    })

    wx.request({
      url: app.globalData.rate_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          /*评级 */
          zhaiquanpingji: res.data.data,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    that.setData({
      time: time
    });
    wx.request({
      url: app.globalData.screen,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log(res)
        that.setData({
          /**城市 */
          region: res.data.region,
        })
      }
    })


    wx.request({
      url: app.globalData.cycle_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        console.log('周期数据：')
        console.log(res.data.data)
        that.setData({
          /**周期 */
          zhouqi: res.data.data,
        })
      }
    })

    wx.request({
      url: app.globalData.rate_data,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
      },
      success: function (res) {
        wx.stopPullDownRefresh()
        console.log(res.data.data)
        that.setData({
          /*评级 */
          zhaiquanpingji: res.data.data,
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})