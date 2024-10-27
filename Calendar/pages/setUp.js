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
    const sub = [
      "Administración de Empresas",
      "Alemán",
      "Algebra Lineal",
      "Antropología",
      "Antropología Aplicada",
      "Antropología Cultural",
      "Arqueología",
      "Arquitectura",
      "Artes Visuales",
      "Auditoría",
      "Bases de Datos",
      "Bioética",
      "Bioética en la Investigación",
      "Biología",
      "Biología Molecular",
      "Biotecnología",
      "Cálculo Diferencial",
      "Cálculo Integral",
      "Cálculo Numérico",
      "Ciencias Ambientales",
      "Ciencias de la Computación",
      "Ciencias Forenses",
      "Ciencias Políticas",
      "Ciberseguridad",
      "Comunicación Social",
      "Comercio Internacional",
      "Contabilidad",
      "Contemporaneidad",
      "Crítica Literaria",
      "Criminología",
      "Desarrollo Infantil",
      "Desarrollo Organizacional",
      "Desarrollo Sostenible",
      "Desarrollo Urbano",
      "Didáctica",
      "Derecho",
      "Derecho Internacional",
      "Diseño de Interacción",
      "Diseño de Productos",
      "Diseño Gráfico",
      "Economía",
      "Ecología",
      "Ecotoxicología",
      "Educación",
      "Energías Renovables",
      "Etica",
      "Emprendimiento",
      "Estadística",
      "Estudios Africanos",
      "Estudios Asiáticos",
      "Estudios Culturales",
      "Estudios Latinoamericanos",
      "Física Aplicada",
      "Física Clásica",
      "Física Moderna",
      "Fisiología",
      "Fisioterapia",
      "Finanzas",
      "Filosofía",
      "Filosofía Política",
      "Francés",
      "Geografía Económica",
      "Geografía Física",
      "Geografía Humana",
      "Gestión Ambiental",
      "Gestión Cultural",
      "Gestión del Cambio",
      "Gestión de Proyectos",
      "Gestión de Recursos Naturales",
      "Gestión del Talento Humano",
      "Historia",
      "Historia Contemporánea",
      "Historia del Arte",
      "Historia Natural",
      "Idiomas Extranjeros",
      "Imagen y Sonido",
      "Inmunología",
      "Ingeniería Civil",
      "Ingeniería Electrónica",
      "Ingeniería Industrial",
      "Ingeniería Mecánica",
      "Inteligencia Artificial",
      "Italiano",
      "Latín",
      "Lingüística",
      "Lingüística Aplicada",
      "Matemáticas Avanzadas",
      "Matemáticas Discretas",
      "Matemáticas Financieras",
      "Música",
      "Neurociencia",
      "Neuropsicología",
      "Nanomedicina",
      "Nanotecnología",
      "Odontología",
      "Optica",
      "Probabilidad y Estadística",
      "Prácticas Empresariales",
      "Psicología",
      "Psicología Organizacional",
      "Química",
      "Química Física",
      "Química Inorgánica",
      "Química Orgánica",
      "Relaciones Internacionales",
      "Robótica",
      "Salud Mental",
      "Salud Pública",
      "Salud Pública Global",
      "Sociología",
      "Sociología del Trabajo",
      "Sistemas de Información",
      "Teatro",
      "Técnicas de Comunicación",
      "Técnicas de Estudio",
      "Terapia Ocupacional",
      "Teoría de Números",
      "Teoría de Sistemas",
      "Teoría del Aprendizaje",
      "Teoría del Conocimiento",
      "Trabajo Social",
      "Veterinaria",
      "Vigilancia Epidemiológica"
    ];
    var nextScreenX = 1
    var subY = 0
    var bools = []
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 24 * 390,
      h: 450,
      color: themeBG,
    })
    let idx = 0
    let number = 7
    let space = 45
    let organizedData = agrupate(sub)
    let groups = []
    let groups2 = []
    var showBools = 0
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
      if (subarray.length > 0) result.push(subarray);
      return result;
    }
    
    for (let re = 0; re < sub.length; re++) {
      if (re % number === 0 && re !== 0) idx++;
    }
    
    for (let i = 0; i < number; i++) {
      let txt = hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40 + 390,
        y: 2 + subY * space,
        w: 258,
        h: 33,
        text: sub[i],
        color: themePrim,
        text_size: 25,
      });
    
      let img = hmUI.createWidget(hmUI.widget.IMG, {
        x: 300 + 390,
        y: 2 + subY * space,
        src: "false.png",
      });
    
      groups.push(txt);
      groups2.push(img);
      for (let re = 0; re < sub.length; re++) {
        if (re % number == 0 && re != 0) {
          idx++
          //subY = 0
        }
        console.log("max: " + idx)
        subY++;
      }
      img.addEventListener(hmUI.event.CLICK_DOWN, () => {
        let boolIndex = i + showBools * number;
        bools[boolIndex] = !bools[boolIndex];
        img.setProperty(hmUI.prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
      });
    }
    
    if (idx > 0) {
      let preButton = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 390,
        y: 370,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: themePrim,
        text_size: 33,
        text: 'Prev.',
        click_func: () => {
          showBools = Math.max(showBools - 1, 0);
          updatePage();
        },
      });
    
      let nextButton = hmUI.createWidget(hmUI.widget.BUTTON, {
        x: 390 + 390 / 2,
        y: 370,
        w: 390 / 2,
        h: 80,
        press_color: 0xe9efe8,
        normal_color: 0xd8ded7,
        color: themePrim,
        text_size: 33,
        text: 'Next.',
        click_func: () => {
          showBools = Math.min(showBools + 1, idx);
          updatePage();
        },
      });
    }
    
    function updatePage() {
      let text = organizedData[showBools];
      for (let qw = 0; qw < number; qw++) {
        let boolIndex = qw + showBools * number;
        if (text && text[qw] !== undefined && text[qw] !== "") {
          groups[qw].setProperty(hmUI.prop.MORE, { text: text[qw] });
          groups2[qw].setProperty(hmUI.prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
    
          groups2[qw].removeEventListener(hmUI.event.CLICK_DOWN, () => {});
          groups2[qw].addEventListener(hmUI.event.CLICK_DOWN, () => {
            bools[boolIndex] = !bools[boolIndex];
            groups2[qw].setProperty(hmUI.prop.MORE, { src: bools[boolIndex] ? "true.png" : "false.png" });
          });
        } else {
          groups[qw].setProperty(hmUI.prop.MORE, { text: "" });
          groups2[qw].setProperty(hmUI.prop.MORE, { src: ".png" });
          groups2[qw].removeEventListener(hmUI.event.CLICK_DOWN, () => {});
        }
      }
    }
    
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 20,
      y: 20,
      w: 350,
      h: 270,
      color: themePrim,
      text_size: 18,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: "Scroll to right to see all the\nuniversity subjects.\nChoose the ones you have\nand the press \"Submit\"\nbutton to continue.\n\nOr just add a\ncustom one."
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 37,
      y: 280,
      src: "add.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/write', param: '...' })
    })
    hmApp.registerGestureEvent(function (event) {
      if (event == hmApp.gesture.RIGHT) {
        hmApp.unregisterGestureEvent()
        hmApp.gotoPage({ url: 'pages/profSelect', param: '...' })
      }
    });
    var userSub = []
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
        if (bools.indexOf(true) != -1) {
          for (let i = 0; i < sub.length; i++) {
            if (bools[i] == true) {
              userSub.push(sub[i])
            }
          }
          if (Config.customSubjects.length > 0) {
            console.log("thats true")
            for (let j = 0; j < Config.customSubjects.length; j++) {
              console.log("custom: " + Config.customSubjects[j])
              userSub.push(Config.customSubjects[j])
            }
          }
          Config.addedSubjects = userSub
          writeFile("raw/settings.json", Config)
          hmApp.gotoPage({ url: 'pages/times', param: '...' })
        } else {
          hmUI.showToast({
            text: "Add unless one subject\nto continue."
          })
        }
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
    hmUI.setScrollView(true, 390, nextScreenX + 1, false)
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});