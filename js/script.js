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
         <button class="btn btn-outline btn-primary"
            ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button
          >
        
        `;
    // append div to container
    lessonsContainer.appendChild(lessonBtn);
  }
};

loadLesson();
