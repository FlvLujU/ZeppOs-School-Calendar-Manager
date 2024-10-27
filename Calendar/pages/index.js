import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/config/device";
var preSee = false
var par
var as = 0
Page({
  state: {},
  onInit(params) {
    const paramsObj = JSON.parse(params)
    par = paramsObj
    const { preview, type } = paramsObj
    preSee = preview
    if (preSee == true) {
      console.log("TRRRRRUUUEEE")
      as = 1
    }
    console.log("par: " + preview)
  },
  build() {
    const isAdmin = hmSetting.getUserData().nickName
    if (isAdmin == "flvluju" && preSee != true) {
      hmUI.setScrollView(true, 390, 6, false)
      hmUI.setStatusBarVisible(false)
      const darkerColors = [
        0x96a29a,
        0x8a928f,
        0x7e837f,
        0x4db0df,
        0x665f5e,
        0x5a4f4e,
        0x4e3f3d,
        0x422f2d
      ];
      const Calendar = [
        ["Inglés", "Tecnología", "Lengua", "Recreo", "Física", "Historia", "Filosofía"],
        ["Matemáticas", "TIC", "Filosofía", "Recreo", "Física", "Historia", "Inglés"],
        ["TIC", "Historia", "Filosofía", "Recreo", "Tecnología", "Matemáticas", "Lengua", "Física"],
        ["Lengua", "Matemáticas", "Historia", "Recreo", "Tecnología", "TIC", "Inglés"],
        ["Inglés", "Lengua", "Tutoría", "Recreo", "TIC", "Matemáticas", "Física", "Tecnología"]
      ]
      var initsHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
      var endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
      var initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
      var endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]
      var weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
      var time = hmSensor.createSensor(hmSensor.id.TIME)
      var day = time.week
      let ScrollDay = day - 1
      if (ScrollDay > 4) {
        ScrollDay = 0
      }
      hmUI.scrollToPage(ScrollDay, false)
      var h = time.hour
      var min = time.minute
      var daytime = h + ":" + min
      var rects = []
      var texts = []
      var times = []
      var rectReds = []
      var weekTexts = []
      var isDay = false
      if (day == 3 || day == 5) {
        isDay = true
      }
      var num = 7
      var init = 30
      var L = [60, 60, 53, 60, 53]
      var sum = 0
      if (isDay == true) {
        num = 8
        init = 30
        sum = 0
      }
      for (let j = 0; j < 5; j++) {
        for (let i = 0; i < Calendar[j].length; i++) {
          const { width, height } = hmUI.getTextLayout(weekDays[j], {
            text_size: 26,
            text_width: 0,
            wrapped: 0
          })
          let rectRed = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 390 * j,
            y: 0,
            w: 390,
            h: init,
            color: 0xfa270a,
            radius: 0
          })
          rectReds.push(rectRed)
          let weekText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: (390 / 2 - width / 2) + 390 * j,
            y: -5,
            w: 390,
            h: init,
            color: 0xffffff,
            text_size: 26,
            text: weekDays[j]
          })
          weekTexts.push(weekText)
          if (getText() != -1) {
            let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: 390 * j,
              y: init + L[j] * i,
              w: 390,
              h: L[j],
              color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
              radius: 0
            })
            rects.push(rect)
            let text = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 45 + 390 * j,
              y: (init + sum) + L[j] * i,
              w: 390,
              h: 40,
              color: 0xffffff,
              text_size: 26,
              text: Calendar[j][i]
            })
            texts.push(text)
            let time = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 225 + 390 * j,
              y: (init + sum) + L[j] * i,
              w: 390,
              h: 40,
              color: 0xffffff,
              text_size: 18,
              text: initsHour[i] + ":" + initMinute[i] + " - " + endHour[i] + ":" + endMinute[i]
            })
            times.push(time)
          } else {
            if (j != day - 1) {
              let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                x: 390 * j,
                y: init + L[j] * i,
                w: 390,
                h: L[j],
                color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
                radius: 0
              })
              rects.push(rect)
              let text = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 45 + 390 * j,
                y: (init + sum) + L[j] * i,
                w: 390,
                h: 40,
                color: 0xffffff,
                text_size: 26,
                text: Calendar[j][i]
              })
              texts.push(text)
              let time = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 225 + 390 * j,
                y: (init + sum) + L[j] * i,
                w: 390,
                h: 40,
                color: 0xffffff,
                text_size: 18,
                text: initsHour[i] + ":" + initMinute[i] + " - " + endHour[i] + ":" + endMinute[i]
              })
              times.push(time)
            } else {
              let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                x: 390 * j,
                y: 0,
                w: 390,
                h: 450,
                color: darkerColors[0],
                radius: 0
              })
              let text = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 45 + 390 * j,
                y: 120,
                w: 390,
                h: 180,
                color: 0xffffff,
                text_size: 35,
                text: "No hay más clases\n hoy. ¡Aprovecha el\n resto del día!"
              })
            }
          }
        }
      }
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 * 5 + (390 / 2 - 75),
        y: 450 / 2 - 75,
        src: "task.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.gotoPage({ url: 'pages/newTask', param: '...' })
      })
      function getText() {
        const currentClass = getCurrentClass(h, min);
        return currentClass
      }
      function convertToMinutes(hour, minute) {
        return parseInt(hour) * 60 + parseInt(minute);
      }
      function getCurrentClass(currentHour, currentMinute) {
        const currentTime = convertToMinutes(currentHour, currentMinute);
        for (let i = 0; i < initsHour.length; i++) {
          const classStart = convertToMinutes(initsHour[i], initMinute[i]);
          const classEnd = convertToMinutes(endHour[i], endMinute[i]);

          if (currentTime >= classStart && currentTime <= classEnd) {
            return i + 1;
          }
        }
        return -1;
      }
    } else {
      hmUI.setStatusBarVisible(false)
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
      function decodeUint8Array(uint8array) {
        let decodedString = "";

        
        for (let i = 0; i < uint8array.length; i++) {
          decodedString += String.fromCharCode(uint8array[i]);
        }

        return decodedString;
      }
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
      if (autoBright == true) {
        hmSetting.setScreenAutoBright(true)
      }
      const darkerColors = [
        "0x96a29a", "0x8a928f", "0x858f8c", "0x7f8a87", "0x7e837f",
        "0x76807e", "0x6f6a69", "0x665f5e", "0x5e5a58", "0x5a4f4e",
        "0x52484a", "0x4e3f3d", "0x483534", "0x442b29", "0x422f2d",
        "0x3c2927"
      ];
      const Calendar = [
        Config.Schedule.Lun,
        Config.Schedule.Mar,
        Config.Schedule.Mie,
        Config.Schedule.Jue,
        Config.Schedule.Vie,
      ]
      var times = [
        Config.LunNumHour,
        Config.MarNumHour,
        Config.MieNumHour,
        Config.JueNumHour,
        Config.VieNumHour
      ];
      var initMinute = [
        Config.LunNumMin,
        Config.MarNumMin,
        Config.MieNumMin,
        Config.JueNumMin,
        Config.VieNumMin
      ]
      var endMinute = [
        Config.LunNumMin,
        Config.MarNumMin,
        Config.MieNumMin,
        Config.JueNumMin,
        Config.VieNumMin
      ]
      var initHour = [
        Config.LunNumHour,
        Config.MarNumHour,
        Config.MieNumHour,
        Config.JueNumHour,
        Config.VieNumHour
      ]
      var endHour = [
        Config.LunNumHour,
        Config.MarNumHour,
        Config.MieNumHour,
        Config.JueNumHour,
        Config.VieNumHour
      ]
      var weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]
      var time = hmSensor.createSensor(hmSensor.id.TIME)
      var day = time.week
      let ScrollDay = day - 1
      if (ScrollDay > 4) {
        ScrollDay = 0
      }
      var h = time.hour
      var min = time.minute
      var daytime = h + ":" + min
      var rects = []
      var texts = []
      var rectReds = []
      var weekTexts = []
      var isDay = false
      if (day == 3 || day == 5) {
        isDay = true
      }
      var num = 7
      var init = 30
      var L = [60, 60, 53, 60, 53]
      var sum = 0
      if (isDay == true) {
        num = 8
        init = 30
        sum = 0
      }
      var nl = 0
      var undefDays = [];
      for (let z = 0; z < times.length; z++) {
        if (times[z].length == 0) {
          nl += 1;
          undefDays.push(z);
        } else {
        }
      }
      let omittedDays = 0
      for (let j = 0; j < 5; j++) {
        console.log("as: " + as)
        console.log("j: " + j)
        if (undefDays.includes(j)) {

          omittedDays++;  
          continue;  
        }
        for (let i = 0; i < Calendar[j].length; i++) {
          const { width, height } = hmUI.getTextLayout(weekDays[j], {
            text_size: 26,
            text_width: 0,
            wrapped: 0
          })
          let rectRed = hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 390 * (j - omittedDays + as),
            y: 0,
            w: 390,
            h: init,
            color: themeUI,
            radius: 0
          })
          rectReds.push(rectRed)
          let weekText = hmUI.createWidget(hmUI.widget.TEXT, {
            x: (390 / 2 - width / 2) + 390 * (j - omittedDays + as),
            y: -5,
            w: 390,
            h: init + 3,
            color: themeSec,
            text_size: 26,
            text: weekDays[j]
          })
          weekTexts.push(weekText)
          if (getText() != -1 || preSee == true) {
            let rectHeight = (450 - init) / times[j].length - 1;
            let rectSub = rectHeight
            if (rectSub % 1 !== 0) {
              rectSub += 1;
            }
            let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
              x: 390 * (j - omittedDays + as),
              y: init + rectHeight * i,
              w: 390,
              h: rectSub,
              color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
              radius: 0
            })
            rects.push(rect)
            let text = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 25 + 390 * (j - omittedDays + as),
              y: (init + sum) + rectHeight * i,
              w: 390,
              h: 40,
              color: themeSec,
              text_size: 26,
              text: Calendar[j][i]
            })
            texts.push(text)
            let time = hmUI.createWidget(hmUI.widget.TEXT, {
              x: 245 + 390 * (j - omittedDays + as),
              y: (init + sum) + rectHeight * i,
              w: 390,
              h: 40,
              color: themeSec,
              text_size: 18,
              text: initHour[j][i] + ":" + initMinute[j][i] + " - " + get(endHour[j][i + 1], "h", j) + ":" + get(endMinute[j][i + 1], "m", j)
            })
            times.push(time)
          } else {
            if (j != day - 1) {
              let rectHeight = (450 - init) / times[j].length - 1;
              let rectSub = rectHeight
              if (rectSub % 1 !== 0) {
                rectSub += 1;
              }
              let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                x: 390 * (j - omittedDays + as),
                y: init + rectHeight * i,
                w: 390,
                h: rectSub,
                color: getText() == i + 1 && j == day - 1 ? 0x01a8fc : darkerColors[i],
                radius: 0
              })
              rects.push(rect)
              let text = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 25 + 390 * (j - omittedDays + as),
                y: (init + sum) + rectHeight * i,
                w: 390,
                h: 40,
                color: themeSec,
                text_size: 26,
                text: Calendar[j][i]
              })
              texts.push(text)
              let time = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 245 + 390 * (j - omittedDays + as),
                y: (init + sum) + rectHeight * i,
                w: 390,
                h: 40,
                color: themeSec,
                text_size: 18,
                text: initHour[j][i] + ":" + initMinute[j][i] + " - " + get(endHour[j][i + 1], "h", j) + ":" + get(endMinute[j][i + 1], "m", j)
              })
              times.push(time)
            } else {
              let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
                x: 390 * (j - omittedDays + as),
                y: 0,
                w: 390,
                h: 450,
                color: themeBG,
                radius: 0
              })
              let text = hmUI.createWidget(hmUI.widget.TEXT, {
                x: 45 + 390 * (j - omittedDays + as) * 2,
                y: 120,
                w: 390,
                h: 180,
                color: themePrim,
                text_size: 35,
                text: "No hay más clases\n hoy. ¡Aprovecha el\n resto del día!"
              })
            }
          }
        }
      }
      function get(arr, t, index) {
        if (arr == undefined || arr == "") {
          return getLast(t, index)
        } else {
          return arr
        }
      }
      function getLast(type, index) {
        if (type == "m") {
          if (index == 0) {
            return Config.lastMinLun
          } else if (index == 1) {
            return Config.lastMinMar
          } else if (index == 2) {
            return Config.lastMinMie
          } else if (index == 3) {
            return Config.lastMinJue
          } else if (index == 4) {
            return Config.lastMinVie
          }
        } else {
          if (type == "h") {
            if (index == 0) {
              return Config.lastHourLun
            } else if (index == 1) {
              return Config.lastHourMar
            } else if (index == 2) {
              return Config.lastHourMie
            } else if (index == 3) {
              return Config.lastHourJue
            } else if (index == 4) {
              return Config.lastHourVie
            }
          }
        }
      }
      function getText() {
        const currentClass = getCurrentClass(h, min);
        return currentClass
      }
      function convertToMinutes(hour, minute) {
        return parseInt(hour) * 60 + parseInt(minute);
      }

      function getCurrentClass(currentHour, currentMinute) {
        const currentTime = convertToMinutes(currentHour, currentMinute);
        for (let i = 0; i < initHour.length; i++) {
          const classStart = convertToMinutes(initHour[i], initMinute[i]);
          const classEnd = convertToMinutes(endHour[i], endMinute[i]);
          if (currentTime >= classStart && currentTime <= classEnd) {
            return i + 1;
          }
        }
        return -1;
      }
      hmUI.setScrollView(true, 390, 6 - nl + as, false)
      let sc = ScrollDay - nl
      if (sc < 0) {
        sc = 0
      }
      if (preSee != true) {
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 * (5 - nl) + (390 / 2 - 75),
          y: 450 / 2 - 75,
          src: "task.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          hmApp.gotoPage({ url: 'pages/newTask', param: '...' })
        })
        hmUI.scrollToPage(sc, false)
      } else {
        const j = 8
        var confNew = readFile('raw/settings_self.json')
        var task = readFile('raw/tasks_self.json')

        var decodeConfNew = decodeUint8Array(confNew);
        var decodeTask = decodeUint8Array(task);
        function decodeUint8Array(uint8array) {
          let decodedString = "";

          
          for (let i = 0; i < uint8array.length; i++) {
            decodedString += String.fromCharCode(uint8array[i]);
          }

          return decodedString;
        }

        var ConfigNew = JSON.parse(decodeConfNew)
        var newTask = JSON.parse(decodeTask)
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: 0, 
          w: 390,
          h: 450,
          color: themeBG,
          radius: 12
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 10,
          y: 20,
          w: 370,
          h: 430,
          text: "Scroll right and see\nyour schedule´s config.\nAt the end you will\nsee a confirmation button\nabd a cancel button\npress anyone depending\n of if the schedule\nis good or not",
          text_size: 24,
          align_h: hmUI.align.CENTER_H,
          color: themePrim
        })
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 390 * (5 - nl + as),
          y: 0, 
          w: 390,
          h: 450,
          color: themeBG,
          radius: 12
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 390 * (5 - nl + as) + (390 / 2 - 300 / 2) - j,
          y: 90,
          w: 320,
          h: 305,
          text: "¿El horario visualizado\nes correcto?",
          align_h: hmUI.align.CENTER_H,
          text_size: 25,
          color: themePrim
        })
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 * (5 - nl + as),
          y: 400,
          src: "y.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, () => {
          hmApp.reloadPage({ url: 'pages/init', param: '...' })
        })
        function writeFile(filename, data) {
          const buffer = jsonToArrayBuffer(data);
          const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
          hmFS.write(file, buffer, 0, buffer.byteLength);
          hmFS.close(file);
        }
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 * (5 - nl + as) + 195,
          y: 400,
          src: "n.png"
        }).addEventListener(hmUI.event.CLICK_DOWN, () => {
          writeFile("raw/tasks.json", newTask)
          writeFile("raw/settings.json", ConfigNew)
          hmApp.reloadPage({ url: 'pages/init', param: '...' })
        })
        function jsonToArrayBuffer(json) {
          const jsonString = JSON.stringify(json);
          const buffer = new ArrayBuffer(jsonString.length);
          const uint8Array = new Uint8Array(buffer);
          for (let i = 0; i < jsonString.length; i++) {
            uint8Array[i] = jsonString.charCodeAt(i);
          }
          return buffer;
        }
      }
    }
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});


