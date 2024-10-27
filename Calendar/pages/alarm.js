const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
var alerted = false
var par
Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
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
    var k = 0
    var g = 0
    var b = 0
    var p = 0
    var modifyO = false
    var modifyT = false
    var modifyTr = false
    var modifyF = false
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 70,
      color: themeUI
    });
    let txt = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 10,
      w: 385,
      h: 70,
      text: "Set new alarm´s time:",
      text_size: 33,
      color: themeSec
    })
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let one = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 5,
      y: 50,
      w: 130,
      h: 120,
      color: 0xffffff,
      text_size: 100,
      text: String(arr[k])
    })
    one.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      one.setProperty(hmUI.prop.MORE, {
        color: 0x3b83bd
      })
      two.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      four.setProperty(hmUI.prop.MORE, {
        color: 0x4b4b4b
      })
      if (modifyO) {
        k++
        if (k > 11) {
          k = 0
        }
        one.setProperty(hmUI.prop.MORE, {
          text: String(arr[k])
        })
      }
      modifyO = true
      modifyT = false
      modifyTr = false
      modifyF = false
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 90 + 15 + 5 + 5 + 5 + 3,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: 100,
      text: ":"
    })
    var arr2 = [0, 1, 2, 3, 4, 5]
    let two = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 170 - 10 - 40 + 15 + 5 + 5 + 5,
      y: 50,
      w: 60,
      h: 120,
      color: 0xffffff,
      text_size: 100,
      text: String(arr2[b])
    })
    two.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      one.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(hmUI.prop.MORE, {
        color: 0x3b83bd
      })
      three.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      four.setProperty(hmUI.prop.MORE, {
        color: 0x4b4b4b
      })
      if (modifyT) {
        b++
        if (b > 5) {
          b = 0
        }
        two.setProperty(hmUI.prop.MORE, {
          text: String(arr2[b])
        })
      }
      modifyO = false
      modifyT = true
      modifyTr = false
      modifyF = false
    })
    var arr3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let three = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 260 - 15 - 10 - 10 - 40 + 15 + 5 + 5 + 5,
      y: 50,
      w: 60,
      h: 120,
      text_size: 100,
      color: 0xffffff,
      text: String(arr3[g])
    })
    three.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      one.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(hmUI.prop.MORE, {
        color: 0x3b83bd
      })
      four.setProperty(hmUI.prop.MORE, {
        color: 0x4b4b4b
      })
      if (modifyTr) {
        g++
        if (g > 9) {
          g = 0
        }
        three.setProperty(hmUI.prop.MORE, {
          text: String(arr3[g])
        })
      }
      modifyO = false
      modifyT = false
      modifyTr = true
      modifyF = false
    })
    var arr4 = ["AM", "PM"]
    let four = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 260 - 15 - 10 - 10 - 40 - 15 + (260 - 170) - 5 + 15 + 5 + 5 + 5,
      y: 70,
      w: 130,
      h: 60,
      text_size: 50,
      color: 0x4b4b4b,
      text: arr4[p]
    })
    four.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      one.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      two.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      three.setProperty(hmUI.prop.MORE, {
        color: 0xffffff
      })
      four.setProperty(hmUI.prop.MORE, {
        color: 0x3b83bd
      })
      if (modifyF) {
        p++
        if (p > 1) {
          p = 0
        }
        four.setProperty(hmUI.prop.MORE, {
          text: arr4[p]
        })
      }
      modifyO = false
      modifyT = false
      modifyTr = false
      modifyF = true
    })
    var alarm
    const slide_switch = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: (390 / 2 - 76 / 2),
      y: 325,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: false,
      checked_change_func: (checked) => {
        if(Config.alarmMe == true){
          Config.alarmMe = false
          try{
          hmApp.alarmCancel(Config.currentAlarm)
          }catch(e){
            console.log("error: " + e)
          }
          hmApp.alarmCancel(alarm)
          saveJson("raw/settings.json", Config)
        }else{
          const seconds = tiempoRestante(String(arr[k]), String(arr2[b]) + String(arr3[g]), arr4[p])
          console.log("scomds:" + seconds)
          alarm = hmApp.alarmNew({
            file: 'pages/wakeUp',
            appid: 1017761,
            delay: seconds
          })
          Config.currentAlarm  = alarm
          Config.alarmMe = true
          saveJson("raw/settings.json", Config)
        }
      }
    })
    function tiempoRestante(hora, minutos, am_pm) {
      console.log("userH: " + hora)
      console.log("userMinute: " + minutos)
      console.log("AM!PM: " + am_pm)
      let h = time.hour
      if (h > 12) {
        h -= 12
      }
      const ahora = new Date();
      console.log("curH: " + h)
      console.log("curM: " + time.minute)
      ahora.setHours(h, time.minute, 0, 0);
      console.log("SEC: " + ahora.getTime())
      if (am_pm == 'PM' && hora < 12) {
        hora += 12;
      } else if (am_pm == 'AM' && hora === 12) {
        hora = 0;
      }
      const horaObjetivo = new Date();
      horaObjetivo.setHours(hora, minutos, 0, 0);
      console.log("userAlarm: " + horaObjetivo.getTime())
      if (horaObjetivo.getTime() <= ahora.getTime()) {
        horaObjetivo.setDate(horaObjetivo.getDate() + 1);
      }
      const diferenciaSegundos = Math.floor((horaObjetivo - ahora) / 1000);
      console.log("dif: " + diferenciaSegundos)
      return diferenciaSegundos;
    }
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});