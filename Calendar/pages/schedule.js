const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
Page({
  state: {},
  build() {
    var nl = 0
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


    var conf = readFile('raw/settings.json')

    var decodeConf = decodeUint8Array(conf);

    var Config = JSON.parse(decodeConf);


    var themeBG = Config.theme.bg;
    var themeUI = Config.theme.UI;
    var themePrim = Config.theme.primText;
    var themeSec = Config.theme.secText;
    var themeSlot = Config.theme.slot;
    var lang = Config.languaje;
    var remindMe = Config.remindMe;
    var dailyAppRemindMe = Config.dailyAppRemindMe;
    var profile = Config.profile;


    var LUN = Config.Schedule.Lun;
    var MAR = Config.Schedule.Mar;
    var MIE = Config.Schedule.Mie;
    var JUE = Config.Schedule.Jue;
    var VIE = Config.Schedule.Vie;

    var subjectsUser = Config.addedSubjects;
    var customColors = Config.colors;

    let datesDisplay = [];
    var time = hmSensor.createSensor(hmSensor.id.TIME);

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


    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const darkerColors = [
      "0x96a29a", "0x8a928f", "0x858f8c", "0x7f8a87", "0x7e837f",
      "0x76807e", "0x6f6a69", "0x665f5e", "0x5e5a58", "0x5a4f4e",
      "0x52484a", "0x4e3f3d", "0x483534", "0x442b29", "0x422f2d",
      "0x3c2927"
    ];

    var times = [
      Config.LunNumMin,
      Config.MarNumMin,
      Config.MieNumMin,
      Config.JueNumMin,
      Config.VieNumMin
    ];

    var init = 30;
    var rects = [
      [], [], [], [], []
    ]
    var rectsD = [
      [], [], [], [], []
    ]
    var texts = [
      [], [], [], [], []
    ]
    let classIndexs = [
      [], [], [], [], []
    ];
    var scheduleArr = [
      new Array(times[0].length), new Array(times[1].length), new Array(times[2].length), new Array(times[3].length), new Array(times[4].length)
    ]
    var sub = Config.addedSubjects
    if (Config.profile != 3) {
      sub.push("Comedor");
      sub.push("Recreo");
      sub.push("Tutoría")
    }

    let globalClassCounter = 1;
    var undefDays = [];
    for (let z = 0; z < times.length; z++) {
      if (times[z].length == 0) {
        nl += 2;
        undefDays.push(z);
      } else {
      }
    }

    let omittedDays = 0;
    var showBools = []
    for (let qw = 0; qw < 5 - omittedDays; qw++) {
      showBools.push(0)
    }
    for (let i = 0; i < 5; i++) {

      if (undefDays.includes(i)) {

        omittedDays++;
        continue;
      }


      let p = (i - omittedDays) * 2;

      const { width, height } = hmUI.getTextLayout(days[i], {
        text_size: 26,
        text_width: 0,
        wrapped: 0
      });

      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 390 + 390 * p,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG,
      });

      let idx = 0
      let number = 7
      let space = 45
      let subY = 0;
      let organizedData = agrupate(sub)
      let groups = [[], [], [], [], []]
      let groups2 = [[], [], [], [], []]


      for (let p = 0; p < number; p++) {
        let txt = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 390 + 45 + (i - omittedDays) * 2 * 390,
          y: 2 + subY * space,
          w: 258,
          h: 33,
          text: sub[p],
          color: 0x000000,
          text_size: 25
        });

        let img = hmUI.createWidget(hmUI.widget.IMG, {
          x: 390 + 300 + (i - omittedDays) * 2 * 390,
          y: 2 + subY * space,
          src: sub[p] != undefined && sub[p] != "" ? "plusS.png" : ".png"
        });
        groups[i].push(txt)
        groups2[i].push(img)
        img.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          if (texts[i] && texts[i][classIndexs[i]]) {
            texts[i][classIndexs[i]].setProperty(hmUI.prop.MORE, {
              text: sub[p]
            });
            scheduleArr[i][classIndexs[i]] = sub[p];
          } else {
            hmUI.showToast({
              text: "Selecciona una clase en el horario del " + days[i]
            });
          }
        });
        if (sub[p] == undefined && sub[p] == "") {
          img.removeEventListener(hmUI.event.CLICK_DOWN, function (info) { })
        }
        subY++;
        //tolerated length = 10
      }
      for (let re = 0; re < sub.length; re++) {
        if (re % number == 0 && re != 0) {
          idx++
          //subY = 0
        }
        console.log("max: " + idx)
      }
      if (idx > 0) {
        let preButton = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 390 + (i - omittedDays) * 2 * 390,
          y: 450 - 80,
          w: 390 / 2,
          h: 80,
          press_color: 0xe9efe8,
          normal_color: 0xd8ded7,
          color: themePrim,
          text_size: 33,
          text: 'Prev.',
          click_func: () => {
            let max = idx
            showBools[i] -= 1
            if (showBools[i] < 0) {
              showBools[i] = 0
            }
            console.log("new-: " + showBools[i])
            console.log("l: " + groups[i][idx].length)
            let text = organizedData[showBools[i]]
            console.log("Text: " + text)
            for (let qw = 0; qw < number; qw++) {
              console.log("Text2: " + text[qw])
              groups[i][qw].setProperty(hmUI.prop.MORE, {
                text: text[qw] != undefined && text[qw] != "" ? text[qw] : ""
              })
              if (text[qw] != undefined && text[qw] != "") {
                groups2[i][qw].setProperty(hmUI.prop.MORE, {
                  src: "plusS.png"
                })
                groups2[i][qw].removeEventListener(hmUI.event.CLICK_DOWN, function (info) { })
                groups2[i][qw].addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  if (texts[i] && texts[i][classIndexs[i]]) {
                    texts[i][classIndexs[i]].setProperty(hmUI.prop.MORE, {
                      text: text[qw]
                    });
                    scheduleArr[i][classIndexs[i]] = text[qw];
                  } else {
                    hmUI.showToast({
                      text: "Selecciona una clase en el horario del " + days[i]
                    });
                  }
                });
              } else {
                groups2[i][qw].setProperty(hmUI.prop.MORE, {
                  src: ".png"
                })
                groups2[i][qw].removeEventListener(hmUI.event.CLICK_DOWN, function (info) { })
              }
            }
          }
        });
        let nextButton = hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 390 + 390 / 2 + (i - omittedDays) * 2 * 390,
          y: 370,
          w: 390 / 2,
          h: 80,
          press_color: 0xe9efe8,
          normal_color: 0xd8ded7,
          color: themePrim,
          text_size: 33,
          text: 'Next.',
          click_func: () => {
            let max = idx
            showBools[i] += 1
            if (showBools[i] > max) {
              showBools[i] = max
            }
            console.log("l: " + max)
            console.log("new+: " + showBools[i])
            let text = organizedData[showBools[i]]
            console.log("Text: " + text)
            for (let qw = 0; qw < number; qw++) {
              console.log("Text2: " + text[qw])
              groups[i][qw].setProperty(hmUI.prop.MORE, {
                text: text[qw] != undefined && text[qw] != "" ? text[qw] : ""
              })
              if (text[qw] != undefined && text[qw] != "") {
                groups2[i][qw].setProperty(hmUI.prop.MORE, {
                  src: "plusS.png"
                })
                groups2[i][qw].removeEventListener(hmUI.event.CLICK_DOWN, function (info) { })
                groups2[i][qw].addEventListener(hmUI.event.CLICK_DOWN, (info) => {
                  if (texts[i] && texts[i][classIndexs[i]]) {
                    texts[i][classIndexs[i]].setProperty(hmUI.prop.MORE, {
                      text: text[qw]
                    });
                    scheduleArr[i][classIndexs[i]] = text[qw];
                  } else {
                    hmUI.showToast({
                      text: "Selecciona una clase en el horario del " + days[i]
                    });
                  }
                });
              } else {
                groups2[i][qw].setProperty(hmUI.prop.MORE, {
                  src: ".png"
                })
                groups2[i][qw].removeEventListener(hmUI.event.CLICK_DOWN, function (info) { })
              }
            }
          }
        });
      }
      function agrupate(data) {
        const result = [];
        let subarray = [];

        for (let sData of data) {
          subarray.push(sData);
          if (subarray.length % number === 0) {
            result.push(subarray);
            subarray = [];
          }
        }
        if (subarray.length > 0) {
          result.push(subarray);
        }

        return result;
      }
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 390 * p,
        y: 0,
        w: 390,
        h: init,
        color: themeUI,
        radius: 0
      });


      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - width / 2) + 390 * p,
        y: -5,
        w: 390,
        h: init + 3,
        color: themeSec,
        text_size: 26,
        text: days[i]
      });

      let rectHeight = (450 - init) / times[i].length;
      let rectSub = rectHeight;
      if (rectSub % 1 !== 0) {
        rectSub += 1;
      }
      let rectHeightd = 450 / times[i].length;
      let rectSubd = rectHeight;
      if (rectSubd % 1 !== 0) {
        rectSubd += 1;
      }
      for (let j = 0; j < times[i].length; j++) {
        let xP = 390 * p;
        let yP = init + rectHeight * j;
        let wP = 390 + 35;
        let hP = rectSub;
        let xPd = 390 * (p + 1);
        let yPd = rectHeightd * j;
        let wPd = 35;
        let hPd = rectSubd;
        var rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: xP,
          y: yP,
          w: wP,
          h: hP,
          color: darkerColors[j]
        });
        var rectD = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: xPd,
          y: yPd,
          w: wPd,
          h: hPd,
          color: darkerColors[j]
        });
        rects[i].push(rect);
        rectsD[i].push(rectD)

        let classNumber = globalClassCounter;
        globalClassCounter++;

        let text = hmUI.createWidget(hmUI.widget.TEXT, {
          x: 20 + 390 * p,
          y: init + rectHeight * j,
          w: 390,
          h: 100,
          text: Config.profile < 3 ? "Class " + classNumber : "Item " + classNumber,
          text_size: 27,
          color: themePrim
        });
        texts[i].push(text);

        let l = j;
        rect.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(hmUI.prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(hmUI.prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });

        text.addEventListener(hmUI.event.CLICK_DOWN, (info) => {
          classIndexs[i] = l;
          for (let j = 0; j < times[i].length; j++) {
            rects[i][j].setProperty(hmUI.prop.MORE, {
              x: 390 * p,
              y: init + rectHeight * j,
              w: 390 + 35,
              h: rectSub,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
            rectsD[i][j].setProperty(hmUI.prop.MORE, {
              x: 390 * (p + 1),
              y: rectHeightd * j,
              w: 35,
              h: rectSubd,
              color: j == l ? 0x01a8fc : darkerColors[j]
            });
          }
        });
      }
    }

    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 390 * (10 - nl),
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    })
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 390 * (10 - nl) + 20,
      y: 20,
      w: 300,
      h: 250,
      color: themePrim,
      text_size: 26,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "If your schedule`s\nsubjectss are configured\npress the \"Next\"\nbutton to continue."
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 390 * (10 - nl),
      y: 400,
      w: 390,
      h: 50,
      radius: 7,
      normal_color: themeUI,
      press_color: themeUI,
      color: themePrim == "0x8B4513" ? 0xffffff : themePrim,
      text: 'Next',
      click_func: () => {
        if (checkUndefined(scheduleArr)) {
          Config.Schedule.Lun = scheduleArr[0]
          Config.Schedule.Mar = scheduleArr[1]
          Config.Schedule.Mie = scheduleArr[2]
          Config.Schedule.Jue = scheduleArr[3]
          Config.Schedule.Vie = scheduleArr[4]
          Config.new = false
          writeFile("raw/settings.json", Config)
          hmApp.gotoPage({
            url: 'pages/index',
            param: JSON.stringify({
              preview: true,
              type: 'normal'
            })
          })
        } else {
          hmUI.showToast({
            text: "Asegurate de poner una clase para cada hora en tu horario"
          })
        }
      }
    });
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
    function checkUndefined(arr) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          if (arr[i][j] === undefined || arr[i][j] === "") {

            return false;
          }
        }
      }
      return true;
    }
    hmUI.setScrollView(true, 390, (6 * 2 - 1) - nl, false);
    hmUI.scrollToPage(0, false)
  },

  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});