var text = document.getElementById("splitText");

var tl = new TimelineMax({repeat:-1, yoyo:false, repeatDelay:5,})

tl.to(text, 2, {
  text: {
    value: "Руддщ Цщкдв", 
  },
  delay: 2
});

tl.to(text, 0.5, {
  text: {
    value: "Hello World", 
  },
  delay: 0
});