const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
var alerted = false
var par
function sumTime(hoursToAdd, minutesToAdd, secondsToAdd) {
  const initialDate = new Date();
  initialDate.setHours(time.hour, time.minute, time.second, 0);
  const totalSeconds = (hoursToAdd * 3600) + (minutesToAdd * 60) + secondsToAdd;
  const finalDate = new Date(initialDate.getTime() + totalSeconds * 1000);
  const elapsedSeconds = Math.floor((finalDate - initialDate) / 1000);
  return elapsedSeconds
}
var pH = 0
var pS = 0
var pM = 0
var inTimer = false
var t
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
    let img = hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 100,
      y: 60,
      src: "anim3/StopWatch_0.png"
    })
    let b = 0
    let t = 0
    t = timer.createTimer(0, 100, function () {
      if (b < 59 && t < 5) {
        b++
      } else if (t < 5) {
        b = 0
        t++
      } else {
        timer.stopTimer(t)
      }
      img.setProperty(hmUI.prop.MORE, {
        src: "anim3/" + `StopWatch_${b}` + ".png"
      })
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 70,
      y: 290,
      w: 350,
      h: 50,
      color: 0xffffff,
      text_size: 40,
      text: "Time is over!"
    })
    hmApp.registerGestureEvent(function (event) {
      if (event == hmApp.gesture.RIGHT) {
        hmApp.gotoPage({ url: 'pages/init', param: "..." })
        hmApp.unregisterGestureEvent()
      }
    });
  },
  onDestroy() {
    try {
      timer.stopTimer(t)
    } catch (e) {
      console.log("error: " + e)
    }
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});