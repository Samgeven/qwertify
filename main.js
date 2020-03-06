function valueToKey(obj) {
    obj = Object.entries(obj);
    for (let i = 0; i < obj.length; i++) {
      obj[i].push(obj[i][0]);
      obj[i].shift();
    }
    return Object.fromEntries(obj);
}

function convertKeyLayout(strInput, latin) {
  const letters = {
  q: "й",
  w: "ц",
  e: "у",
  r: "к",
  t: "е",
  y: "н",
  u: "г",
  i: "ш",
  o: "щ",
  p: "з",
  "[": "х",
  "]": "ъ",
  a: "ф",
  s: "ы",
  d: "в",
  f: "а",
  g: "п",
  h: "р",
  j: "о",
  k: "л",
  l: "д",
  ";": "ж",
  "'": "э",
  z: "я",
  x: "ч",
  c: "с",
  v: "м",
  b: "и",
  n: "т",
  m: "ь",
  ",": "б",
  ".": "ю",
  "{": "Х",
  "}": "Ъ",
  ":": "Ж",
  '"': "Э",
  ">": "Ю",
  "<": "Б",
  "?": ",",
  "/": "."
}

function isUpperCase(str) {
 return str === str.toUpperCase() ? true : false 
}

const lettersReverse = valueToKey(letters);

strInput = strInput.split(" ");
for (var j = 0; j < strInput.length; j++) {
  strInput[j] = strInput[j].split("");
  for (var i = 0; i < strInput[j].length; i++) {
    if (!isUpperCase(strInput[j][i]) || /\{|\[|\}|\]|\:|\;|\"|\'|\<|\,|\<|\>|\.|\/|\?/.test(strInput[j][i])) {
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


function getSel() {
    // элемент в фокусе
    
    var txtarea = document.activeElement
    // индексы начала и конца выделенного текста
    var strStart = txtarea.selectionStart;
    var strEnd = txtarea.selectionEnd;
    
    var selection = txtarea.value.substring(strStart, strEnd);
    console.log("выделенный текст - " + selection)
    
    function isLatin(str) {
      return /\w/g.test(str)
    }
    
    var newText = convertKeyLayout(selection, isLatin(selection));
    console.log("новый текст - " + newText);   
    return txtarea.value = txtarea.value.substring(0, strStart) + newText + txtarea.value.substring(strEnd, txtarea.value.length)
  }

document.addEventListener("keyup", function() {
    if (event.ctrlKey && event.keyCode === 81) {
        getSel()
    }
})