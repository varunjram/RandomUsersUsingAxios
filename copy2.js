import "./styles.css";

import axios from "axios";

let loadMoreButton = document.querySelector("#loadMore-btn");
let searchBar = document.querySelector("#searchBar");
let result = [];
let content = document.querySelector(".cardContainer");
let all = document.querySelector("#all");
let male = document.querySelector("#male");
let female = document.querySelector("#female");
let records = document.querySelector(".noOfRecords");
let avgage = document.querySelector(".avgage");

//Function to display average age

function avg_age(array) {
  const agearray = array.map((index) => index.dob.age);

  const arraylength = agearray.length;
  const initialValue = 0;
  const sumOfAge = agearray.reduce((pv, cv) => pv + cv, initialValue);

  const realavgage = Math.floor(sumOfAge / arraylength);

  showage(realavgage);

  console.log(realavgage);
}

//Function to show no of Records
function showage(age) {
  avgage.innerText = "xyz";
  avgage.innerText = `Average age = ${age}`;
}

//Function to show no of Records
function nRecords(array) {
  records.innerText = "";
  records.innerText = `${array.length} Records found`;
}

//SearchBar
searchBar.addEventListener("keyup", filteredContent);

//Function to clear content
function clearContent() {
  content.innerHTML = "";
}

//Function to run when searched
function filteredContent(ke) {
  const searchString = ke.target.value.toLowerCase();

  const filteredUsers = result.filter((user) => {
    return (
      user.gender.toLowerCase().includes(searchString) ||
      user.name.first.toLowerCase().includes(searchString) ||
      user.name.last.toLowerCase().includes(searchString)
    );
  });

  // content.innerHTML = "";
  clearContent();
  filteredUsers.map((ele) => displayUsers(ele));

  nRecords(filteredUsers);
  avg_age(filteredUsers);

  // console.log(`this is ${filteredUsers.length}`);
}
//create element from given tag
function createUserElements(element) {
  return document.createElement(element);
}

//append chile to parent element
function append(parent, element) {
  return parent.append(element);
}
// gicen a object place appropriate values into it
function displayUsers(user) {
  let li = createUserElements("li"),
    img = createUserElements("img"),
    p = createUserElements("p"),
    p1 = createUserElements("p"),
    div = createUserElements("div");

  img.src = user.picture.large;
  p.innerHTML = `${user.name.first} ${user.name.last}`;
  p1.innerHTML = `${user.gender}`;
  div.innerHTML = `${user.dob.age}`;

  append(li, img);
  append(li, p);
  append(li, p1);
  append(li, div);
  append(content, li);
}
//get user data from randomuser api
let CreatUsers = function (path) {
  axios
    .get(path)
    .then(function (response) {
      // handle success
      console.log(response);
      result = response.data.results;
      console.log(result);
      const fetchedusers = result.map((user) => displayUsers(user));
      console.log(fetchedusers);
      nRecords(fetchedusers);
      avg_age(result);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then();
};

CreatUsers("https://randomuser.me/api/?results=25");

function more() {
  CreatUsers("https://randomuser.me/api/?results=10");
}

loadMoreButton.addEventListener("click", more);

function allFiltered() {
  clearContent();
  const allresult = result.map((user) => displayUsers(user));
  console.log(`AWESOME ${allresult}`);
  nRecords(allresult);
  avg_age(result);
}

all.addEventListener("click", allFiltered);

function maleFiltered() {
  clearContent();
  const maleresult = result.filter(
    (user) => user.gender.toLowerCase() === "male"
  );
  console.log(maleresult);
  maleresult.map((user) => displayUsers(user));

  nRecords(maleresult);
  avg_age(maleresult);
}

male.addEventListener("click", maleFiltered);

all.addEventListener("click", allFiltered);

function femaleFiltered() {
  clearContent();
  const femaleresult = result.filter(
    (user) => user.gender.toLowerCase() === "female"
  );
  console.log(femaleresult);
  femaleresult.map((user) => displayUsers(user));
  nRecords(femaleresult);
  avg_age(femaleresult);
}

female.addEventListener("click", femaleFiltered);

/* radio button trail

const radios = document.querySelectorAll('input[type=radio][name="gender"]');

for (const radio of radios) {
  radio.onclick = (key) => {
    // console.log(key.target.value);
    //   return
    //   if (key.target.value === "All") {
    //     console.log("all");
    //   } else if (key.target.value === "Male") {
    //     console.log("male");
    //   } else {
    //     console.log("female");
    //   }

    let target = key.target;
    // let message;
    switch (target.id) {
      case "all":
        // message = 'The Pending radio button changed';
        console.log("all");
        clearContent();
        filteredUsers.map((ele) => displayUsers(ele));

        break;
      case "male":
        // message = 'The Resolved radio button changed';
        console.log("male");
        break;
      case "female":
        // message = 'The Rejected radio button changed';
        console.log("female");
        break;
    }
    // result.textContent = message;
  };
}
*/
