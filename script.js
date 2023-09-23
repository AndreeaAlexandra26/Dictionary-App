// Definirea URL-ului API-ului pentru dicționar.
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Obținerea elementelor HTML relevante pe care le vom manipula.
const result = document.getElementById("result"); // Elementul în care vor fi afișate rezultatele.
const sound = document.getElementById("sound"); // Element pentru sunetul cu pronunția.
const btn = document.getElementById("search-btn"); // Butonul pentru căutarea cuvântului.

// Adăugarea unui ascultător de eveniment (click) pentru butonul de căutare.
btn.addEventListener("click", () => {
    // Obținerea cuvântului introdus de utilizator din input.
    let inpWord = document.getElementById("inp-word").value;

    // Efectuarea unei cereri la API-ul dicționarului pentru cuvântul introdus.
    fetch(`${url}${inpWord}`)
        .then((response) => response.json()) // Parsarea răspunsului JSON.
        .then((data) => {
            console.log(data);

            // Generarea și afișarea informațiilor despre cuvântul căutat.
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            // Setarea sursei audio pentru sunetul pronunției cuvântului.
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            // Afișarea unei mesaje de eroare în cazul în care cuvântul nu a fost găsit.
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// Funcția pentru redarea sunetului cu pronunția cuvântului.
function playSound() {
    sound.play();
}
