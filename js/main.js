// Поменять местами ключи со значениями в объекте

function valueToKey(obj) {
    obj = Object.entries(obj);
    for (let i = 0; i < obj.length; i++) {
      obj[i].push(obj[i][0]);
      obj[i].shift();
    }
    return Object.fromEntries(obj);
}

// Замена строки

function convertKeyLayout(strInput, latin) {
  const letters = {
  q: "й", w: "ц", e: "у", r: "к", t: "е", y: "н", u: "г", i: "ш", o: "щ", p: "з", "[": "х", "]": "ъ", a: "ф", s: "ы", d: "в", f: "а", g: "п", h: "р", j: "о", k: "л",  l: "д", ";": "ж", "'": "э", z: "я", x: "ч", c: "с", v: "м", b: "и", n: "т", m: "ь", ",": "б", ".": "ю", "{": "Х", "}": "Ъ", ":": "Ж", '"': "Э", ">": "Ю", "<": "Б", "?": ",", "/": ".", "!": "!", "@": "@", "#": "#", "$": "$", "%": "%", "^": "^", "&": "?", "*" : "*", "(": "(", ")": ")", "`": "ё", "~": "Ё", "<": "<", ">": ">", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "_": "_", "-": "-"
}

function isUpperCase(str) {
 return str === str.toUpperCase() ? true : false 
}

const lettersReverse = valueToKey(letters);
const excludedSymbols = /\{|\[|\}|\]|\:|\;|\"|\'|\<|\,|\<|\>|\.|\/|\?|\-|\_|[0-9]/;

strInput = strInput.split(" ");
for (var j = 0; j < strInput.length; j++) {
  strInput[j] = strInput[j].split("");
  for (var i = 0; i < strInput[j].length; i++) {
    if (!isUpperCase(strInput[j][i]) || excludedSymbols.test(strInput[j][i])) {
      if (latin) {
        strInput[j][i] = letters[strInput[j][i]]
      }
      else {
        strInput[j][i] = lettersReverse[strInput[j][i]]
      }
    }
    else {
      if (latin) {
        strInput[j][i] = letters[strInput[j][i].toLowerCase()]
      }
      else {
        strInput[j][i] = lettersReverse[strInput[j][i].toLowerCase()]
      }
      strInput[j][i] = strInput[j][i].toUpperCase()
    }
  }
  strInput[j] = strInput[j].join('')
}
strInput = strInput.join(" ")
return strInput
}

// Проверка раскладки
function isLatin(str) {
  return /\w/g.test(str)
}

// Поиск выделенного текста в DOM

function getSel() {
    var txtarea;
    var nodeName = window.getSelection().baseNode.nodeName;

    if (nodeName !== undefined && nodeName == "#text") {
      var txtareaNode = window.getSelection().anchorNode.parentElement
      var selection = window.getSelection().toString();
      var newText = txtareaNode.innerText.replace(selection, convertKeyLayout(selection, isLatin(selection)));
      txtareaNode.innerText = newText;
    }

    else {
      // элемент в фокусе
      txtarea = document.activeElement

      // индексы начала и конца выделенного текста
      var strStart = txtarea.selectionStart;
      var strEnd = txtarea.selectionEnd;

      if (strStart == undefined || strEnd == undefined) {
        return false
      }
    
      selection = txtarea.value.substring(strStart, strEnd);
      console.log("выделенный текст - " + selection)
      
      
      var newText = convertKeyLayout(selection, isLatin(selection));
      console.log("новый текст - " + newText);   
      return txtarea.value = txtarea.value.substring(0, strStart) + newText + txtarea.value.substring(strEnd, txtarea.value.length)
    }
  }


/********** Обработчики **********/


// CTRL + Q

document.addEventListener("keyup", function() {
    if (event.ctrlKey && event.keyCode === 81) {
        getSel();
    }
})

// По клику на иконку

chrome.runtime.onMessage.addListener(function(request) {
  if (request !== 'Выделенный текст изменен!') {
    var newTextArea = convertKeyLayout(request, isLatin(request));
    chrome.runtime.sendMessage(newTextArea);
  }
  else {
    getSel();
  }
})