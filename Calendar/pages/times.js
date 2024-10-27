const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
Page({
  state: {},
  build() {
    var jsonBase = readFile('raw/tasks.json')

    var decodeJSON = decodeUint8Array(jsonBase);

    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
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
    let datesDisplay = []
    var time = hmSensor.createSensor(hmSensor.id.TIME)
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
    const days = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes"
    ]
    var init = 30
    var initT = [
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0],
      [0, 8, 3, 0]
    ]
    var initT2 = [
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5],
      [0, 0, 5, 5]
    ]
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390 * 5,
      h: 450,
      color: themeBG,
      radius: 0
    })
    var minus = 30
    var widgetArray = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    var widgetArray2 = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    var sTimeHour = [
      [],
      [],
      [],
      [],
      []
    ]
    var sTimeMin = [
      [],
      [],
      [],
      [],
      []
    ]
    for (let i = 0; i < 5; i++) {
      const { width, height } = hmUI.getTextLayout(days[i], {
        text_size: 26,
        text_width: 0,
        wrapped: 0
      })
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 390 * i,
        y: 0,
        w: 390,
        h: init,
        color: themeUI,
        radius: 0
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - width / 2) + 390 * i,
        y: -5,
        w: 390,
        h: init + 3,
        color: themeSec,
        text_size: 26,
        text: days[i]
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 25 + 390 * i,
        y: 20,
        w: 390,
        h: 60,
        color: themePrim,
        text_size: 50,
        text: "Start:"
      })
      for (let j = 0; j < 4; j++) {
        var k = 70;
        var p = 0;

        if (j == 2) k = 90;
        if (j == 3) p = 40;

        widgetArray[i][j] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: (390 * i) + 35 + p + k * j,
          y: 125 - minus,
          text_size: 120,
          color: themePrim,
          text: initT[i][j]
        });
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 178 + 390 * i,
          y: 125 - minus,
          w: 30,
          text_size: 120,
          color: themePrim,
          text: ":"
        });

        hmUI.createWidget(hmUI.widget.IMG, {
          x: (390 * i) + 35 + p + k * j + 9,
          y: 120 - minus,
          src: "plus.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          if (sTimeHour[i].length < 1 && sTimeMin[i].length < 1) {
            initT[i][j]++;

            if (j == 0 && initT[i][j] > 2) {
              initT[i][j] = 0;
            } else if (j == 1) {
              if (initT[i][0] == 2 && initT[i][j] > 3) {
                initT[i][j] = 0;
              } else if (initT[i][j] > 9) {
                initT[i][j] = 0;
              }
            } else if (j == 2 && initT[i][j] > 5) {
              initT[i][j] = 0;
            } else if (j == 3 && initT[i][j] > 9) {
              initT[i][j] = 0;
            }

            if (initT[i][0] == 2 && initT[i][1] > 3) {
              initT[i][1] = 3;
              widgetArray[i][1].setProperty(hmUI.prop.MORE, {
                text: initT[i][1]
              });
            }

            widgetArray[i][j].setProperty(hmUI.prop.MORE, {
              text: initT[i][j]
            });
          } else {
            hmUI.showToast({
              text: "Elimina todos los elementos de " + days[i] + " para modificar la hora inicial."
            })
          }
        });

        hmUI.createWidget(hmUI.widget.IMG, {
          x: (390 * i) + 35 + p + k * j + 9,
          y: 280 - minus,
          src: "less.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          if (sTimeHour[i].length < 1 && sTimeMin[i].length < 1) {
            initT[i][j]--;

            if (j == 0 && initT[i][j] < 0) {
              initT[i][j] = 2;
            } else if (j == 1) {
              if (initT[i][0] == 2 && initT[i][j] < 0) {
                initT[i][j] = 3;
              } else if (initT[i][j] < 0) {
                initT[i][j] = 9;
              }
            } else if (j == 2 && initT[i][j] < 0) {
              initT[i][j] = 5;
            } else if (j == 3 && initT[i][j] < 0) {
              initT[i][j] = 9;
            }

            if (initT[i][0] == 2 && initT[i][1] > 3) {
              initT[i][1] = 3;
              widgetArray[i][1].setProperty(hmUI.prop.MORE, {
                text: initT[i][1]
              });
            }

            widgetArray[i][j].setProperty(hmUI.prop.MORE, {
              text: initT[i][j]
            });
          } else {
            hmUI.showToast({
              text: "Elimina todos los elementos de " + days[i] + " para modificar la hora inicial."
            })
          }
        });
      }
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 25 + 390 * i,
        y: 300,
        w: 390,
        h: 60,
        color: themePrim,
        text_size: 30,
        text: "Duration:"
      })
      for (let j = 0; j < 4; j++) {
        let minus = -195
        var k = 37;
        var p = 0;
        var f = 90
        var q = 33
        if (j == 2) k = 44;
        if (j == 3) p = 20;
        widgetArray2[i][j] = hmUI.createWidget(hmUI.widget.TEXT, {
          x: f + (390 * i) + 35 + p + k * j,
          y: 135 - minus,
          w: 34,
          text_size: 60,
          color: themePrim,
          text: j > 0 ? initT2[i][j] : ""
        });
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: (f + 295) / 2 + 390 * i,
          y: 130 - minus,
          w: 13,
          text_size: 60,
          color: themePrim,
          text: ":"
        });
        if (j > 0) {
          hmUI.createWidget(hmUI.widget.IMG, {
            x: f + (390 * i) + 25 + p + k * j + 9,
            y: 115 - minus,
            src: "plusS.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            initT2[i][j]++;

            if (j == 0 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            } else if (j == 1 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            } else if (j == 2 && initT2[i][j] > 5) {
              initT2[i][j] = 0;
            } else if (j == 3 && initT2[i][j] > 9) {
              initT2[i][j] = 0;
            }

            widgetArray2[i][j].setProperty(hmUI.prop.MORE, {
              text: initT2[i][j]
            });
          });

          hmUI.createWidget(hmUI.widget.IMG, {
            x: f + (390 * i) + 25 + p + k * j + 9,
            y: 210 - minus,
            src: "lessS.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            initT2[i][j]--;

            if (j == 0 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            } else if (j == 1 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            } else if (j == 2 && initT2[i][j] < 0) {
              initT2[i][j] = 5;
            } else if (j == 3 && initT2[i][j] < 0) {
              initT2[i][j] = 9;
            }

            widgetArray2[i][j].setProperty(hmUI.prop.MORE, {
              text: initT2[i][j]
            });
          });
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 295 + 390 * i,
            y: 35,
            src: "conf2.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderSetSchedule(i)
          })
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 25 + 390 * i,
            y: 115 - minus + q,
            src: "add.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            let startHours = parseInt(initT[i][0].toString() + initT[i][1].toString());
            let startMinutes = parseInt(initT[i][2].toString() + initT[i][3].toString());
            let durationHours = parseInt(initT2[i][0].toString() + initT2[i][1].toString());
            let durationMinutes = parseInt(initT2[i][2].toString() + initT2[i][3].toString());
            if (sTimeHour[i].length === 0 && sTimeMin[i].length === 0) {

              sTimeHour[i].push(startHours);
              sTimeMin[i].push(startMinutes);
            } else {
              let lastHour = sTimeHour[i][sTimeHour[i].length - 1];
              let lastMin = sTimeMin[i][sTimeMin[i].length - 1];
              let newMinutes = lastMin + durationMinutes;
              let extraHours = Math.floor(newMinutes / 60);
              newMinutes = newMinutes % 60;

              let newHours = lastHour + durationHours + extraHours;
              if (newHours >= 24) newHours = newHours % 24;
              sTimeHour[i].push(newHours);
              sTimeMin[i].push(newMinutes);
            }
            let newMinutes = startMinutes + durationMinutes;
            let extraHours = Math.floor(newMinutes / 60);
            newMinutes = newMinutes % 60;

            let newHours = startHours + durationHours + extraHours;
            if (newHours >= 24) newHours = newHours % 24;
            var scheduleLog = ""
            for (let j = 0; j < sTimeHour[i].length; j++) {
              let hour = sTimeHour[i][j];
              let minute = sTimeMin[i][j];
              if (j == 0) {
                scheduleLog += `${hour}:${minute < 10 ? '0' + minute : minute}`;
              } else {
                scheduleLog += `, ${hour}:${minute < 10 ? '0' + minute : minute}`;
              }
            }
            hmUI.showToast({
              text: days[i] + ": " + scheduleLog
            })
          });
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 300 + 390 * i,
            y: 115 - minus + q,
            src: "bin.png"
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            deleteTime(i)
          })
        }
      }
    }
    /*for (let l = 0; l < 4; l++) {
      const next = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 * curI,
        y: 400,
        src: "y.png"
      })
      const cancel = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 * curI + 195,
        y: 400,
        src: "n.png"
      })
    }*/
    function renderSetSchedule(curI) {
      let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      let daysUnMOF = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      console.log("curI: " + curI)
      let curDay = days[curI]
      let modifArrMC = sTimeMin[curI]
      let modifArrHC = sTimeHour[curI]
      let curStartClass = initT[curI]
      let curDurationClass = initT2[curI]
      let modifArrM = [sTimeMin[0], sTimeMin[1], sTimeMin[2], sTimeMin[3], sTimeMin[4]]
      let modifArrH = [sTimeHour[0], sTimeHour[1], sTimeHour[2], sTimeHour[3], sTimeHour[4]]
      let StartClass = [initT[0], initT[1], initT[2], initT[3], initT[4]]
      let DurationClass = [initT2[0], initT2[1], initT2[2], initT2[3], initT2[4]]
      days.splice(curI, 1)
      modifArrM.splice(curI, 1)
      modifArrH.splice(curI, 1)
      StartClass.splice(curI, 1)
      DurationClass.splice(curI, 1)
      let ticks = [false, false, false, false]
      let ticksPng = []
      let textsPng = []
      let BG = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 390 * curI,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
      })
      let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 390 * curI,
        y: 0,
        w: 390,
        h: 60,
        color: themeUI,
        radius: 0
      })
      let addThis = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 390 * curI + 20,
        y: 10,
        w: 350,
        h: 50,
        text: "Add this schedule in:",
        color: themeSec,
        text_size: 33
      })
      let next = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 390 * curI,
        y: 400,
        w: 195,
        h: 50,
        text: "",
        normal_src: 'y.png',
        press_src: 'y.png',
        click_func: () => {
          let daysC = ""
          ticks.splice(curI, 0, false);
          for (let l = 0; l < 5; l++) {
            if (ticks[l] == true) {
              console.log("happy")
              let log = daysC.length == 0 ? daysUnMOF[l] : `, ${daysUnMOF[l]}`
              daysC += log
              console.log(daysUnMOF[l])
              sTimeHour[l] = modifArrHC
              sTimeMin[l] = modifArrMC
              initT[l] = curStartClass
              initT2[l] = curDurationClass
              for(let g = 0; g < 4; g++){
                widgetArray[l][g].setProperty(hmUI.prop.MORE, {
                  text: curStartClass[g],
                })
                widgetArray2[l][g].setProperty(hmUI.prop.MORE, {
                  text: g > 0 ?  curDurationClass[g] : "",
                })
              }
            }
            hmUI.deleteWidget(ticksPng[l])
            hmUI.deleteWidget(textsPng[l])
            hmUI.showToast({
              text: `This configuration was added to: ${daysC}`
            })
          }
          next.setProperty(hmUI.prop.VISIBLE, false)
          cancel.setProperty(hmUI.prop.VISIBLE, false)
          hmUI.deleteWidget(addThis)
          hmUI.deleteWidget(rect)
          hmUI.deleteWidget(BG)
        }
      })
      let cancel = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 390 * curI + 195,
        y: 400,
        w: 195,
        h: 50,
        text: "",
        normal_src: 'n.png',
        press_src: 'n.png',
        click_func: () => {
          for (let l = 0; l < 4; l++) {
            hmUI.deleteWidget(ticksPng[l])
            hmUI.deleteWidget(textsPng[l])
          }
          next.setProperty(hmUI.prop.VISIBLE, false)
          cancel.setProperty(hmUI.prop.VISIBLE, false)
          hmUI.deleteWidget(addThis)
          hmUI.deleteWidget(rect)
          hmUI.deleteWidget(BG)
        }
      })
      let cH = 80
      for (let j = 0; j < 4; j++) {
        let tickPng = hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 * curI + 20,
          y: 75 + cH * j,
          src: "unticked.png"
        })
        ticksPng.push(tickPng)
        let textPng = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 390 * curI + 80,
          y: 75 + cH * j,
          w: 350,
          h: 50,
          text: days[j],
          color: themePrim,
          text_size: 33
        })
        textsPng.push(textPng)
        tickPng.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          if (ticks[j] == false) {
            ticks[j] = true
            tickPng.setProperty(hmUI.prop.MORE, {
              src: "ticked.png"
            });
          } else {
            ticks[j] = false
            tickPng.setProperty(hmUI.prop.MORE, {
              src: "unticked.png"
            });
          }
        })
      }
    }
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 390 * 5,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 * 5 + 20,
      y: 20,
      w: 300,
      h: 250,
      color: themePrim,
      text_size: 26,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "If your schedule`s\ntimes are configured\npress the \"Next\"\nbutton to continue"
    })
    var LunNumHour = [];
    var LunNumMin = [];
    var MarNumHour = [];
    var MarNumMin = [];
    var MieNumHour = [];
    var MieNumMin = [];
    var JueNumHour = [];
    var JueNumMin = [];
    var VieNumHour = [];
    var VieNumMin = [];

    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 390 * 5,
      y: 400,
      w: 390,
      h: 50,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
      text: 'Next',
      click_func: () => {
        LunNumMin = []
        LunNumHour = []
        MarNumMin = []
        MarNumHour = []
        MieNumMin = []
        MieNumHour = []
        JueNumMin = []
        JueNumHour = []
        VieNumMin = []
        VieNumHour = []
        addTimesToArray(0, sTimeHour[0], sTimeMin[0])
        addTimesToArray(1, sTimeHour[1], sTimeMin[1])
        addTimesToArray(2, sTimeHour[2], sTimeMin[2])
        addTimesToArray(3, sTimeHour[3], sTimeMin[3])
        addTimesToArray(4, sTimeHour[4], sTimeMin[4])
        Config.LunNumMin = LunNumMin
        Config.MarNumMin = MarNumMin
        Config.MieNumMin = MieNumMin
        Config.JueNumMin = JueNumMin
        Config.VieNumMin = VieNumMin
        Config.LunNumHour = LunNumHour
        Config.MarNumHour = MarNumHour
        Config.MieNumHour = MieNumHour
        Config.JueNumHour = JueNumHour
        Config.VieNumHour = VieNumHour
        writeFile("raw/settings.json", Config)
        hmApp.reloadPage({ url: 'pages/schedule', param: '...' })
      }
    })
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
    function addTimesToArray(dayIndex, hoursArray, minutesArray) {
      const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];
      const day = days[dayIndex];

      for (let i = 0; i < hoursArray.length; i++) {
        const newHours = hoursArray[i];
        const newMinutes = minutesArray[i];

        if (day === 'Lun') {
          LunNumHour.push(newHours);
          LunNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Mar') {
          MarNumHour.push(newHours);
          MarNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Mie') {
          MieNumHour.push(newHours);
          MieNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Jue') {
          JueNumHour.push(newHours);
          JueNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        } else if (day === 'Vie') {
          VieNumHour.push(newHours);
          VieNumMin.push(newMinutes < 10 ? '0' + newMinutes : newMinutes);
        }

        if (i === hoursArray.length - 1) {
          let durationHours = parseInt(initT2[dayIndex][0].toString() + initT2[dayIndex][1].toString());
          let durationMinutes = parseInt(initT2[dayIndex][2].toString() + initT2[dayIndex][3].toString());

          let finalMinutes = newMinutes + durationMinutes;
          let extraHours = Math.floor(finalMinutes / 60);
          finalMinutes = finalMinutes % 60;

          let finalHours = newHours + durationHours + extraHours;
          if (finalHours >= 24) finalHours = finalHours % 24;

          if (day === 'Lun') {
            Config.lastMinLun = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourLun = finalHours
          } else if (day === 'Mar') {
            Config.lastMinMar = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourMar = finalHours
          } else if (day === 'Mie') {
            Config.lastMinMie = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourMie = finalHours
          } else if (day === 'Jue') {
            Config.lastMinJue = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourJue = finalHours
          } else if (day === 'Vie') {
            Config.lastMinVie = finalMinutes < 10 ? '0' + finalMinutes : finalMinutes;
            Config.lastHourVie = finalHours
          }
        }
      }
    }
    function deleteTime(i) {
      if (sTimeHour[i].length > 0) {
        if (sTimeHour[i].length === 2) {
          sTimeHour[i].pop();
          sTimeMin[i].pop();
          sTimeHour[i].pop();
          sTimeMin[i].pop();
        } else {
          sTimeHour[i].pop();
          sTimeMin[i].pop();
        }
        var scheduleLog = ""
        for (let j = 0; j < sTimeHour[i].length; j++) {
          let hour = sTimeHour[i][j];
          let minute = sTimeMin[i][j];
          if (j == 0) {
            scheduleLog += `${hour}:${minute < 10 ? '0' + minute : minute}`;
          } else {
            scheduleLog += `, ${hour}:${minute < 10 ? '0' + minute : minute}`;
          }
        }
        hmUI.showToast({
          text: days[i] + ":" + scheduleLog
        })
      } else {
        hmUI.showToast({
          text: "No hay elementos que eliminar para: " + days[i]
        })
      }
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
    hmUI.setScrollView(true, 390, 6, false)
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});