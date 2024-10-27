Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
    const themes = [
      "rw", "ob", "by", "bb", "yg", "pc"
    ]
    const j = 8
    const isVertical = true
    hmUI.setScrollView(true, px(450), 4, isVertical)
    var conf = readFile('raw/settings.json')

    var decodeConf = decodeUint8Array(conf);

    var Config = JSON.parse(decodeConf)
    var themeBG = Config.theme.bg
    var themeUI = Config.theme.UI
    var themePrim = Config.theme.primText
    var themeSec = Config.theme.secText
    var themeSlot = Config.theme.slot
    var autoBright;
    autoBright = Config.autoBright
    var autoDark;
    autoDark = Config.autoDark
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
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG,
      radius: 12
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 20,
      w: 255,
      h: 70,
      text: "Profile:",
      text_size: 40,
      color: themePrim
    })
    const v = 110
    const p = 7
    const isAdmin = hmSetting.getUserData().nickName
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
    if (isAdmin == "flvluju") {
      var b3 = hmUI.createWidget(hmUI.widget.IMG, {
        x: (390 / 2 - 300 / 2) - j,
        y: 57 + 40 + 57 + 40 - p + v,
        w: 57,
        h: 57,
        src: "unselect.png"
      })
    }
    var selected = 1
    b1.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      b1.setProperty(hmUI.prop.MORE, {
        src: "select.png"
      })
      b2.setProperty(hmUI.prop.MORE, {
        src: "unselect.png"
      })
      selected = 1
      b3.setProperty(hmUI.prop.MORE, {
        src: "unselect.png"
      })
    })
    b2.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      b1.setProperty(hmUI.prop.MORE, {
        src: "unselect.png"
      })
      b2.setProperty(hmUI.prop.MORE, {
        src: "select.png"
      })
      selected = 2
      b3.setProperty(hmUI.prop.MORE, {
        src: "unselect.png"
      })
    })
    if (isAdmin == "flvluju") {
      b3.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        b1.setProperty(hmUI.prop.MORE, {
          src: "unselect.png"
        })
        b2.setProperty(hmUI.prop.MORE, {
          src: "unselect.png"
        })
        selected = 3
        b3.setProperty(hmUI.prop.MORE, {
          src: "select.png"
        })
      })
    }
    var yR = 110
    const b = 10
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - b + 75,
      y: yR,
      w: 222,
      h: 70,
      text: "High school",
      text_size: 30,
      color: themePrim
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - b + 75,
      y: 57 + 40 + yR,
      w: 222,
      h: 70,
      text: "University",
      text_size: 30,
      color: themePrim
    })
    if (isAdmin == "flvluju") {
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - b + 75,
        y: 57 + 40 + 57 + 40 + yR,
        w: 145,
        h: 70,
        text: "Working",
        text_size: 30,
        color: themePrim
      })
    }
    hmApp.registerGestureEvent(function (event) {
      if (event == hmApp.gesture.RIGHT) {
        hmApp.unregisterGestureEvent()
        hmApp.exit()
      }
    });
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
        if (selected == 2) {
          Config.profile = 1
          Config.modify = "isModify"
          writeFile("raw/settings.json", Config)
          hmApp.reloadPage({ url: 'pages/setUp', param: '...' })
        } else if (selected == 1) {
          Config.profile = 2
          Config.modify = "isModify"
          writeFile("raw/settings.json", Config)
          hmApp.reloadPage({ url: 'pages/setUpV2', param: '...' })
        } else if (selected == 3) {
          Config.profile = 3
          Config.modify = "isModify"
          writeFile("raw/settings.json", Config)
          hmApp.reloadPage({ url: 'pages/setUpV3', param: '...' })
        }
      }
    })
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
    function decodeUint8Array(uint8array) {
      let decodedString = "";


      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
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
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});