Page({
  data: {
    screen: "0"
  },
  tapBtn(e) {
    const val = e.currentTarget.dataset.val
    let str = this.data.screen
    if (val === 'C') {
      this.setData({ screen: "0" })
    } else if (val === 'DEL') {
      if (str.length === 1) {
        this.setData({ screen: "0" })
      } else {
        this.setData({ screen: str.slice(0, -1) })
      }
    } else if (val === '=') {
      let expression = this.data.screen
      wx.request({
        url: "https://2e4249ce.r38.cpolar.top/calc",
        method: "POST",
        header: {
          "content-type": "application/json"
        },
        data: {
          expression: expression
        },
        success: (res) => {
          if (res.data.code === 200) {
            this.setData({ screen: String(res.data.result) })
          } else {
            this.setData({ screen: "错误" })
          }
        }
      })
    } else {
      if (str === "0") {
        this.setData({ screen: val })
      } else {
        this.setData({ screen: str + val })
      }
    }
  }
})
