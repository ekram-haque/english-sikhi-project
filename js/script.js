// load lesson using fetch
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //fetch return promise
    .then((res) => res.json()) //promise of json data
    .then((lesson) => displayLesson(lesson.data)); //show data on another func
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
         <button onClick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary"
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
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((levelWord) => displayWord(levelWord.data));
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

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
                <div class=" py-10 px-5 bg-gray-50 space-y-3 m-3 shadow-sm rounded-lg">
            <h2 class="text-3xl font-bold">${word.word}</h2>
           <div>
            <p class="font-semibold">Meaning / Pronounciation</p>
            <p class="font-semibold">"${word.meaning} / ${word.pronunciation}"</p>
           </div>
            <div class="flex justify-between mt-3">
                <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        
        `;
    wordsContainer.append(wordDiv);
  });
};
