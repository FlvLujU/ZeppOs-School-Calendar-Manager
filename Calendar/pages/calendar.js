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
        'Matematicas',
        'Lengua',
        'Fisica',
        'Filosofia',
        'Historia',
        'Ingles',
        'Tecnologia',
        'TIC',
        "Biología",
        "Ciencias Naturales",
        "Ciencias Sociales",
        "Dibujo Tecnico",
        "Educacion Fisica",
        "Educacion Plastica",
        "Economia",
        "Fisica y Quimica",
        "Geografia",
        "Informatica",
        "Latin",
        "Literatura",
        "Musica",
        "Quimica",
        "Religion",
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
    var dates = JSON.parse(decodeJSON).fechas
    var year, month, week;
    let cYear = time.year, cMonth = time.month, cWeek = time.week, cDay = time.day;
    
    if (cYear != year || cMonth != month) {
      year = cYear, month = cMonth;
      week = (cWeek + 35 - (cDay - 1)) % 7;
    }
    function getFirstDayOfMonth(year, month) {
      let date = new Date(year, month - 1, 1);
      return date.getDay();
    }

    function getDayNum(year, month) {
      return new Date(year, month, 0).getDate();
    }
    var impt = []
    var impt2 = []
    var impt3 = []
    var impt4 = []
    var impt5 = []
    var impt6 = []
    var xr = []
    var yr = []
    var wr = []
    var hr = []
    var xr2 = []
    var yr2 = []
    var wr2 = []
    var hr2 = []
    var xr3 = []
    var yr3 = []
    var wr3 = []
    var hr3 = []
    var xr4 = []
    var yr4 = []
    var wr4 = []
    var hr4 = []
    var xr5 = []
    var yr5 = []
    var wr5 = []
    var hr5 = []
    var xr6 = []
    var yr6 = []
    var wr6 = []
    var hr6 = []
    function reColor() {
      for (let j = 0; j < 6; j++) {
        for (let i = 0; i < 7; i++) {
          let index = i + j * 7;
          let subcolor = i < 5 && j <= 4 ? themeBG : (j > 4 ? themeBG : themeSlot)
          let testColor = 0x45f74a
          impt[index].setProperty(hmUI.prop.MORE, {
            x: xr[i],
            y: yr[index],
            w: wr[i],
            h: hr[i],
            color: subcolor,
          });
          impt2[index].setProperty(hmUI.prop.MORE, {
            x: xr2[i],
            y: yr2[index],
            w: wr2[i],
            h: hr2[i],
            color: subcolor,
          });
          impt3[index].setProperty(hmUI.prop.MORE, {
            x: xr3[i],
            y: yr3[index],
            w: wr3[i],
            h: hr3[i],
            color: subcolor,
          });
          impt4[index].setProperty(hmUI.prop.MORE, {
            x: xr4[i],
            y: yr4[index],
            w: wr4[i],
            h: hr4[i],
            color: subcolor,
          });
          impt5[index].setProperty(hmUI.prop.MORE, {
            x: xr5[i],
            y: yr5[index],
            w: wr5[i],
            h: hr5[i],
            color: subcolor,
          });
          impt6[index].setProperty(hmUI.prop.MORE, {
            x: xr6[i],
            y: yr6[index],
            w: wr6[i],
            h: hr6[i],
            color: subcolor,
          });
          events[index].removeEventListener(hmUI.event.CLICK_UP, function (info) {
          });
        }
      }
    }
    var color = 0xea780d
    function renderCalendar(year, month) {
      let str = '\n\n\n\n';
      let firstDay = getFirstDayOfMonth(year, month);
      let dayNum = getDayNum(year, month);
      firstDay = (firstDay + 6) % 7;
      var initI = 1
      let cWeek = firstDay;
      reColor()
      var counter = 0
      let count = 0
      if (cWeek == 5) {
        initI += 2
        cWeek = -1
      }
      if (cWeek == 6) {
        initI += 1
        cWeek = -1
      }
      for (let i = 0; i < firstDay + initI - 1; i++) {
        if (initI == 1) {
          str += '          ';
          count++
        } else {
          if (i == 0) {
            str += "\n"
          }
          cWeek = 0
        }
      }
      for (let i = initI; i <= dayNum; i++, cWeek++) {
        count++
        if (i < 10) str += '0';
        str += i + '     ';
        let renderDate = String(i) + "/" + String(month) + "/" + String(year)
        if (String(i).length == 1 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 1)) {
          let array = buscarTipoFecha(renderDate);
          array.sort((a, b) => a - b);
          
          const colorMap = {
            1: colorsT[0],
            2: colorsT[1],
            3: colorsT[2],
          };

          
          const setPropertiesForAll = (count, i, color) => {
            
            const impts = [impt, impt2, impt3, impt4, impt5, impt6];
            const xrs = [xr, xr2, xr3, xr4, xr5, xr6];
            const yrs = [yr, yr2, yr3, yr4, yr5, yr6];
            const wrs = [wr, wr2, wr3, wr4, wr5, wr6];
            const hrs = [hr, hr2, hr3, hr4, hr5, hr6];

            for (let j = 0; j < impts.length; j++) {
              try {
                impts[j][count - 1].setProperty(hmUI.prop.MORE, {
                  x: xrs[j][count - 1],
                  y: yrs[j][count - 1],
                  w: wrs[j][count - 1],
                  h: hrs[j][count - 1],
                  color: color[j],
                });
              } catch (e) {
                
              }
            }
          };
          var colorArray = [];
          if (array.length === 1) {
            colorArray.push(colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]]);
          } else if (array.length === 2) {
            if (array.includes(1) && array.includes(2)) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[1]);
            } else if (array.includes(1) && array.includes(3)) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[2], colorsT[2], colorsT[2]);
            } else if (array.includes(2) && array.includes(3)) {
              
              colorArray.push(colorsT[1], colorsT[1], colorsT[1], colorsT[2], colorsT[2], colorsT[2]);
            }
          } else if (array.length === 3) {
            
            colorArray.push(colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[2], colorsT[2]);
          }
          setPropertiesForAll(count, i, colorArray);
          events[count - 1].addEventListener(hmUI.event.CLICK_UP, function (info) {
            let data = buscarFecha(renderDate);
            renderPageDate(data, renderDate);
          });
        } else if (String(i).length == 2 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 2)) {
          let array = buscarTipoFecha(renderDate);
          array.sort((a, b) => a - b);
          
          const colorMap = {
            1: colorsT[0],
            2: colorsT[1],
            3: colorsT[2],
          };

          
          const setPropertiesForAll = (count, i, color) => {
            
            const impts = [impt, impt2, impt3, impt4, impt5, impt6];
            const xrs = [xr, xr2, xr3, xr4, xr5, xr6];
            const yrs = [yr, yr2, yr3, yr4, yr5, yr6];
            const wrs = [wr, wr2, wr3, wr4, wr5, wr6];
            const hrs = [hr, hr2, hr3, hr4, hr5, hr6];

            for (let j = 0; j < impts.length; j++) {
              try {
                impts[j][count - 1].setProperty(hmUI.prop.MORE, {
                  x: xrs[j][count - 1],
                  y: yrs[j][count - 1],
                  w: wrs[j][count - 1],
                  h: hrs[j][count - 1],
                  color: color[j],
                });
              } catch (e) {
                
              }
            }
          };
          var colorArray = [];
          if (array.length === 1) {
            colorArray.push(colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]]);
          } else if (array.length === 2) {
            if (array.includes(1) && array.includes(2)) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[1]);
            } else if (array.includes(1) && array.includes(3)) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[2], colorsT[2], colorsT[2]);
            } else if (array.includes(2) && array.includes(3)) {
              
              colorArray.push(colorsT[1], colorsT[1], colorsT[1], colorsT[2], colorsT[2], colorsT[2]);
            }
          } else if (array.length === 3) {
            
            colorArray.push(colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[2], colorsT[2]);
          }
          setPropertiesForAll(count, i, colorArray);

          events[count - 1].addEventListener(hmUI.event.CLICK_UP, function (info) {
            let data = buscarFecha(renderDate);
            renderPageDate(data, renderDate);
          });
        }
        if (cWeek >= 4) {
          str += '\n';
          cWeek = -1
          i += 2;
          count += 2
          counter++
        }
      }

      calendar.setProperty(hmUI.prop.MORE, {
        text: str
      });
      monthShow.setProperty(hmUI.prop.MORE, {
        text: months[month - 1] + ' ' + year
      });

      
    }
    var colorv = 0xb1cdd0
    function renderCalendarEnd(year, month) {
      let str = '\n\n\n\n';
      let firstDay = getFirstDayOfMonth(year, month);
      let f = (firstDay + 6) % 7;
      let dayNum = getDayNum(year, month);
      
      if (firstDay == 0) {
        str += "          "
      }
      let mult = 1
      var count = 0
      var add = 0
      for (let i = 1; i <= dayNum; i++) {
        count++
        let dayOfWeek = new Date(year, month - 1, i).getDay();
        dayOfWeek = (dayOfWeek + 6) % 7;
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          if (i < 10) str += '0';
          str += i + '     ';
          let renderDate = String(i) + "/" + String(month) + "/" + String(year)
          if (String(i).length == 1 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 1)) {
            let array = buscarTipoFecha(renderDate);
            array.sort((a, b) => a - b);
            
            const colorMap = {
              1: colorsT[0],
              2: colorsT[1],
              3: colorsT[2],
            };
  
            
            const setPropertiesForAll = (count, i, color) => {
              
              const impts = [impt, impt2, impt3, impt4, impt5, impt6];
              const xrs = [xr, xr2, xr3, xr4, xr5, xr6];
              const yrs = [yr, yr2, yr3, yr4, yr5, yr6];
              const wrs = [wr, wr2, wr3, wr4, wr5, wr6];
              const hrs = [hr, hr2, hr3, hr4, hr5, hr6];
  
              for (let j = 0; j < impts.length; j++) {
                try {
                  impts[j][count].setProperty(hmUI.prop.MORE, {
                    x: xrs[j][count],
                    y: yrs[j][count],
                    w: wrs[j][count],
                    h: hrs[j][count],
                    color: color[j],
                  });
                } catch (e) {
                  
                }
              }
            };
            var colorArray = [];
            if (array.length === 1) {
              colorArray.push(colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]]);
            } else if (array.length === 2) {
              if (array.includes(1) && array.includes(2)) {
                
                colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[1]);
              } else if (array.includes(1) && array.includes(3)) {
                
                colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[2], colorsT[2], colorsT[2]);
              } else if (array.includes(2) && array.includes(3)) {
                
                colorArray.push(colorsT[1], colorsT[1], colorsT[1], colorsT[2], colorsT[2], colorsT[2]);
              }
            } else if (array.length === 3) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[2], colorsT[2]);
            }
            setPropertiesForAll(count, i, colorArray);

            events[count].addEventListener(hmUI.event.CLICK_UP, function (info) {
              let data = buscarFecha(renderDate);
              renderPageDate(data, renderDate);
            });
          } else if (String(i).length == 2 && dates.includes(renderDate) && String(i) == String(dates[dates.indexOf(renderDate)]).slice(0, 2)) {
            let array = buscarTipoFecha(renderDate);
            array.sort((a, b) => a - b);
            
            const colorMap = {
              1: colorsT[0],
              2: colorsT[1],
              3: colorsT[2],
            };
  
            
            const setPropertiesForAll = (count, i, color) => {
              
              const impts = [impt, impt2, impt3, impt4, impt5, impt6];
              const xrs = [xr, xr2, xr3, xr4, xr5, xr6];
              const yrs = [yr, yr2, yr3, yr4, yr5, yr6];
              const wrs = [wr, wr2, wr3, wr4, wr5, wr6];
              const hrs = [hr, hr2, hr3, hr4, hr5, hr6];
  
              for (let j = 0; j < impts.length; j++) {
                try {
                  impts[j][count].setProperty(hmUI.prop.MORE, {
                    x: xrs[j][count],
                    y: yrs[j][count],
                    w: wrs[j][count],
                    h: hrs[j][count],
                    color: color[j],
                  });
                } catch (e) {
                  
                }
              }
            };
            var colorArray = [];
            if (array.length === 1) {
              colorArray.push(colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]], colorMap[array[0]]);
            } else if (array.length === 2) {
              if (array.includes(1) && array.includes(2)) {
                
                colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[1]);
              } else if (array.includes(1) && array.includes(3)) {
                
                colorArray.push(colorsT[0], colorsT[0], colorsT[0], colorsT[2], colorsT[2], colorsT[2]);
              } else if (array.includes(2) && array.includes(3)) {
                
                colorArray.push(colorsT[1], colorsT[1], colorsT[1], colorsT[2], colorsT[2], colorsT[2]);
              }
            } else if (array.length === 3) {
              
              colorArray.push(colorsT[0], colorsT[0], colorsT[1], colorsT[1], colorsT[2], colorsT[2]);
            }
            setPropertiesForAll(count, i, colorArray);
            events[count].addEventListener(hmUI.event.CLICK_UP, function (info) {
              let data = buscarFecha(renderDate);
              renderPageDate(data, renderDate);
            });
          }
        } else {
          if (add < 1) {
          }
        }
        if (dayOfWeek === 6) {
          str += '\n';
          add++
        }
      }
      calendarEnd.setProperty(hmUI.prop.MORE, {
        text: str
      });
    }
    let calendarGroup = hmUI.createWidget(hmUI.widget.GROUP, {
      x: 0,
      y: 0,
      w: 192,
      h: 450
    });
    function renderPageDate(data, date) {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: 0,
        y: 0,
        h: 1111,
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
        text: `Filtradas: ${date}`,
        text_size: 25,
        color: themeSec
      })
      let refresh = hmUI.createWidget(hmUI.widget.IMG, {
        x: 390 - 98,
        y: 5,
        src: "refresh.png"
      }).addEventListener(hmUI.event.CLICK_DOWN, (info) => {
        hmApp.reloadPage({ url: 'pages/calendar', param: '...' })
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
          y: 125 + 85 * i,
          w: 390 - 20,
          h: 80,
          color: themePrim,
          text: txt,
          text_size: txt.indexOf("Ejercicios") != -1 ? 17 : 18
        })
      }
    }
    let mask = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 450,
      color: themeBG
    });
    let maskweekend = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
      x: 243,
      y: 147,
      w: 80,
      h: 160,
      radius: 12,
      color: themeSlot
    });
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 7; i++) {
        let p = 21
        let lw = 5
        var widget = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr.push(i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40)
        yr.push((184 + p) - 8 + j * 26)
        wr.push(4)
        hr.push(lw)
        impt.push(widget)
        var widget2 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (6 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr2.push(i < 5 ? (6 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40)
        yr2.push((184 + p) - 8 + j * 26)
        wr2.push(4)
        hr2.push(lw)
        impt2.push(widget2)
        var widget3 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (10 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr3.push(i < 5 ? (10 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40)
        yr3.push((184 + p) - 8 + j * 26)
        wr3.push(4)
        hr3.push(lw)
        impt3.push(widget3)
        var widget4 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (14 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr4.push(i < 5 ? (14 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40)
        yr4.push((184 + p) - 8 + j * 26)
        wr4.push(4)
        hr4.push(lw)
        impt4.push(widget4)
        var widget5 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (18 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr5.push(i < 5 ? (18 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40)
        yr5.push((184 + p) - 8 + j * 26)
        wr5.push(4)
        hr5.push(lw)
        impt5.push(widget5)
        var widget6 = hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: i < 5 ? (22 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40,
          y: (184 + p) - 8 + j * 26,
          w: 4,
          h: lw,
          color: i < 5 ? themeBG : j > 4 ? themeBG : themeSlot,
          radius: 0,
        })
        xr6.push(i < 5 ? (22 + 390 / 8) - 1 + i * 40 : (14 + 390 / 8) + i * 40)
        yr6.push((184 + p) - 8 + j * 26)
        wr6.push(4)
        hr6.push(lw)
        impt6.push(widget6)
      }
    }
    let maskMonth = calendarGroup.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 390,
      h: 70,
      color: themeUI
    });
    let dateCover = calendarGroup.createWidget(hmUI.widget.TEXT, {
      x: 50,
      y: 338,
      w: 81,
      h: 21,
    });
    var colorsT = [
      0x0004ff,
      0x09ff01,
      0xff0000
    ]
    let calendarDays = calendarGroup.createWidget(hmUI.widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 390,
      h: 350,
      color: themePrim,
      text: `\n\n\nM        T       W       T        F`,
      text_size: 18,
      text_style: hmUI.text_style.WRAP
    });
    let calendarDaysEnd = calendarGroup.createWidget(hmUI.widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 390,
      h: 350,
      color: themeUI,
      text: `\n\n\n                                                     S       S`,
      text_size: 18,
      text_style: hmUI.text_style.WRAP
    });
    let calendar = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 2 + 390 / 8,
      y: 70,
      w: 200,
      h: 420,
      color: Config.theme.triText,
      text_size: 18,
      text_style: hmUI.text_style.WRAP
    });
    let calendarEnd = hmUI.createWidget(hmUI.widget.TEXT, {
      x: 2 + 250,
      y: 70,
      w: 200,
      h: 350,
      color: 0xf96053,
      text_size: 18,
      text_style: hmUI.text_style.WRAP
    });
    var events = []
    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 7; i++) {
        var widget = hmUI.createWidget(hmUI.widget.IMG, {
          x: i < 5 ? (2 + 390 / 8) - 1 + i * 40 : (2 + 390 / 8) + i * 40,
          y: 184 - 8 + j * 26,
          w: 24,
          h: 24,
          src: ".png"
        })
        events.push(widget)
      }
    }
    let monthShow = calendarGroup.createWidget(hmUI.widget.TEXT, {
      x: 100,
      y: 10,
      w: 192,
      h: 40,
      color: themeSec,
      text_size: 30,
      align_h: hmUI.align.CENTER_H,
    });
    dateCover.addEventListener(hmUI.event.CLICK_UP, function (info) {
      
      let cYear = time.year, cMonth = time.month, cWeek = time.week, cDay = time.day;
      
      if (cYear != year || cMonth != month) {
        year = cYear, month = cMonth;
        week = (cWeek + 35 - (cDay - 1)) % 7;
        renderCalendar(year, month, week)
      }
    });
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
    }
    function buscarTipoFecha(fechaBuscada) {
      
      const data = JSON.parse(decodeJSON);
      let arrrr = [];
      for (let asignatura of data.asignaturas) {
        
        let indexExamenes = 0;
        let indexTareas = 0;
        let indexProyectos = 0;

        
        const actividades = [
          ...asignatura.actividades.examenes,
          ...asignatura.actividades.tareas,
          ...asignatura.actividades.proyectos
        ];

        for (let i = 0; i < actividades.length; i++) {
          let actividad = actividades[i];
           

          
          let tipoActividad = "";
          let indiceActividad = -1;
          if (i < asignatura.actividades.examenes.length) {
            tipoActividad = "examenes";
            indiceActividad = indexExamenes++;
          } else if (i < asignatura.actividades.examenes.length + asignatura.actividades.tareas.length) {
            tipoActividad = "tareas";
            indiceActividad = indexTareas++;
          } else {
            tipoActividad = "proyectos";
            indiceActividad = indexProyectos++;
          }
          var tasksTypes = [
            "examenes",
            "tareas",
            "proyectos"
          ]
          
          const tieneFecha = actividad.indexOf("Fecha: " + fechaBuscada) !== -1;
          const tieneEntrega = actividad.indexOf("Entrega: " + fechaBuscada) !== -1;
          if (tieneEntrega || tieneFecha) {
            arrrr.push(tasksTypes.indexOf(tipoActividad) + 1);
          }
        }
      }
      arrrr = eliminarDuplicados(arrrr)
      
      if (arrrr.length > 0) {
        return arrrr;
      }
      
      return null;
    }
    function eliminarDuplicados(array) {
      return [...new Set(array)];
    }
    
    function preButtonClick(button) {
      if (month == 1) year--, month = 12;
      else month--;
      let day = getDayNum(year, month);
      week = (week + 35 - day) % 7;
      if (week == 0) week = 7;
      renderCalendar(year, month, week)
      renderCalendarEnd(year, month, week);
    }
    let preButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 450 - 80,
      w: 390 / 2,
      h: 80,
      press_color: 0xe9efe8,
      normal_color: 0xd8ded7,
      color: themePrim,
      text_size: 33,
      text: 'Prev.',
      click_func: preButtonClick
    });
    function nextButtonClick(button) {
      let day = getDayNum(year, month);
      if (month == 12) year++, month = 1;
      else month++;
      week = (week + day) % 7;
      if (week == 0) week = 7;
      renderCalendar(year, month, week);
      renderCalendarEnd(year, month, week);
    };
    let nextButton = hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 390 / 2,
      y: 370,
      w: 390 / 2,
      h: 80,
      press_color: 0xe9efe8,
      normal_color: 0xd8ded7,
      color: themePrim,
      text_size: 33,
      text: 'Next.',
      click_func: nextButtonClick
    });
    let day = getDayNum(year, month);

    week = (week + day) % 7;
    if (week == 0) week = 7;
    renderCalendar(year, month, week);
    renderCalendarEnd(year, month, week);
    let s = 2 + 390 / 8
    let y = 340
    let my = 10
    let b = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: s,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[0],
      radius: 3,
    })
    let textb = hmUI.createWidget(hmUI.widget.TEXT, {
      x: s + 24 + 5,
      y: y - my,
      w: 100,
      h: 70,
      color: themePrim,
      text: "Exam"
    })
    let l = 95
    let g = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: s + l,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[1],
      radius: 3,
    })
    let textg = hmUI.createWidget(hmUI.widget.TEXT, {
      x: s + l + 24 + 5,
      y: y - my,
      w: 190,
      h: 70,
      color: themePrim,
      text: "Tasks"
    })
    let r = hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: s + l * 2,
      y: y,
      w: 24,
      h: 7,
      color: colorsT[2],
      radius: 3,
    })
    let textr = hmUI.createWidget(hmUI.widget.TEXT, {
      x: s + l * 2 + 24 + 5,
      y: y - my,
      w: 190,
      h: 70,
      color: themePrim,
      text: "Projects"
    })
  },
  onDestroy() {
    hmApp.unregisterGestureEvent()
    hmFS.close("raw/settings.json");
    hmFS.close("raw/tasks.json");
  },
});