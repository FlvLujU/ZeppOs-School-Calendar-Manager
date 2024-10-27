
Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
    var time = hmSensor.createSensor(hmSensor.id.TIME)
    var jsonBase = readFile('raw/tasks.json')
    
    var decodeJSON = decodeUint8Array(jsonBase);
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    }
    var colorsT = [
      0x0004ff,
      0x09ff01,
      0xff0000
    ]
    
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
    if (time.hour > 21 && autoDark == true) {
      var themeBG = Config.nightTheme.bg
      var themeUI = Config.nightTheme.UI
      var themePrim = Config.nightTheme.primText
      var themeSec = Config.nightTheme.secText
      var themeSlot = Config.nightTheme.slot
    }
    if (autoBright == true) {
      hmSetting.setScreenAutoBright(true)
    }
    var subjectsUser;
    subjectsUser = Config.addedSubjects
    var customColors;
    customColors = Config.colors
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
    function extraerExamenes(data) {
      data = JSON.parse(data);
      const examenesPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        examenesPorAsignatura[asignatura.nombre] = asignatura.actividades.examenes;
      });
      
      return examenesPorAsignatura;
    }
    function extraerTareas(data) {
      data = JSON.parse(data);
      const tareasPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura[asignatura.nombre] = asignatura.actividades.tareas;
      });
      
      return tareasPorAsignatura;
    }
    function extraerProtectos(data) {
      data = JSON.parse(data);
      const proyectosPorAsignatura = {};
      data.asignaturas.forEach(asignatura => {
        proyectosPorAsignatura[asignatura.nombre] = asignatura.actividades.proyectos;
      });
      
      return proyectosPorAsignatura;
    }
    var bg = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      h: 9999,
      w: 390,
      color: themeBG,
    })
    const subjectsJson = [
      'Matemáticas',
      'Lengua',
      'Física',
      'Filosofía',
      'Historia',
      'Inglés',
      'Tecnología',
      'TIC',
      "Biología",
      "Ciencias Naturales",
      "Ciencias Sociales",
      "Dibujo Técnico",
      "Educacion Física",
      "Educacion Plástica",
      "Economía",
      "Física y Química",
      "Geografía",
      "Informática",
      "Latín",
      "Literatura",
      "Música",
      "Química",
      "Religión",
      "Otros"
    ]
    const subjectsColors = [
      0xFFD700,
      0x1E90FF,
      0x00FFFF,
      0x800080,
      0x8B4513,
      0xff4500,
      0x32CD32,
      0xA9A9A9,
      0x32CD32,
      0x00FF7F,
      0xFFD700,
      0x800080,
      0x1E90FF,
      0x00FFFF,
      0x8B4513,
      0xf7c2be,
      0xA9A9A9,
      0xFF4500,
      0x2E8B57,
      0xFF1493,
      0x4682B4,
      0x808000,
      0x7B68EE,
      0xB22222
    ];
    const categorizedSubjects = {
      "Ciencias Naturales": [
        "Biología",
        "Ciencias Naturales",
        "Ecología",
        "Ecotoxicología",
        "Inmunología",
        "Neurociencia",
        "Neuropsicología",
        "Nanomedicina",
        "Nanotecnología",
        "Odontología"
      ],
      "Ciencias Sociales": [
        "Ciencias Sociales",
        "Educación Física",
        "Filosofía",
        "Geografía",
        "Geografía e Historia",
        "Historia",
        "Religión",
        "Antropología",
        "Antropología Aplicada",
        "Antropología Cultural",
        "Arqueología",
        "Ciencias Ambientales",
        "Ciencias Forenses",
        "Ciencias Políticas",
        "Comunicación Social",
        "Comercio Internacional",
        "Contabilidad",
        "Criminología",
        "Desarrollo Infantil",
        "Desarrollo Organizacional",
        "Desarrollo Sostenible",
        "Desarrollo Urbano",
        "Derecho",
        "Derecho Internacional",
        "Gestión Ambiental",
        "Gestión Cultural",
        "Gestión del Cambio",
        "Gestión de Proyectos",
        "Gestión de Recursos Naturales",
        "Gestión del Talento Humano",
        "Historia Contemporánea",
        "Historia del Arte",
        "Historia Natural",
        "Sociología",
        "Sociología del Trabajo",
        "Estudios Africanos",
        "Estudios Asiáticos",
        "Estudios Culturales",
        "Estudios Latinoamericanos"
      ],
      "Idiomas": [
        "Francés",
        "Inglés",
        "Latín",
        "Lengua",
        "Literatura",
        "Alemán",
        "Italiano"
      ],
      "Matemáticas": [
        "Matemáticas",
        "Algebra Lineal",
        "Cálculo Diferencial",
        "Cálculo Integral",
        "Cálculo Numérico",
        "Matemáticas Avanzadas",
        "Matemáticas Discretas",
        "Matemáticas Financieras",
        "Probabilidad y Estadística",
        "Estadística"
      ],
      "Economía": [
        "Economía",
        "Administración de Empresas",
        "Finanzas"
      ],
      "Música": [
        "Música"
      ],
      "Educación": [
        "Educación Plástica",
        "Educación Física"
      ],
      "TIC": [
        "Tecnología",
        "Informática",
        "TIC"
      ],
      "Dibujo Técnico": [
        "Dibujo Técnico"
      ],
      "Física": [
        "Física",
        "Física Aplicada",
        "Física Clásica",
        "Física Moderna",
        "Fisiología",
        "Fisioterapia"
      ],
      "Química": [
        "Química",
        "Química Física",
        "Química Inorgánica",
        "Química Orgánica"
      ],
      "Otros": [
        "Artes Visuales",
        "Auditoría",
        "Bioética",
        "Bioética en la Investigación",
        "Energías Renovables",
        "Etica",
        "Emprendimiento",
        "Imagen y Sonido",
        "Ingeniería Civil",
        "Ingeniería Electrónica",
        "Ingeniería Industrial",
        "Ingeniería Mecánica",
        "Inteligencia Artificial",
        "Prácticas Empresariales",
        "Psicología",
        "Psicología Organizacional",
        "Relaciones Internacionales",
        "Salud Mental",
        "Salud Pública",
        "Salud Pública Global",
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
        "Vigilancia Epidemiológica",
        "Contemporaneidad",
        "Crítica Literaria"
      ]
    };

    function getSubjectGroup(subject) {
      for (const group in categorizedSubjects) {
        if (categorizedSubjects[group].includes(subject)) {
          return group;
        }
      }
      return "Asignatura no encontrada";
    }

    
    const tareas = extraerTareas(decodeJSON);
    const proyectos = extraerProtectos(decodeJSON);
    const examenes = extraerExamenes(decodeJSON);
    const tArray = []
    const eArray = []
    const pArray = []
    var tCount = 0
    var eCount = 0
    var pCount = 0
    var Mat_T = []
    var Leng_T = []
    var Ing_T = []
    var Tic_T = []
    var Fil_T = []
    var His_T = []
    var Fis_T = []
    var Tec_T = []
    var Mat_E = []
    var Leng_E = []
    var Ing_E = []
    var Tic_E = []
    var Fil_E = []
    var His_E = []
    var Fis_E = []
    var Tec_E = []
    var Mat_P = []
    var Leng_P = []
    var Ing_P = []
    var Tic_P = []
    var Fil_P = []
    var His_P = []
    var Fis_P = []
    var Tec_P = []
    for (const asignatura in tareas) {
      tCount += tareas[asignatura].length
      if (tareas[asignatura].length > 0) {
        
        switch (asignatura) {
          case "Matemáticas":
            Mat_T.push(...tareas[asignatura]);
            break;
          case "Lengua":
            Leng_T.push(...tareas[asignatura]);
            break;
          case "Inglés":
            Ing_T.push(...tareas[asignatura]);
            break;
          case "TIC":
            Tic_T.push(...tareas[asignatura]);
            break;
          case "Filosofía":
            Fil_T.push(...tareas[asignatura]);
            break;
          case "Historia":
            His_T.push(...tareas[asignatura]);
            break;
          case "Física":
            Fis_T.push(...tareas[asignatura]);
            break;
          case "Tecnología":
            Tec_T.push(...tareas[asignatura]);
            break;
        }
      } else {
        
      }
    }

    for (const asignatura in proyectos) {
      pCount += proyectos[asignatura].length
      if (proyectos[asignatura].length > 0) {
        
        switch (asignatura) {
          case "Matemáticas":
            Mat_P.push(...proyectos[asignatura]);
            break;
          case "Lengua":
            Leng_P.push(...proyectos[asignatura]);
            break;
          case "Inglés":
            Ing_P.push(...proyectos[asignatura]);
            break;
          case "TIC":
            Tic_P.push(...proyectos[asignatura]);
            break;
          case "Filosofía":
            Fil_P.push(...proyectos[asignatura]);
            break;
          case "Historia":
            His_P.push(...proyectos[asignatura]);
            break;
          case "Física":
            Fis_P.push(...proyectos[asignatura]);
            break;
          case "Tecnología":
            Tec_P.push(...proyectos[asignatura]);
            break;
        }
      } else {
        
      }
    }

    for (const asignatura in examenes) {
      eCount += examenes[asignatura].length
      if (examenes[asignatura].length > 0) {
        
        switch (asignatura) {
          case "Matemáticas":
            Mat_E.push(...examenes[asignatura]);
            break;
          case "Lengua":
            Leng_E.push(...examenes[asignatura]);
            break;
          case "Inglés":
            Ing_E.push(...examenes[asignatura]);
            break;
          case "TIC":
            Tic_E.push(...examenes[asignatura]);
            break;
          case "Filosofía":
            Fil_E.push(...examenes[asignatura]);
            break;
          case "Historia":
            His_E.push(...examenes[asignatura]);
            break;
          case "Física":
            Fis_E.push(...examenes[asignatura]);
            break;
          case "Tecnología":
            Tec_E.push(...examenes[asignatura]);
            break;
        }
        eCount++
      } else {
        
      }
    }
    function deleteElement(asignatura, tipoElemento, indiceElemento) {
      
      var data = JSON.parse(decodeJSON);  

      
      data.asignaturas.forEach(asig => {
        if (asig.nombre === asignatura) {
          
          switch (tipoElemento) {
            case "tarea":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.tareas.length) {
                asig.actividades.tareas.splice(indiceElemento, 1);  
                
              } else {
                
              }
              break;

            case "examen":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.examenes.length) {
                asig.actividades.examenes.splice(indiceElemento, 1);  
                
              } else {
                
              }
              break;

            case "proyecto":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.proyectos.length) {
                asig.actividades.proyectos.splice(indiceElemento, 1);  
                
              } else {
                
              }
              break;

            default:
              
          }

          
          saveJson('raw/tasks.json', data);
          hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
        }
      });
    }
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
    var t = 20
    let c = 0; 
    for (const asignatura in tareas) {
      if (tareas[asignatura].length > 0) {
        
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10, 
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text_size: 30,
          text: `Tareas:` 
        });
        for (const [i, tarea] of tareas[asignatura].entries()) {
          
          let txt = tarea.substring(0, tarea.indexOf("!"))
          let colourNum = subjectsJson.indexOf(asignatura)
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 40 + 85 * c + 6 + 30, 
            w: 390 - 20,
            h: 80,
            color: themeSlot,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 50 + 85 * c + 6 + 30, 
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })
          
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 50 + 85 * c + 6 + 30 - 10, 
            w: 390 - 20,
            h: 80,
            color: themePrim,
            text: txt, 
            text_size: t - 2
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(tarea, asignatura, i, "tarea");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 350,
            y: 65 + 85 * c + 6 + 30 - 15,
            w: 24,
            h: 7,
            color: colorsT[1],
            radius: 3,
          })

          c++; 
        }
      }
    }
    function renderMoreTask(description, name, index, doc) {
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
        text: name + ":"
      })
      let refresh = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 - 115,
        y: 5,
        src: "refresh.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
      })
      let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 10,
        y: 90,
        w: 370,
        h: 200,
        radius: 15,
        color: themeSlot
      });
      let colourNum = subjectsJson.indexOf(name)
      let rect2 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 20,
        y: 100,
        w: 20,
        h: 180,
        radius: 15,
        color: subjectsColors[colourNum]
      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 90,
        w: 390,
        h: 450,
        text_size: 20,
        color: themePrim,
        align_h: hmUI.align.CENTER_H,
        text: "Descripción:\n" + description.substring(0, description.indexOf("!"))
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 210,
        w: 390,
        h: 450,
        text_size: 20,
        color: themePrim,
        align_h: hmUI.align.CENTER_H,
        text: description.substring(description.indexOf("!") + 1, description.length)
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 175,
        y: 325,
        src: "delete.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        deleteElement(name, doc, index)
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 50,
        y: 325,
        src: "alarm.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        renderRemindMeScreen(description, name, index, doc)
      })
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 + 75,
        y: 325,
        src: "edit.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      })
    }
    function renderRemindMeScreen(description, name, index, doc) {
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
      var string = "1"
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
        x: (390 / 2 - 300 / 2) - j + o + 5,
        y: 0 - p + v,
        w: 57,
        h: 57,
        src: "unselect.png"
      })
      var b5 = hmUI.createWidget(hmUI.widget.IMG, {
        x: (390 / 2 - 300 / 2) - j + o + 5,
        y: 57 + 40 - p + v,
        w: 57,
        h: 57,
        src: "unselect.png"
      })
      var b6 = hmUI.createWidget(hmUI.widget.IMG, {
        x: (390 / 2 - 300 / 2) - j + o + 5,
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
        string = "3"
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
        string = "7"
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
        string = "15"
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
        string = "30"
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
        string = "60"
      })
      var yR = 100
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75,
        y: yR,
        w: 100,
        h: 70,
        text: "1 Day",
        text_size: 30,
        color: themePrim
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75,
        y: 57 + 40 + yR,
        w: 100,
        h: 70,
        text: "3 Days",
        text_size: 30,
        color: themePrim
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75,
        y: 57 + 40 + 57 + 40 + yR,
        w: 100,
        h: 70,
        text: "1 Week",
        text_size: 30,
        color: themePrim
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
        y: yR,
        w: 255,
        h: 70,
        text: "2 Weeks",
        text_size: 30,
        color: themePrim
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75 + o + 5,
        y: 57 + 40 + yR,
        w: 200,
        h: 70,
        text: "1 Month",
        text_size: 30,
        color: themePrim
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: (390 / 2 - 300 / 2) - j + 75 + o,
        y: 57 + 40 + 57 + 40 + yR + 5,
        w: 200,
        h: 70,
        text: "2 Months",
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
          renderRemindAdd(name, doc, index, string, description)
        }
      })
    }
    function locateTask(texto) {
      let regex = /(Proyecto|Ejercicios|Examen)/g;
      let resultados = texto.match(regex);
      if (resultados == "Ejercicios") {
        return 1;
      } else if (resultados == "Examen") {
        return 2;
      } else if (resultados == "Proyecto") {
        return 1;
      }
    }
    function locateDate(texto, type) {
      if (type == 1) {
        let regex = /Entrega:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/;
        let resultado = texto.match(regex);
        if (resultado) {
          let day = resultado[1];
          let month = resultado[2];
          let year = resultado[3];
          
          return `${year}-${month}-${day}`
        } else {
          
          return null;
        }
      } else if (type == 2) {
        let regex = /Fecha:\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/;
        let resultado = texto.match(regex);
        if (resultado) {
          let day = resultado[1];
          let month = resultado[2];
          let year = resultado[3];
          
          return `${year}-${month}-${day}`
        } else {
          
          return null;
        }
      }
    }
    function renderRemindAdd(asignatura, tipoElemento, indiceElemento, typeSave, txt) {
      let can = true
      const date = locateDate(txt, locateTask(txt))
      var data = JSON.parse(decodeJSON);  
      var conf = JSON.parse(decodeConf)
      
      var newRemind;
      data.asignaturas.forEach(asig => {
        if (asig.nombre === asignatura) {
          
          switch (tipoElemento) {
            case "tarea":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.tareas.length) {
                newRemind = asig.actividades.tareas[indiceElemento];  
                
              } else {
                
              }
              break;

            case "examen":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.examenes.length) {
                newRemind = asig.actividades.examenes[indiceElemento];
                
              } else {
                
              }
              break;

            case "proyecto":
              if (indiceElemento >= 0 && indiceElemento < asig.actividades.proyectos.length) {
                newRemind = asig.actividades.proyectos[indiceElemento];
                
              } else {
                
              }
              break;

            default:
              
          }
        }
      })

      var existingReminder;
      if (typeSave == "1") {
        existingReminder = conf.remindMe1.find(reminder => reminder[date]);
      } else if (typeSave == "3") {
        existingReminder = conf.remindMe3.find(reminder => reminder[date]);
      } else if (typeSave == "7") {
        existingReminder = conf.remindMe7.find(reminder => reminder[date]);
      } else if (typeSave == "15") {
        existingReminder = conf.remindMe15.find(reminder => reminder[date]);
      } else if (typeSave == "30") {
        existingReminder = conf.remindMe30.find(reminder => reminder[date]);
      } else if (typeSave == "60") {
        existingReminder = conf.remindMe60.find(reminder => reminder[date]);
      }
      if (existingReminder) {
        existingReminder[date].tasks.push(newRemind);
      } else {
        
        let newReminder = {
          [date]: {
            tasks: [newRemind]
          }
        };

        
        if (typeSave == "1") {
          conf.remindMe1.push(newReminder)
        } else if (typeSave == "3") {
          conf.remindMe3.push(newReminder)
        } else if (typeSave == "7") {
          conf.remindMe7.push(newReminder)
        } else if (typeSave == "15") {
          conf.remindMe15.push(newReminder)
        } else if (typeSave == "30") {
          conf.remindMe30.push(newReminder)
        } else if (typeSave == "60") {
          conf.remindMe60.push(newReminder)
        }
      }
      conf.lastDay = time.day - 1
      conf.lastMonth = time.month - 1
      conf.lastYear = time.year - 1
      saveJson('raw/settings.json', conf);
      hmApp.reloadPage({ url: 'pages/Tasks', param: '...' })
    }

    var d = 0
    for (const asignatura in examenes) {
      if (examenes[asignatura].length > 0) {
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10 + 80 + 85 * c + 10 + 5 + 36, 
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text_size: 30,
          text: `Examenes:` 
        });
        
        for (const [i, examen] of examenes[asignatura].entries()) {
          
          let colourNum = subjectsJson.indexOf(asignatura)
          let txt = examen.substring(0, examen.indexOf("!"))
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 10 + 80 + 85 * c + 10 + 5 + 40 + 85 * d + 66, 
            w: 390 - 20,
            h: 80,
            color: themeSlot,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 10 + 80 + 85 * c + 10 + 5 + 50 + 85 * d + 66, 
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 10 + 80 + 85 * c + 70 + 5 + 50 + 85 * d + 6, 
            w: 390 - 20,
            h: 80,
            color: themePrim,
            text: txt, 
            text_size: t
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(examen, asignatura, i, "examen");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 350,
            y: 10 + 80 + 85 * c + 70 + 5 + 45 + 85 * d + 6,
            w: 24,
            h: 7,
            color: colorsT[0],
            radius: 3,
          })
          d++; 
        }
      }
    }
    var e = 0
    for (const asignatura in proyectos) {
      if (proyectos[asignatura].length > 0) {
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 10 + 80 + 85 * c + 10 + 5 + 50 + 85 * d + 10 + 5 + 66,
          h: 80,
          w: 222,
          text_size: 30,
          color: themePrim,
          text: `Proyectos:`
        });
        for (const [i, proyecto] of proyectos[asignatura].entries()) {
          let colourNum = subjectsJson.indexOf(asignatura)
          let txt = proyecto.substring(0, proyecto.indexOf("!"))
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 10,
            y: 10 + 80 + 85 * c + 10 + 5 + 70 + 85 * d + 10 + 35 + 90 + 85 * e + 6,
            w: 390 - 20,
            h: 80,
            color: themeSlot,
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 20,
            y: 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 10 + 35 + 90 + 85 * e + 6, 
            w: 10,
            h: 60,
            color: subjectsColors[colourNum],
            radius: 12
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })
          
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 40,
            y: 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6, 
            w: 390 - 20,
            h: 80,
            color: themePrim,
            text: txt, 
            text_size: t
          }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
            renderMoreTask(proyecto, asignatura, i, "proyecto");
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 350,
            y: 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6,
            w: 24,
            h: 7,
            color: colorsT[2],
            radius: 3,
          })
          e++; 
        }
      }
    }
    let minV2 = 10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6
    if (10 + 80 + 85 * c + 10 + 5 + 80 + 85 * d + 40 + 35 + 70 + 85 * e - 5 + 6 < 450) {
      minV2 = 450
    }
    if (c > 0 || d > 0 || e > 0) {
      let add = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 76 / 2,
        y: minV2,
        src: "add.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
      })
    }
    if (c == 0 && d == 0 && e == 0) {
      hmUI.setLayerScrolling(false)
      let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: themeBG
      });
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 0,
        w: 390,
        h: 450,
        color: themePrim,
        text_size: 22,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text: "No task added!!!.\n\n Add task by sliding to the right\non the init page or\nin shcool calendar´s last page or here"
      });
      let add = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 / 2 - 76 / 2,
        y: 300 + 35,
        src: "add.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/newTask', param: '...' })
      })
    }
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});





