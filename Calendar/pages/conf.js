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
    var rY = 20
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0, 
      w: 390,
      h: 450 * 5 + 100,
      color: themeBG,
      radius: 12
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 20,
      w: 255,
      h: 70,
      text: "Tema:",
      text_size: 40,
      color: themePrim
    })
    hmUI.createWidget(hmUI.widget.STROKE_RECT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 100 - j + rY,
      w: 300 + j * 2,
      h: 300 + j * 2,
      radius: 25,
      line_width: j,
      color: themeSlot
    })
    var count = 0;
    count = getTheme();
    function getTheme() {
       
      if (String(Config.theme.bg) == "0xffffff") {
        count = 0;
      } else if (String(Config.theme.bg) == "0x333333") {
        count = 1;
      } else if (String(Config.theme.bg) == "0x6c757d") {
        count = 2;
      } else if (String(Config.theme.bg) == "0x87ceeb") {
        count = 3;
      } else if (String(Config.theme.bg) == "0xf5f5dc") {
        count = 4;
      } else if (String(Config.theme.bg) == "0xffdab9") {
        count = 5;
      }
      return count;
    }
    var theme = hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 300 / 2,
      y: 100 + rY,
      src: themes[count] + ".png"
    });
    var bgColor = ["0xffffff", "0x333333", "0x6c757d", "0x87ceeb", "0xf5f5dc", "0xffdab9"];
    var UIColor = ["0xee1907", "0xff4500", "0xfaf3e0", "0x4682B4", "0x556B2F", "0x8A2BE2"];
    var PrimColor = ["0x000000", "0xffffff", "0x000000", "0x1C1C1C", "0x8B4513", "0x5F9EA0"];
    var SecColor = ["0xffffff", "0x000000", "0x000000", "0xF8F8FF", "0xFFF8DC", "0xFFD700"];
    var SlotColor = ["0xdce8da", "0x7f8a7d", "0xdce8da", "0xB0C4DE", "0xdcdcaf", "0xDDA0DD"];
    var TriColor = ["0x535352", "0xffffff", "0xffffff", "0x000000", "0x000000", "0x000000"]
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
    function writeFile(filename, data) {
      const buffer = jsonToArrayBuffer(data);
      const file = hmFS.open_asset(filename, hmFS.O_RDWR | hmFS.O_TRUNC);
      hmFS.write(file, buffer, 0, buffer.byteLength);
      hmFS.close(file);
    }
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    let h = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 300 / 2 + 180,
      y: 100 + rY,
      w: 200,
      h: 100,
      text: "Text",
      text_size: 50,
      color: themePrim
    })
    let g = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 / 2 - 300 / 2 + 20,
      y: 100 + rY + 210,
      w: 200,
      h: 100,
      text: "Text",
      text_size: 50,
      color: themeSec
    })
    theme.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      count++
      if (count > 5) {
        count = 0
      }
      theme.setProperty(hmUI.prop.MORE, {
        src: themes[count] + ".png"
      })
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("raw/settings.json", Config)
      hmApp.reloadPage({ url: 'pages/conf', param: '...' })
    })
    g.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      count++
      if (count > 5) {
        count = 0
      }
      theme.setProperty(hmUI.prop.MORE, {
        src: themes[count] + ".png"
      })
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("raw/settings.json", Config)
      hmApp.reloadPage({ url: 'pages/conf', param: '...' })
    })
    h.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      count++
      if (count > 5) {
        count = 0
      }
      theme.setProperty(hmUI.prop.MORE, {
        src: themes[count] + ".png"
      })
      Config.theme.bg = bgColor[count]
      Config.theme.UI = UIColor[count]
      Config.theme.primText = PrimColor[count]
      Config.theme.secText = SecColor[count]
      Config.theme.slot = SlotColor[count]
      Config.theme.triText = TriColor[count]
      Config.modify = "isModify"
      Config.numberTheme = count
      writeFile("raw/settings.json", Config)
      hmApp.reloadPage({ url: 'pages/conf', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 465,
      w: 255,
      h: 70,
      text: "Auto bright:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 525,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoBright,
      checked_change_func: (checked) => {
        Config.autoBright = slide_switch.getProperty(hmUI.prop.CHECKED)
        Config.modify = "isModify"
        writeFile("raw/settings.json", Config)
      }
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 565,
      w: 255,
      h: 70,
      text: "Auto dark:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch2 = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 625,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoDark,
      checked_change_func: (checked) => {
        Config.autoDark = slide_switch2.getProperty(hmUI.prop.CHECKED)
        Config.modify = "isModify"
        writeFile("raw/settings.json", Config)
      }
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 665,
      w: 255,
      h: 70,
      text: "Daily update:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch4 = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 725,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.dailyAppRemindMe,
      checked_change_func: (checked) => {
        Config.dailyAppRemindMe = slide_switch4.getProperty(hmUI.prop.CHECKED)
        Config.modify = "isModify"
        writeFile("raw/settings.json", Config)
      }
    })
    /*hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 765,
      w: 255,
      h: 70,
      text: "Automatic task delete:",
      text_size: 40,
      color: themePrim
    })
    const slide_switch3 = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
      x: (390 / 2 - 300 / 2) - j,
      y: 825,
      w: 96,
      h: 64,
      select_bg: 'on.png',
      un_select_bg: 'off.png',
      slide_src: '.png',
      slide_select_x: 40,
      slide_un_select_x: 8,
      checked: Config.autoDelete,
      checked_change_func: (checked) => {
        Config.autoDelete = slide_switch3.getProperty(hmUI.prop.CHECKED)
        Config.modify = "isModify"
        writeFile("raw/settings.json", Config)
      }
    })*/
    var img
    if (lang == 0) {
      img = "en.png"
    } else if (lang == 1) {
      img = "es.png"
    } else if (lang == 2) {
      img = "fr.png"
    }
    var p = 540 - 450
    var lang1 = hmUI.createWidget(hmUI.widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 925 + p,
      src: "en.png",
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "en.png"
      });
      Config.languaje = 0
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    var lang2 = hmUI.createWidget(hmUI.widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 975 + p,
      src: "es.png",
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "es.png"
      });
      Config.languaje = 1
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    var lang3 = hmUI.createWidget(hmUI.widget.IMG, {
      x: (390 / 2 - 300 / 2) - j,
      y: 1025 + p,
      src: "fr.png",
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "fr.png"
      });
      Config.languaje = 2
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    var langgtext1 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 925 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'English'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "en.png"
      });
      Config.languaje = 0
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    var langgtext2 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 975 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'Spanish'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "es.png"
      });
      Config.languaje = 1
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    var langgtext3 = hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j + 60,
      y: 1025 + p,
      w: 140,
      h: 40,
      color: themePrim,
      text_size: 20,
      text: 'French'
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      bt_lang.setProperty(hmUI.prop.MORE, {
        src: "fr.png"
      })
      Config.languaje = 2
      Config.modify = "isModify"
      writeFile("raw/settings.json", Config)
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 825 + p,
      w: 255,
      h: 70,
      text: "Languaje:",
      text_size: 40,
      color: themePrim
    })
    var bt_lang = hmUI.createWidget(hmUI.widget.IMG, {
      x: 235,
      y: 845 + p,
      src: img
    });
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: (390 / 2 - 300 / 2) - j,
      y: 825 + 450 + p,
      w: 255,
      h: 70,
      text: "Clear all data:",
      text_size: 40,
      color: themePrim
    })
    var del = hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 100 / 2,
      y: 900 + 450 + 110,
      src: "delete.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, () => {
      hmApp.reloadPage({ url: 'pages/restore', param: '...' })
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