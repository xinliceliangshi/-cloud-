// pages/register/register.js
const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'w',
    phone: '18771686508',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: app.globalData.userInfo.userName,
      phone: app.globalData.userInfo.phone
    })
  },

  /**
   * 提交表单到user集合
   */
  formSubmit: function (e) {
    let phone = e.detail.value.phone;
    const mobile = /^[1][3,4,5,7,8][0-9]{9}$/; //验证手机号码的正则表达
    const isMobile = mobile.exec(phone);
    if (e.detail.value.name == '') {
      wx.showToast({
        title: '姓名不得为空！',
        icon: 'none',
        duration: 1500
      })
    } else if (!isMobile) {
      wx.showToast({
        title: '手机号码格式有误！',
        icon: 'none',
        duration: 1500
      })
    } else
      db.collection('user').where({
        _openid: app.globalData.openid
      }).update({
        data: {
          userName: e.detail.value.name,
          phone: phone,
        },
        success: _res => {
          app.isRegistered();
          wx.showToast({
            duration: 1500,
            title: '修改成功',
            icon: 'success'
          });
          setTimeout(function () {
            app.isRegistered()
            wx.switchTab({
              url: '../user/user',
            })
          }, 1500)
        },
        fail: err => {
          wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 1500
          })
        }
      })
  }
})