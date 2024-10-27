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
    var confNew = readFile('raw/settings_self.json')
    var task = readFile('raw/tasks_self.json')
    
    var decodeConf = decodeUint8Array(conf);
    var decodeConfNew = decodeUint8Array(confNew);
    var decodeTask = decodeUint8Array(task);
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    
    var Config = JSON.parse(decodeConf)
    var ConfigNew = JSON.parse(decodeConfNew)
    var newTask = JSON.parse(decodeTask)
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
    var rY = 20
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
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
      w: 320,
      h: 70,
      text: "Resetear datos?:",
      text_size: 40,
      color: themePrim
    })    
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 90,
      w: 320,
      h: 305,
      text: "Esta acción es irreversible\ntras hacerlo, tendra\nque volver a configurar\nla aplicación.\n¿Desea proceder?",
      text_size:25,
      color: themePrim
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 400,
      src: "y.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      writeFile("raw/tasks.json", newTask)
      writeFile("raw/settings.json", ConfigNew)
      hmApp.reloadPage({ url: 'pages/init', param: '...' })
    })
    function writeFile(filename, data) {
      const buffer = jsonToArrayBuffer(data);
      const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
      hmFS.write(file, buffer, 0, buffer.byteLength);
      hmFS.close(file);
    }
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 195,
      y: 400,
      src: "n.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
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
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});