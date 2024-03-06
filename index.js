let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let searchInput = document.getElementById("searchInput");
let allDish = document.querySelectorAll(".dishes");
let searchBtn = document.getElementById("searchBtn");
let dishVal = document.querySelectorAll(".dish");
let count = 0;

const getData = async (value) => {
    try {
      let datas = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
      );
      let jsonDatas = await datas.json();
      console.log(jsonDatas);
      document.querySelector(".showReci").innerHTML = "";
      jsonDatas.meals.forEach(function (data) {
        console.log(data);
        let div = document.createElement("div");
        div.classList.add("card");
        const instructionsArray = data.strInstructions.split('\n');
        
        // Display the first three lines initially
        const shortInstructions = instructionsArray.slice(0, 1).join('\n');
        const fullInstructions = data.strInstructions;
        div.innerHTML = `<img src=${data.strMealThumb} alt="">
                <h2>${data.strMeal}</h2>
                <p class="instructions">${shortInstructions}</p>
                <button class="view-more" data-full-instructions="${fullInstructions}">View More...</button>`;
        document.querySelector(".showReci").appendChild(div);
  
        // Adding click event listener to the "View More" button
        const viewMoreBtn = div.querySelector(".view-more");
        viewMoreBtn.addEventListener("click", function () {
          // Display the full instructions when the button is clicked
          const instructionsParagraph = this.previousElementSibling;
          instructionsParagraph.textContent = fullInstructions;
          this.style.display = "none"; // Hide the "View More" button after displaying the full content
        });
      });
    } catch (error) {
      document.querySelector(".showReci").innerHTML = "<h1>Meal not found</h1>";
    }
  };
  

allDish.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

function myFunc() {
  allDish.forEach(function (curVal) {
    curVal.style.transform = `translateX(-${count * 100}%)`;
  });
}

nextBtn.addEventListener("click", function () {
  console.log(0);
  count++;
  if (count == allDish.length) {
    count = 0;
  }
  myFunc();
});

prevBtn.addEventListener("click", function () {
  console.log(0);
  count--;
  if (count == -1) {
    count = allDish.length - 1;
  }
  myFunc();
});

searchBtn.addEventListener("click", function () {
  let searchValue = searchInput.value;
  if (searchValue == "") {
    alert("Enter the value");
  } else {
    getData(searchValue);
  }
});

dishVal.forEach(function (dishData) {
  dishData.addEventListener("click", function () {
    console.log("object");
    getData(dishData.value);
  });
});
