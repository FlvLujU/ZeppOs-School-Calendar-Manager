Page({
  state: {},
  build() {
    hmUI.setStatusBarVisible(false)
    hmUI.setLayerScrolling(false)
    const time = hmSensor.createSensor(hmSensor.id.TIME);
    var months =
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
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
      
    var jsonBase = readFile('raw/tasks.json')
    
    var decodeJSON = decodeUint8Array(jsonBase);
    
    function decodeUint8Array(uint8array) {
      let decodedString = "";

      
      for (let i = 0; i < uint8array.length; i++) {
        decodedString += String.fromCharCode(uint8array[i]);
      }

      return decodedString;
    } var conf = readFile('raw/settings.json')
    
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
      h: 9999,
      w: 390,
      color: themeBG,
    })
    var date = String(time.day) + "/" + String(time.month) + "/" + String(time.year)
    var data = buscarFecha(String(time.day) + "/" + String(time.month) + "/" + String(time.year))
    renderPageDate(data, date)
    function renderPageDate(data, date) {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        h: 9999,
        w: 390,
        color: themeBG,
      })
      let maskMonth = hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        w: 390,
        h: 70,
        color: themeUI
      })
      hmUI.createWidget(hmUI.widget.TEXT, {
        x: 40,
        y: 20,
        w: 255,
        h: 70,
        text: `Agenda de hoy:`,
        text_size: 25,
        color: themeSec
      })
      let refresh = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 - 105,
        y: 5,
        src: "refresh.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/init', param: '...' })
      })
      for (let i = 0; i < data[0].length; i++) {
        let txt = data[0][i].substring(0, data[0][i].indexOf("!"))
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 10,
          y: 120 + 85 * i,
          w: 370,
          h: 80,
          radius: 12,
          color: themeSlot
        })
        let colourNum = subjectsJson.indexOf(data[1][i])
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 20,
          y: 130 + 85 * i,
          w: 10,
          h: 60,
          color: subjectsColors[colourNum],
          radius: 12
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 40,
          y: 130 + 85 * i - 10, 
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text: txt, 
          text_size: 18
        })
      }
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
        
        
        return dev; 
      } else {
        
        return dev; 
      }
    };
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});