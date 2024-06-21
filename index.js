// =================== Select ================= 

const select = document.querySelectorAll("select")

select.forEach((ele , id) => {
    for (const country in countries) {
        let selected;
        if (id == 0 && country == "en-US") {
            selected = "selected"
        }
        else if (id== 1 && country == "ar-SA") {
            selected = "selected"
        }
        let option = `<option value="${country}" ${selected}>${countries[country]}</option>"`
        ele.innerHTML += option
    }
})

// ======================== Translate Program ===================

let translateBtn = document.getElementById("translateBtn")
let from = document.getElementById("from")
let to = document.getElementById("to")
translateBtn.addEventListener("click", () => {
    let text = from.value;
    let translatetextLang = select[0].value
    let translatedTextLang = select[1].value
    // console.log(text, translatedTextLang, translatetextLang)
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatetextLang}|${translatedTextLang}`
    fetch(api)
    .then(res => res.json())
    .then(data => {
        to.value = data.responseData.translatedText
        // console.log(data)
    })
})

// ================= change side ====================
let exchange = document.querySelector(".exchange")

exchange.addEventListener("click", () => {
    let tempText = from.value
    from.value = to.value
    to.value = tempText

    let tempLang = select[0].value
    select[0].value = select[1].value
    select[1].value = tempLang
})

// ================== Copy Text ====================

let copy = document.querySelectorAll(".fa-copy")
let icons = document.querySelectorAll(".row i")

copy.forEach((ele, id) => {
    ele.addEventListener("click", (e) => {
        if (id == 0) {
            navigator.clipboard.writeText(from.value)
        }
        else {
            navigator.clipboard.writeText(to.value)
        }
    })
})


// =============== Voice Speek ===================== 

let Voice = document.querySelectorAll(".fa-volume-high")

Voice.forEach((ele, id) => {
    ele.addEventListener("click", () => {
        let utterance
        if (id == 0) {
            utterance = new SpeechSynthesisUtterance(from.value)
            utterance.lang = select[0].value
        }
        else {
            utterance = new SpeechSynthesisUtterance(to.value)
            utterance.lang = select[1].value
        }
        speechSynthesis.speak(utterance)
    })
})