// 🔊 Sounds
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// 📊 Questions (MIXED)
const questions = {
    easy: [
        { type: "text", q: "Who is CR7?", a: ["Messi","Ronaldo","Neymar","Salah"], c: 1 },
        { type: "text", q: "Messi country?", a: ["Brazil","Argentina","Spain","Italy"], c: 1 },
        { type: "image", img: "images/messi.jpg", q: "Who is this player?", a: ["Messi","Ronaldo","Mbappe","Neymar"], c: 0 },
        { type: "text", q: "World Cup 2022 winner?", a: ["France","Brazil","Argentina","Spain"], c: 2 },
        { type: "image", img: "images/ronaldo.jpg", q: "Who is this player?", a: ["Messi","Ronaldo","Salah","Kane"], c: 1 },
        { type: "text", q: "Which team is red?", a: ["Chelsea","Liverpool","Manchester United","Napoli"], c: 1 },
        { type: "image", img: "images/mbappe.jpg", q: "Who is this player?", a: ["Mbappe","Haaland","Messi","Benzema"], c: 0 },
        { type: "text", q: "Ronaldo nationality?", a: ["France","Portugal","Spain","Germany"], c: 1 },
        { type: "image", img: "images/haaland.jpg", q: "Who is this player?", a: ["Haaland","Kane","Lewandowski","Modric"], c: 0 },
        { type: "text", q: "PSG player?", a: ["Mbappe","Kane","Modric","Pedri"], c: 0 }
    ],

    medium: [
        { type: "text", q: "Haaland plays for?", a: ["Bayern","Man City","PSG","Barca"], c: 1 },
        { type: "image", img: "images/salah.jpg", q: "Who is this player?", a: ["Salah","Ronaldo","Mbappe","Neymar"], c: 0 },
        { type: "text", q: "Atletico Madrid striker?", a: ["Alvarez","Cavani","Ibrahimovic","Suarez"], c: 0 },
        { type: "text", q: "Chelsea nickname?", a: ["Reds","Blues","Whites","Eagles"], c: 1 },
        { type: "image", img: "images/bellingham.jpg", q: "Who is this player?", a: ["Bellingham","Pedri","Gavi","Kroos"], c: 0 },
        { type: "text", q: "haaland nationality?", a: ["Italy","norway","Sweden","Germany"], c: 1 },
        { type: "image", img: "images/lewandowski.jpg", q: "Who is this player?", a: ["Lewandowski","Benzema","Haaland","Suarez"], c: 0 },
        { type: "text", q: "lazio country?", a: ["Spain","Italy","France","England"], c: 1 },
        { type: "text", q: "palmer club?", a: ["Real Madrid","chealsea","PSG","manchester united"], c: 1 },
        { type: "text", q: "bayern striker?", a: ["Kane","Messi","Mbappe","Ronaldo"], c: 0 }
    ],

    hard: [
        { type: "text", q: "UCL 1999 winner?", a: ["Real Madrid","Manchester United","Liverpool","Chelsea"], c: 1 },
        { type: "image", img: "images/modric.jpg", q: "Who is this player?", a: ["Modric","Kroos","Iniesta","Xavi"], c: 0 },
        { type: "text", q: "Barca coach 2011?", a: ["Guardiola","Mourinho","Enrique","Perez"], c: 0 },
        { type: "text", q: "Third Most Ballon d'Or?", a: ["Weah","Figo","Platini","Maradona"], c: 2 },
        { type: "image", img: "images/debruyne.jpg", q: "Who is this player?", a: ["De Bruyne","Odegard","Xavi","Bernardo"], c: 0 },
        { type: "text", q: "Hellas Virona Country?", a: ["Spain","Italy","France","Germany"], c: 1 },
        { type: "text", q: "Dortumund Stadium?", a: ["Prezero arena","Signal iduna park","bayer arrena","allianz arena"], c: 1 },
        { type: "text", q: "George Weah nationality?", a: ["Nigiria","Libiria","Ghana","Senegal"], c: 1 },
        { type: "text", q: "World Cup 1958 winner?", a: ["Italy","Brazil","Germany","England"], c: 1 },
        { type: "text", q: "Valencia Stadium?", a: ["Mistaya","San Memas","Ciudad De Valencia","Alfonso Perez"], c: 0 }
    ]
};

// 🎮 Variables
let currentQuiz = [];
let index = 0;
let score = 0;

// 📌 Elements
const imgEl = document.getElementById("playerImg");
const qEl = document.getElementById("question");
const buttons = document.querySelectorAll(".answer");

// 🚀 Start
function startQuiz(level) {
    currentQuiz = questions[level];
    index = 0;
    score = 0;

    document.getElementById("start").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    load();
}

// 📥 Load question
function load() {
    let q = currentQuiz[index];

    // Reset
    imgEl.classList.add("hidden");

    if (q.type === "image") {
        imgEl.src = q.img;
        imgEl.classList.remove("hidden");
    }

    qEl.innerText = q.q;

    buttons.forEach((btn, i) => {
        btn.innerText = q.a[i];
        btn.disabled = false;
        btn.classList.remove("correct","wrong");
    });
}

// ✅ Answer
function answer(i) {
    let correct = currentQuiz[index].c;

    buttons.forEach((btn, idx) => {
        btn.disabled = true;

        if (idx === correct) btn.classList.add("correct");
        if (idx === i && i !== correct) btn.classList.add("wrong");
    });

    if (i === correct) {
        score++;
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        wrongSound.currentTime = 0;
        wrongSound.play();
    }
}

// ➡️ Next
function next() {
    index++;

    if (index < currentQuiz.length) {
        load();
    } else {
        imgEl.style.display = "none";
        qEl.innerText = "Quiz Finished!";
        document.getElementById("score").innerText =
            "Score: " + score + "/" + currentQuiz.length;

        document.getElementById("nextBtn").style.display = "none";
    }
}
function goToMenu() {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("start").classList.remove("hidden");
}
function goHome() {
    // reset UI
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("start").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");

    // reset elements
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("homeBtn").classList.add("hidden");
    document.getElementById("score").innerText = "";

    imgEl.style.display = "block";
}