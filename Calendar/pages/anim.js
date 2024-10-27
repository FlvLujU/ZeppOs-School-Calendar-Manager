const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
var alerted = false
var par
Page({
  state: {},
  onInit(params) {
    const paramsObj = JSON.parse(params)
    par = paramsObj
    const { alarmedWakeUp, type } = paramsObj
    alerted = alarmedWakeUp
  },
  build() {
    hmUI.setStatusBarVisible(false)
    let b = 0
    let v = 0
    let z = 0
    let d = 0
    let xC = 390 / 2 - 50
    let initS1 = 10
    let initS2 = 10
    let initS3 = 10
    let initS4 = 10
    let initS5 = 10
    let rectX = 380
    let rectW = 0
    let rectX2 = 390
    let rectW2 = 0
    let l = 40
    let q = 145
    let n = 10
    let o = 5
    let e = 5
    let nY = 120
    let rY = 230
    let rY2 = 110
    let rH2 = 0
    let wO = 0
    var maked = false
    const m = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ]
    var jsonBase = readFile('raw/tasks.json')
    
    var decodeJSON = decodeUint8Array(jsonBase);
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    var weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
    hmUI.setStatusBarVisible(false)
    var jsonBase2 = readFile('raw/tasks_self.json')
    
    var decodeJSON2 = decodeUint8Array(jsonBase2);
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    var conf = readFile('raw/settings.json')
    
    var decodeConf = decodeUint8Array(conf);
    
    var Config = JSON.parse(decodeConf)
    var themeBG = Config.theme.bg
    var themeUI = Config.theme.UI
    var themePrim = Config.theme.primText
    var themeSec = Config.theme.secText
    var themeSlot = Config.theme.slot
    var autoBright = Config.autoBright
    var autoDark = Config.autoDark
    var lang;
    lang = Config.languaje
    var remindMe = []
    for (let i = 0; i < Config.remindMe.length - 1; i++) {
      remindMe.push(Config.remindMe[i])
    }
    var dailyAppRemindMe;
    dailyAppRemindMe = Config.dailyAppRemindMe
    var profile;
    profile = Config.profile
    var LUN = Config.Schedule.Lun
    var MAR = Config.Schedule.Mar
    var MIE = Config.Schedule.Mie
    var JUE = Config.Schedule.Jue
    var VIE = Config.Schedule.Vie
    var subjectsUser;
    subjectsUser = Config.addedSubjects
    var customColors;
    customColors = Config.colors
    var time = hmSensor.createSensor(hmSensor.id.TIME)
    const psT = time.day
    function readFile(filename) {
      const [fs_stat, err] = hmFS.stat_asset(filename);
      if (err === 0) {
        const { size } = fs_stat;
        const file_content_buffer = new Uint8Array(new ArrayBuffer(size));
        const file = hmFS.open_asset(filename, hmFS.O_RDONLY);
        hmFS.seek(file, 0, hmFS.SEEK_SET);
        hmFS.read(file, file_content_buffer.buffer, 0, size);
        hmFS.close(file);
        return file_content_buffer;
      } else {
      } 
    }
    Config.lastDay = time.day
    Config.lastMonth = time.month
    Config.lastYear = time.year
    saveJson('raw/settings.json', Config);
    function saveJson(filename, json) {
      writeFile(filename, json);
    }
    function writeFile(filename, data) {
      const buffer = jsonToArrayBuffer(data);
      const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
      hmFS.write(file, buffer, 0, buffer.byteLength);
      hmFS.close(file);
    }
    function jsonToArrayBuffer(json) {
      const jsonString = JSON.stringify(json);
      const buffer = new ArrayBuffer(jsonString.length);
      const uint8Array = new Uint8Array(buffer);
      for (let i = 0; i < jsonString.length; i++) {
        uint8Array[i] = jsonString.charCodeAt(i);
      }
      return buffer;
    }
    let rect2 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 150,
      y: 110,
      w: 0,
      h: 130 + 15,
      color: 0xee1907,
    })
    let img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 50,
      y: 120,
      src: "anim/0.png"
    })
    let text1 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 50 - n,
      y: 120,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.month - 1].substring(0, 1)
    })
    let text2 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 50 + l - n,
      y: 120,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.month - 1].substring(1, 2)
    })
    let text3 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 50 + l * 2 - n,
      y: 120,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: m[time.month - 1].substring(2, 3)
    })
    let text4 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 50 + q - n,
      y: 120,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: psT.toString().length < 2 ? "0" : psT.toString().substring(0, 1)
    })
    let text5 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 50 + q + l - n,
      y: 120,
      w: 100,
      h: 100,
      color: 0xffffff,
      text_size: 0,
      text: psT.toString().length > 1 ? psT.toString().substring(1, 2) : psT.toString().substring(0, 1)
    })
    let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 150,
      y: 185,
      w: 0,
      h: 15,
      color: 0xffffff,
    })
    let rectUI = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 500,
      y: 185,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let rectUI2 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 590,
      y: 185 + 90,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let rectUI3 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 550,
      y: 185 + 90 * 2,
      w: 0,
      h: 75,
      color: 0xdce8da,
    })
    let check = hmUI.createWidget(hmUI.widget.IMG, {
      x: 500,
      y: 185,
      src: "anim2/0.png"
    })
    let check2 = hmUI.createWidget(hmUI.widget.IMG, {
      x: 500,
      y: 275,
      src: "anim2/0.png"
    })
    let check3 = hmUI.createWidget(hmUI.widget.IMG, {
      x: 500,
      y: 365,
      src: "anim2/0.png"
    })
    let datesDisplay = []
    Config.remindMe1.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 1) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    Config.remindMe3.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 3) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    Config.remindMe7.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 7) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    Config.remindMe15.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumD(fecha, 15) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    Config.remindMe30.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumM(fecha, 1) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    Config.remindMe60.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;
      
      
      tasks.forEach((task, index) => {
        if (sumM(fecha, 2) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)
          
        }
      });
    });
    function sumD(fecha, dias) {
      let fechaObj = new Date(fecha);
      fechaObj.setDate(fechaObj.getDate() + dias);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
    }
    function sumM(fecha, meses) {
      let fechaObj = new Date(fecha);
      fechaObj.setMonth(fechaObj.getMonth() + meses);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
    }
    if (datesDisplay.length > 3) {
      
    }
    if (datesDisplay.length == 1) {
      check2.setProperty(hmUI.prop.VISIBLE, false)
      check3.setProperty(hmUI.prop.VISIBLE, false)
      rectUI2.setProperty(hmUI.prop.VISIBLE, false)
      rectUI3.setProperty(hmUI.prop.VISIBLE, false)
    }
    if (datesDisplay.length == 2) {
      check3.setProperty(hmUI.prop.VISIBLE, false)
      rectUI3.setProperty(hmUI.prop.VISIBLE, false)
    }
    let t = timer.createTimer(0, 40, function () {
      if (b < 16) {
        b++
      } else {
        let h = timer.createTimer(0, 4, function () {
          if (xC > 25) {
            xC -= 8
          } else {
            if (initS1 < 60) {
              initS1 += 4
            }
            if (initS1 > 40) {
              if (initS2 < 60) {
                initS2 += 4
              }
              if (initS2 > 40) {
                if (initS3 < 60) {
                  initS3 += 4
                }
                if (initS3 > 40) {
                  if (initS4 < 60) {
                    initS4 += 4
                  }
                  if (initS4 > 40) {
                    if (initS5 < 60) {
                      initS5 += 4
                    }
                    if (initS5 > 40) {
                      if (rectW < 360) {
                        rectX -= 16
                        rectW += 16
                        rect.setProperty(hmUI.prop.MORE, {
                          x: rectX,
                          y: 230,
                          w: rectW,
                          h: 15
                        })
                      } else {
                        if (rectW2 < 390) {
                          rectX2 -= 16
                          rectW2 += 16
                          rect2.setProperty(hmUI.prop.MORE, {
                            x: rectX2,
                            y: 110,
                            w: rectW2,
                            h: 130 + 15
                          })
                        } else {
                          if (nY > 40) {
                            nY -= o
                            rY -= o
                            rY2 -= o
                            rect2.setProperty(hmUI.prop.MORE, {
                              x: rectX2,
                              y: rY2,
                              w: rectW2,
                              h: 130 + 15
                            })
                            rect.setProperty(hmUI.prop.MORE, {
                              x: rectX,
                              y: rY,
                              w: rectW,
                              h: 15
                            })
                            text1.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                            text2.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                            text3.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                            text4.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                            text5.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                            img.setProperty(hmUI.prop.MORE, {
                              y: nY
                            })
                          } else {
                            if (rY2 > 0) {
                              rY2 -= o
                              rH2 += o
                              rect2.setProperty(hmUI.prop.MORE, {
                                x: rectX2,
                                y: rY2,
                                w: rectW2,
                                h: 130 + 15 + rH2
                              })
                            } else {
                              let w1 = 0
                              let w2 = 0
                              let w3 = 0
                              timer.stopTimer(h)
                              let b = timer.createTimer(0, 4, function () {
                                let k = v
                                if (v > 4) {
                                  k = 9 - v
                                }
                                if (v < 10) {
                                  v++
                                }
                                if (k < 0) {
                                  k = 0
                                }
                                if (v > 6) {
                                  let f = z
                                  if (z > 4) {
                                    f = 9 - z
                                  }
                                  if (z < 10) {
                                    z++
                                  }
                                  if (f < 0) {
                                    f = 0
                                  }
                                  if (z > 6) {
                                    let w = d
                                    if (d > 4) {
                                      w = 9 - d
                                    }
                                    if (d < 10) {
                                      d++
                                    }
                                    if (w < 0) {
                                      w = 0
                                    }
                                    check3.setProperty(hmUI.prop.MORE, {
                                      x: 24,
                                      src: "anim2/" + w + ".png"
                                    })
                                    if (w3 < 350) {
                                      w3 += 10
                                    }
                                    if (w3 > 350) {
                                      w3 = 350
                                      timer.stopTimer(b)
                                    }
                                    rectUI3.setProperty(hmUI.prop.MORE, {
                                      x: 20,
                                      y: 185 + 90 * 2 - e,
                                      w: w3,
                                      h: 75,
                                      radius: 11
                                    })
                                    write()
                                    maked = true
                                  }
                                  check2.setProperty(hmUI.prop.MORE, {
                                    x: 24,
                                    src: "anim2/" + f + ".png"
                                  })
                                  if (w2 < 350) {
                                    w2 += 10
                                  }
                                  if (w2 > 350) {
                                    w2 = 350
                                  }
                                  rectUI2.setProperty(hmUI.prop.MORE, {
                                    x: 20,
                                    y: 185 + 90 - e,
                                    w: w2,
                                    h: 75,
                                    radius: 11
                                  })
                                }
                                check.setProperty(hmUI.prop.MORE, {
                                  x: 24,
                                  src: "anim2/" + k + ".png"
                                })
                                if (w1 < 350) {
                                  w1 += 10
                                }
                                if (w1 > 350) {
                                  w1 = 350
                                }
                                rectUI.setProperty(hmUI.prop.MORE, {
                                  x: 20,
                                  y: 185 - e,
                                  w: w1,
                                  h: 75,
                                  radius: 11
                                })
                              })
                            }
                          }
                        }
                      }
                    }
                    text5.setProperty(hmUI.prop.MORE, {
                      text_size: initS5
                    })
                  }
                  text4.setProperty(hmUI.prop.MORE, {
                    text_size: initS4
                  })
                }
                text3.setProperty(hmUI.prop.MORE, {
                  text_size: initS3
                })
              }
              text2.setProperty(hmUI.prop.MORE, {
                text_size: initS2
              })
            }
            text1.setProperty(hmUI.prop.MORE, {
              text_size: initS1
            })
          }
          img.setProperty(hmUI.prop.MORE, {
            x: xC,
            src: "anim/" + b + ".png"
          })
        })
        timer.stopTimer(t)
      }
      img.setProperty(hmUI.prop.MORE, {
        src: "anim/" + b + ".png"
      })
    })
    let times = 0
    let g = timer.createTimer(0, 1300, function () {
      if (times < 7) {
        if (times == 0 || times == 2 || times == 4 || times == 6) {
          vibrate.stop()
          vibrate.scene = 9
          vibrate.start()
        } else {
          vibrate.stop()
          vibrate.scene = 27
          vibrate.start()
        }
        times++
      } else {
        vibrate.stop()
        timer.stopTimer(g)
      }
    })
    var string = 1
    function write() {
      if (datesDisplay.length > 0 && maked == false) {
        let refresh = hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 - 105,
          y: 5,
          src: "refresh.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          hmApp.reloadPage({ url: 'pages/init', param: '...' })
        })
        let p = 0
        for (let i = 0; i < datesDisplay.length + 1; i++) {
          p = i
          if (i > 2 && i < datesDisplay.length) {
            let txt = datesDisplay[i].substring(0, datesDisplay[i].indexOf("!"))
            hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: 20,
              y: 180 + 90 * i,
              w: 350,
              h: 75,
              radius: 11,
              color: 0xdce8da,
            })
            hmUI.createWidget(hmUI.widget.IMG, {
              x: 24,
              y: 185 + 90 * i,
              src: "anim2/0.png"
            })
            hmUI.createWidget(hmUI.widget.TEXT, {
              x: 100,
              y: 180 + 90 * i, 
              w: 390 - 20,
              h: 80,
              color: 0x000000,
              text: txt, 
              text_size: 17
            })
          } else if (i < datesDisplay.length) {
            let txt = datesDisplay[i].substring(0, datesDisplay[i].indexOf("!"))
            hmUI.createWidget(hmUI.widget.TEXT, {
              x: 100,
              y: 180 + 90 * i, 
              w: 390 - 20,
              h: 80,
              color: 0x000000,
              text: txt, 
              text_size: 17
            })
          } else {
            if (alerted != true) {
              let al = hmUI.createWidget(hmUI.widget.IMG, {
                x: 390 / 2 - 100 / 2,
                y: 185 + 90 * i + 3,
                center_x: 50,
                center_y: 50,
                src: "alarm.png"
              })
              al.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                hmApp.setLayerY(0)
                hmUI.setLayerScrolling(false)
                hmUI.createWidget(hmUI.widget.FILL_RECT, {
                  x: 0,
                  y: 0,
                  w: 390,
                  h: 550,
                  color: themeBG,
                })
                let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                  x: 0,
                  y: 0,
                  w: 390,
                  h: 70,
                  color: themeUI
                });
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: 50,
                  y: 20,
                  w: 390,
                  h: 450,
                  text_size: 26,
                  color: themePrim,
                  text: "Remember this in" + ":"
                })
                let refresh = hmUI.createWidget(hmUI.widget.IMG, {
                  x: 390 - 115,
                  y: 5,
                  src: "refresh.png"
                }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
                })
                const v = 110
                const p = 7
                const o = 170
                const j = 40
                var b1 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 0 - p + v,
                  w: 57,
                  h: 57,
                  src: "select.png"
                })
                var b2 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b3 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j,
                  y: 57 + 40 + 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b4 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 0 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b5 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                var b6 = hmUI.createWidget(hmUI.widget.IMG, {
                  x: (390 / 2 - 300 / 2) - j + o + 5 + 12,
                  y: 57 + 40 + 57 + 40 - p + v,
                  w: 57,
                  h: 57,
                  src: "unselect.png"
                })
                b1.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "1"
                })
                b2.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "2"
                })
                b3.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "3"
                })
                b4.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "4"
                })
                b5.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  string = "5"
                })
                b6.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  b1.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b2.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b3.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b4.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b5.setProperty(hmUI.prop.MORE, {
                    src: "unselect.png"
                  })
                  b6.setProperty(hmUI.prop.MORE, {
                    src: "select.png"
                  })
                  string = "6"
                })
                var yR = 100
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: yR,
                  w: 130,
                  h: 70,
                  text: "10 Mins",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: 57 + 40 + yR,
                  w: 130,
                  h: 70,
                  text: "30 Mins",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75,
                  y: 57 + 40 + 57 + 40 + yR,
                  w: 100,
                  h: 70,
                  text: "1 Hour",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
                  y: yR,
                  w: 255,
                  h: 70,
                  text: "2 Hours",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
                  y: 57 + 40 + yR,
                  w: 200,
                  h: 70,
                  text: "4 Hours",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.TEXT, {
                  x: (390 / 2 - 300 / 2) - j + 75 + o,
                  y: 57 + 40 + 57 + 40 + yR + 5,
                  w: 200,
                  h: 70,
                  text: "6 Hours",
                  text_size: 30,
                  color: themePrim
                })
                hmUI.createWidget(hmUI.widget.BUTTON, {
                  x: 0,
                  y: 400,
                  w: 390,
                  h: 50,
                  radius: 7,
                  normal_color: themeUI,
                  press_color: themeUI,
                  color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
                  text: 'Submit',
                  click_func: () => {
                    let time = 0
                    if (string == "1") {
                      time = 60 * 10
                    } else if (string == "2") {
                      time = 60 * 30
                    } else if (string == "3") {
                      time = 60 * 60
                    } else if (string == "4") {
                      time = 60 * 120
                    } else if (string == "5") {
                      time = 60 * 120 * 2
                    } else if (string == "6") {
                      time = 60 * 120 * 3
                    }
                    const alarm = hmApp.alarmNew({
                      file: 'pages/pass',
                      appid: 1017761,
                      delay: time
                    })
                  }
                })
              })
              let phases = [
                -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1
              ]
              if (i < 3) {
                let angleC = 0
                let h = 0
                let x = timer.createTimer(0, 6, function () {
                  angleC = angleC + phases[h] * 3
                  if (angleC < -40 && phases[h] < 0 && h < 16 || angleC > 40 && phases[h] > 0 && h < 16) {
                    h++
                  } else if (h > 15) {
                    timer.stopTimer(x)
                    al.setProperty(hmUI.prop.MORE, {
                      angle: 0
                    })
                  }
                  al.setProperty(hmUI.prop.MORE, {
                    angle: angleC
                  })
                })
              }
              hmUI.createWidget(hmUI.widget.IMG, {
                x: 390 / 2 - 100 / 2,
                y: 185 + 90 * i + 115 + 20,
                src: ".png"
              })
            }
          }
        }
        p++
      }
    }
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});