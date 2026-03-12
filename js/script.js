// load lesson using fetch
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //fetch return promise
    .then((res) => res.json()) //promise of json data
    .then((lesson) => {
      displayLesson(lesson.data);
    }); //show data on another func
};

// display all lessons
const displayLesson = (lessons) => {
  // get container id
  const lessonsContainer = document.getElementById("lessons-container");
  // empty the container
  lessonsContainer.innerText = "";

  // loop to get every lesson
  for (const lesson of lessons) {
    // create div to show every lesson
    const lessonBtn = document.createElement("div");
    // add dynamic button for every lesson
    lessonBtn.innerHTML = `
         <button id='lesson-btn-${lesson.level_no}' onClick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
            ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button
          >
        
        `;
    // append div to container
    lessonsContainer.appendChild(lessonBtn);
  }
};
// load lesson on open the site
loadLesson();

const loadLessonWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())

    .then((levelWord) => {
      removeActiveBtn();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);

      clickedBtn.classList.add("active");
      displayWord(levelWord.data);
    });
};

const removeActiveBtn = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("wordsContainer").classList.add("hidden");
  } else {
    document.getElementById("wordsContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

// word object schema
// {
//   "id": 4,
//   "level": 5,
//   "word": "Diligent",
//   "meaning": "পরিশ্রমী",
//   "pronunciation": "ডিলিজেন্ট"
// }

const displayWord = (words) => {
  const wordsContainer = document.getElementById("wordsContainer");
  wordsContainer.innerText = "";

  if (words.length == 0) {
    wordsContainer.innerHTML = `
       <div class="hind-siliguri-regular text-center col-span-full space-y-3">
       <img class='mx-auto' src="./assets/alert-error.png" alt="">
            <p class="text-sm text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-3xl font-bold ">নেক্সট Lesson এ যান</h2>
        </div>
  `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
                <div class=" py-10 px-5 bg-gray-50 space-y-3 m-3 shadow-sm rounded-lg">
            <h2 class="text-3xl font-bold">${word.word ? word.word : "word no found"}</h2>
           <div>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <p class="font-semibold">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation not found"}"</p>
           </div>
            <div class="flex justify-between mt-3">
                <button onClick='loadWordDetail(${word.id})' class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `;
    wordsContainer.append(wordDiv);
    manageSpinner(false);
  });
};

// word details object schema
// {
//   "status": true,
//   "message": "successfully fetched a word details",
//   "data": {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//       "enthusiastic",
//       "excited",
//       "keen"
//     ],
//     "id": 5
//   }
// }

const loadWordDetail = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (details) => {
  const modalBoxContainer = document.getElementById("modalBox");
  modalBoxContainer.innerHTML = `<div>
            <h2 class='text-xl font-bold poppins-regular '>${details.word} ( <i class="fa-solid fa-microphone-lines"></i> :${details.pronunciation})</h2>
           </div>
           <div>
            <p class='font-semibold poppins-regular '>Meaning</p>
            <p class='font-semibold hind-siliguri-regular'>${details.meaning}</p>
           </div>
           <div>
            <p class='font-semibold poppins-regular '>Example</p>
            <p class='poppins-regular '>${details.sentence}</p>
           </div>
           <div>
            <p class='font-semibold hind-siliguri-regular'>সমার্থক শব্দ গুলো</p>
            <div>${createArrayOffSym(details.synonyms)}</div>
           </div>
           <button class='btn btn-primary mt-5'>Complete Learning</button>
           `;
  document.getElementById("my_modal_5").showModal();
};

const createArrayOffSym = (arr) => {
  const htmlEl = arr.map((el) => `<span class="btn bg-[#EDF7FF]">${el}</span>`);
  return htmlEl.join(" ");
};
