/*
- filter records based on name [ array filter ] ✔️
    - show number of records found ✔️
    - 0 records found if none✔️
- display the avg age of the person who are displayed [ array reduce ]✔️
- add a button/radio to filter by male, female✔️
- select dropdown, choose sort [ by age, by name, ] ️️✔
- filter between two dates, with a date picker.🕕
*/

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

let allid = document.querySelector(".all");

// let sortList = document.querySelectorAll(".sortList");
let sortBy = document.querySelector("#sortBy");

// function to sort

sortBy.addEventListener("change", (event) => {
  const listings = event.target.value;
  switch (listings) {
    case "name":
      // clearContent();
      sortbyname();
      break;
    case "age":
      sortbyage();
      break;
    default:
  }
  // do nothing
});

//Function to sortByname

function sortbyname() {
  const namesorting = result.sort(function (a, b) {
    const nameA = a.name.first.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.first.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  clearContent();
  namesorting.map((user) => displayUsers(user));
}

//Function to Sort by age
function sortbyage() {
  const agesorting = result.sort(function (a, b) {
    return a.dob.age - b.dob.age;
  });
  clearContent();
  agesorting.map((user) => displayUsers(user));
}

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
//create element from given tag  --- for 2 a
function createUserElements(element) {
  return document.createElement(element);
}

//append chile to parent element  --- for 2 b
function append(parent, element) {
  return parent.append(element);
}
// gicen a object place appropriate values into it --- 2
function displayUsers(user) {
  let li = createUserElements("li"),
    img = createUserElements("img"),
    p = createUserElements("p"),
    p1 = createUserElements("p"),
    div = createUserElements("div"),
    div2 = createUserElements("p");

  img.src = user.picture.large;
  p.innerHTML = `${user.name.first} ${user.name.last}`;
  p1.innerHTML = `${user.gender}`;
  div.innerHTML = `${user.dob.age}`;
  div2.innerHTML = `${user.dob.date}`;

  append(li, img);
  append(li, p);
  append(li, p1);
  append(li, div);
  append(li, div2);

  append(content, li);
}
//get user data from randomuser api ---- 1
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

//All Filter
function allFiltered() {
  clearContent();
  const allresult = result.map((user) => displayUsers(user));
  console.log(`AWESOME ${allresult}`);
  nRecords(allresult);
  avg_age(result);
}

all.addEventListener("click", allFiltered);

//Male Filter

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

// all.addEventListener("click", allFiltered);

//Female Filter
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
