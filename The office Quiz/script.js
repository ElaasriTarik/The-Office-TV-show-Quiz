const options = [...document.querySelectorAll('.opt')];
let questionLine = document.querySelector('.questionLine');
let life = document.querySelector('.life');
let score = document.querySelector('.score');
let currentPoints = document.querySelector('.currentPoints');
let yesBtn = document.querySelector('.yesBtn');
let noBtn = document.querySelector('.noBtn');
let dialog = document.querySelector('dialog');
let opts = [];
dialog.style.display = 'none';
life.textContent = 3;
score.textContent = 0;
let sc = 0;
let li = 3;
let info;
async function res(){
  let data = await fetch('questions.json');
  let response = await data.json();
  info = response;
  play()
}
res();
let k = 0;
let q;
function play(e) {
  if (info.length === 0) {
   console.log('end of game');
   return null;
  }
  let randomQ = info[Math.floor(Math.random()*info.length)];
  q = randomQ.answer;
   opts.push(randomQ.answer, randomQ.opt1, randomQ.opt2, randomQ.opt3);
   questionLine.textContent = randomQ.question;
   options.forEach((item) => {
     let scrabbled = opts[Math.floor(Math.random()*opts.length)];
     opts.splice(opts.indexOf(scrabbled), 1);
     item.textContent = scrabbled;
     // reset css styles
     item.style.backgroundColor = '#f2eeee';
   });
   info.splice(info.indexOf(randomQ), 1);

}
options.forEach((item, i) => {
  item.addEventListener('click', (e) => {
    let target = e.target;
    if (target.textContent.toLowerCase() === q.toLowerCase()) {
      setTimeout(() => {
        sc += 10;
        score.textContent = sc;
        play(e.target);
      }, 500)
      target.style.backgroundColor = "lightblue";
    } else {
      target.style.backgroundColor = "#ff8585";
      li -= 1;
      life.textContent = li;
      if (li === 0) {
        currentPoints.textContent = 'current Points: '+sc;
        dialog.style.display = 'block';
      }
    }
  })
});
// Check if we have enough points to exchange.
yesBtn.addEventListener('click', () => {
  if (sc >= 50) {
    sc -= 50;
    li += 1;
    score.textContent = sc;
    life.textContent = li;
    play();
    dialog.style.display = 'none';
  } else {
    let dialogMsg = document.querySelector('.dialogMsg');
    dialogMsg.textContent = "You don't have enough points!";
    noBtn.style.display = 'none';
    yesBtn.textContent = 'try Again';
    yesBtn.addEventListener('click', () => {
    dialog.style.display = 'none';
    play();
    li = 3;
    })
  }
})
// If no is clicked then quit Dialog;
noBtn.addEventListener('click', () => {
  dialog.style.display = 'none';
  score.textContent = 0;
  life.textContent = 3;
  play();
})
