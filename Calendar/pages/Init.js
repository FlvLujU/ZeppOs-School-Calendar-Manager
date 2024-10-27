const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
var iCan = false
var timeC
Page({
  state: {},
  onInit(params) {
    const paramsObj = JSON.parse(params)
    const { can, timeCur } = paramsObj
    if(can == true){
      iCan = can
      timeC = timeCur
    }
  },
  build() {
    if(iCan){
      hmApp.gotoPage({ url: 'pages/wakeUp', param: "..." })
    }
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
    let datesDisplay = []
    var time = hmSensor.createSensor(hmSensor.id.TIME)
    if (Config.new == true) {
      hmApp.gotoPage({ url: 'pages/profSelect', param: '...' })
    }
    Config.remindMe1.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 1) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe3.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 3) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe7.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 7) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe15.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumD(fecha, 15) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe30.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumM(fecha, 1) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    Config.remindMe60.forEach(reminder => {
      
      let fecha = Object.keys(reminder)[0];
      let tasks = reminder[fecha].tasks;


      tasks.forEach((task, index) => {
        if (sumM(fecha, 2) == sumD(String(time.year) + "-" + String(time.month) + "-" + String(time.day), 0)) {
          datesDisplay.push(task)

        }
      });
    });
    if (datesDisplay.length > 0 && Config.lastYear != time.year && Config.lastMonth != time.month && Config.lastDay != time.day) {
      hmApp.gotoPage({ url: 'pages/anim', param: '...' })
    } else {

    }
    var day = time.week
    const subjects = [
      "Biología",
      "Ciencias Naturales",
      "Ciencias Sociales",
      "Dibujo Técnico",
      "Educación Física",
      "Educación Plástica",
      "Economía",
      "Filosofía",
      "Física",
      "Física y Química",
      "Francés",
      "Geografía",
      "Geografía e Historia",
      "Historia",
      "Inglés",
      "Informática",
      "Latín",
      "Lengua",
      "Literatura",
      "Matemáticas",
      "Música",
      "Química",
      "Religión",
      "Tecnología",
      "TIC",
      "Otros"
    ]
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

    var Calendar = [
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
      Config.VieNumHour,
    ]
    const isAdmin = hmSetting.getUserData().nickName
    if (isAdmin == "flvluju") {
      Calendar = [
        ["Inglés", "Tecnología", "Lengua", "Recreo", "Física", "Historia", "Filosofía"],
        ["Matemáticas", "TIC", "Filosofía", "Recreo", "Física", "Historia", "Inglés"],
        ["TIC", "Historia", "Filosofía", "Recreo", "Tecnología", "Matemáticas", "Lengua", "Física"],
        ["Lengua", "Matemáticas", "Historia", "Recreo", "Tecnología", "TIC", "Inglés"],
        ["Inglés", "Lengua", "Tutoría", "Recreo", "TIC", "Matemáticas", "Física", "Tecnología"]
      ]
      initHour = ["8", "9", "10", "11", "11", "12", "13", "14"]
      endHour = ["9", "10", "11", "11", "12", "13", "14", "15"]
      initMinute = ["30", "25", "20", "15", "45", "40", "35", "30"]
      endMinute = ["25", "20", "15", "45", "40", "35", "30", "25"]
    }
    function locateTask(texto) {
      let regex = /(Matemáticas|Lengua|Física|Filosofía|Historia|Inglés|Tecnología|TIC)/g;
      let resultados = texto.match(regex);
      return subjects.indexOf(resultados[0]);
    }
    function sumD(fecha, dias) {
      let fechaObj = new Date(fecha);
      fechaObj.setDate(fechaObj.getDate() + dias);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
    }
    function sumM(fecha, meses) {
      let fechaObj = new Date(fecha);
      fechaObj.setMonth(fechaObj.getMonth() + meses);
      let nuevaFecha = fechaObj.toISOString().split('T')[0];
      return nuevaFecha;
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
    if (Config.dailyAppRemindMe == true && datesDisplay.length == 0 && buscarFecha(String(time.day) + "/" + String(time.month) + "/" + String(time.year)) == true || Config.dailyAppRemindMe == true && datesDisplay == [] && buscarFecha(String(time.day) + "/" + String(time.month) + "/" + String(time.year)) == true) {
      if (compareDates(new Date(time.year, time.month, time.day), new Date(Config.lastYear, Config.lastMonth, Config.lastDay)) || Config.lastYear == "") {
        Config.lastDay = time.day
        Config.lastMonth = time.month
        Config.lastYear = time.year
        writeFile("raw/settings.json", Config)
        hmApp.reloadPage({ url: 'pages/remind', param: '...' })
      } else {
      }
    } else {
    }
    function buscarFecha(fechaBuscada) {
      
      const data = JSON.parse(decodeJSON);

      
      const fechasEncontradas = [];
      const asignaturasEncontradas = [];
      const dev = [];

      
      data.asignaturas.forEach(asignatura => {
        
        const actividades = [
          ...asignatura.actividades.examenes,
          ...asignatura.actividades.tareas,
          ...asignatura.actividades.proyectos
        ];

        
        actividades.forEach(actividad => {
          

          if (actividad.indexOf("Fecha: " + fechaBuscada) !== -1) {
            

            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          } else if (actividad.indexOf("Entrega: " + fechaBuscada) !== -1) {
            

            fechasEncontradas.push(actividad);
            asignaturasEncontradas.push(asignatura.nombre);
          }
        });
      });
      dev.push(fechasEncontradas);
      dev.push(asignaturasEncontradas);
      if (fechasEncontradas.length > 0) {
        return true;
      } else {
        return false;
      }
    };
    const tareas = extraerTareas(decodeJSON);
    const proyectos = extraerProyectos(decodeJSON);
    const examenes = extraerExamenes(decodeJSON);
    const tareasT = extraerTareasL(decodeJSON);
    const proyectosT = extraerProtectosL(decodeJSON);
    const examenesT = extraerExamenesL(decodeJSON);
    function extraerTareas(data) {
      data = JSON.parse(data); 
      const tareasPorAsignatura = []; 

      
      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura.push(asignatura.actividades.tareas); 
      });

      

      return tareasPorAsignatura; 
    }
    function extraerProyectos(data) {
      data = JSON.parse(data); 
      const proyectosPorAsignatura = []; 

      
      data.asignaturas.forEach(asignatura => {
        const asignaturaProyectos = asignatura.actividades.proyectos
        proyectosPorAsignatura.push(asignaturaProyectos); 
      });

      

      return proyectosPorAsignatura; 
    }
    function extraerExamenes(data) {
      data = JSON.parse(data); 
      const examenesPorAsignatura = []; 

      
      data.asignaturas.forEach(asignatura => {
        const asignaturaExamenes = asignatura.actividades.examenes
        examenesPorAsignatura.push(asignaturaExamenes); 
      });

      return examenesPorAsignatura; 
    }
    function extraerTareasL(data) {
      data = JSON.parse(data);
      const tareasPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        tareasPorAsignatura[asignatura.nombre] = asignatura.actividades.tareas;
      });

      
      const totalTareas = Object.values(tareasPorAsignatura).reduce((total, tareas) => {
        return total + tareas.length;
      }, 0);



      return totalTareas;
    }
    function extraerExamenesL(data) {
      data = JSON.parse(data);
      const examenesPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        examenesPorAsignatura[asignatura.nombre] = asignatura.actividades.examenes;
      });

      
      const totalExamenes = Object.values(examenesPorAsignatura).reduce((total, examenes) => {
        return total + examenes.length;
      }, 0);



      return totalExamenes;
    }
    function extraerProtectosL(data) {
      data = JSON.parse(data);
      const proyectosPorAsignatura = {};

      data.asignaturas.forEach(asignatura => {
        proyectosPorAsignatura[asignatura.nombre] = asignatura.actividades.proyectos;
      });

      
      const totalProyectos = Object.values(proyectosPorAsignatura).reduce((total, proyectos) => {
        return total + proyectos.length;
      }, 0);


      return totalProyectos;
    }
    var self = JSON.parse(decodeJSON); 
    if (Config.autoDelete == true) {
      
      for (const asignatura in tareas) {
        if (tareas[asignatura].length > 0) {
          const indicesAEliminar = []; 
          for (let i = 0; i < tareas[asignatura].length; i++) {
            const tarea = tareas[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(tarea, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.day) + "-" + String(time.month) + "-" + String(time.year)))) {
              indicesAEliminar.push(i);
            }
          }
          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "tarea", indicesAEliminar[i]);
          }
        }
      }

      
      for (const asignatura in proyectos) {
        if (proyectos[asignatura].length > 0) {
          const indicesAEliminar = []; 
          for (let i = 0; i < proyectos[asignatura].length; i++) {
            const proyecto = proyectos[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(proyecto, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.day) + "-" + String(time.month) + "-" + String(time.year)))) {
              indicesAEliminar.push(i); 
            }
          }

          
          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "proyecto", indicesAEliminar[i]);
          }
        }
      }

      
      for (const asignatura in examenes) {
        if (examenes[asignatura].length > 0) {
          const indicesAEliminar = []; 
          for (let i = 0; i < examenes[asignatura].length; i++) {
            const examen = examenes[asignatura][i];

            var delDate;
            try {
              delDate = locateDate(examen, 1);
            } catch (e) {

              delDate = "...";
            }
            if (delDate != "..." && compareDates(new Date(delDate), new Date(String(time.day) + "-" + String(time.month) + "-" + String(time.year)))) {
              indicesAEliminar.push(i); 
            }
          }

          
          for (let i = indicesAEliminar.length - 1; i >= 0; i--) {
            deleteElement(subjectsJson[asignatura], "examen", indicesAEliminar[i]);
          }
        }
      }
    }

    
    function deleteElement(asignatura, tipoElemento, indiceElemento) {
      var data = self; 



      
      const asignaturaData = data.asignaturas.find(asig => asig.nombre === asignatura);

      if (asignaturaData) {
        switch (tipoElemento) {
          case "tarea":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.tareas.length) {
              asignaturaData.actividades.tareas.splice(indiceElemento, 1);

            }
            break;

          case "examen":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.examenes.length) {
              asignaturaData.actividades.examenes.splice(indiceElemento, 1);

            }
            break;

          case "proyecto":
            if (indiceElemento >= 0 && indiceElemento < asignaturaData.actividades.proyectos.length) {
              asignaturaData.actividades.proyectos.splice(indiceElemento, 1);

            }
            break;

          default:

        }

        
        saveJson('raw/tasks.json', data);
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

          return `${day}-${month}-${year}`
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

          return `${day}-${month}-${year}`
        } else {

          return null;
        }
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
    function compareDates(date1, date2) {
      if (date1 > date2) {
        return false
      } else {
        return true
      }
    }
    hmUI.setScrollView(true, 390, 3, false)
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 320 / 2,
      y: 10,
      src: "calendar.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/calendar', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 320 / 2,
      y: 120,
      src: "calendarS.png "
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({
        url: 'pages/index',
        param: JSON.stringify({
          preview: false,
          type: 'normal'
        })
      })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 / 2 - 320 / 2,
      y: 230,
      src: "tasks.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/Tasks', param: '...' })
    })
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 + (390 / 2 - 75),
      y: 100,
      src: "task.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      if (Config.profile != 3) {
        hmApp.gotoPage({ url: 'pages/newTask', param: '...' })
      } else {
        hmApp.gotoPage({ url: 'pages/newTaskW', param: '...' })
      }
    })
    if (isAdmin == "flvluju") {
      hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 + (390 / 2 - 50) - 75,
        y: 270,
        src: "alarmed.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.gotoPage({ url: 'pages/alarm', param: '...' })
      })     
       hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 + (390 / 2 - 50) + 75,
        y: 270,
        src: "timer.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.gotoPage({ url: 'pages/timer', param: '...' })
      })
    }else{
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 + (390 / 2 - 50),
      y: 270,
      src: "timer.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/timer', param: '...' })
    })
  }
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 390 * 2 + (390 / 2 - 75),
      y: 450 / 2 - 75,
      src: "conf.png"
    }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
      hmApp.gotoPage({ url: 'pages/conf', param: '...' })
    })
    var h = time.hour
    var min = time.minute
    var undefDays = [];
    for (let z = 0; z < times.length; z++) {
      if (times[z].length == 0) {
        undefDays.push(z);
      } else {
      }
    }
    let omittedDays = 0
    var sum = 0
    let rect = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 35,
      y: 340,
      w: 390 - 70,
      h: 90,
      color: themeSlot,
      radius: 15
    })
    let text = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 5,
      y: 350,
      w: 390,
      h: 180,
      color: themePrim,
      text_size: 25,
      align_h: hmUI.align.CENTER_H,
      text: "No hay ninguna clase en\neste momento"
    })
    let timeUI = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 40,
      y: 350,
      w: 390,
      h: 180,
      color: themePrim,
      text_size: 25,
      align_h: hmUI.align.CENTER_H,
      text: ""
    })
    var cF
    var iH
    var iM
    var eH
    var eM
    console.log("nickName: " + isAdmin)
    let is = isAdmin == "flvluju"
    console.log("verify: " + is)
    if (isAdmin == "flvluju") {
      console.log("pro admin is on app")
      console.log("pro admin is on app")
      console.log("pro admin is on app")
      cF = [
        ["Inglés", "Tecnología", "Lengua", "Recreo", "Física", "Historia", "Filosofía"],
        ["Matemáticas", "TIC", "Filosofía", "Recreo", "Física", "Historia", "Inglés"],
        ["TIC", "Historia", "Filosofía", "Recreo", "Tecnología", "Matemáticas", "Lengua", "Física"],
        ["Lengua", "Matemáticas", "Historia", "Recreo", "Tecnología", "TIC", "Inglés"],
        ["Inglés", "Lengua", "Tutoría", "Recreo", "TIC", "Matemáticas", "Física", "Tecnología"]
      ]
      iH = ["8", "9", "10", "11", "11", "12", "13", "14"]
      eH = ["9", "10", "11", "11", "12", "13", "14", "15"]
      iM = ["30", "25", "20", "15", "45", "40", "35", "30"]
      eM = ["25", "20", "15", "45", "40", "35", "30", "25"]
    } else {
      cF = Calendar
      iH = initHour
      iM = initMinute
      eH = endHour
      eM = endMinute
    }
    for (let j = 0; j < 5; j++) {
      if (undefDays.includes(j)) {

        omittedDays++;  
        continue;  
      }
      for (let i = 0; i < cF[j].length; i++) {
        if (getText() != -1) {
          let colourNum = subjectsJson.indexOf(cF[j][i])
          rect.setProperty(hmUI.prop.MORE, {
            x: 35,
            y: 340,
            w: 390 - 70,
            h: 90,
            color: themeSlot,
            radius: 15
          })
          text.setProperty(hmUI.prop.MORE, {
            x: 75,
            y: 350,
            w: 390,
            h: 90,
            color: themePrim,
            text_size: 26,
            text: cF[j][i]
          })
          timeUI.setProperty(hmUI.prop.MORE, {
            x: 75,
            y: 382,
            w: 390,
            h: 40,
            color: themePrim,
            text_size: 18,
            text: iH[j][i] + ":" + iM[j][i] + " - " + get(eH[j][i + 1], "h", j) + ":" + get(eM[j][i + 1], "m", j)
          })
          hmUI.createWidget(hmUI.widget.FILL_RECT, {
            x: 45,
            y: 350,
            w: 10,
            h: 70,
            color: subjectsColors[colourNum],
            radius: 12
          })
        }
      }
    }
    function get(arr, t, index) {
      if (arr == undefined) {
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
    const lastsH = [
      Config.lastHourLun,
      Config.lastHourMar,
      Config.lastHourMie,
      Config.lastHourJue,
      Config.lastHourVie
    ]
    const lastsM = [
      Config.lastMinLun,
      Config.lastMinMar,
      Config.lastMinMie,
      Config.lastMinJue,
      Config.lastMinVie
    ]
    function getCurrentClass(currentHour, currentMinute) {
      const currentTime = convertToMinutes(currentHour, currentMinute);
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < Calendar[j].length; j++) {
          const classStart = convertToMinutes(initHour[i][j], initMinute[i][j]);
          const classEnd = convertToMinutes(get(endHour[j][i + 1], "h", j), get(endHour[j][i + 1], "m", j));
          if (currentTime >= classStart && currentTime <= classEnd) {
            return i + 1;
          }
        }
      }
      return -1;
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
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
    vibrate && vibrate.stop()
  },
});
