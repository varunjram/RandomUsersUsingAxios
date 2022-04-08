import "./styles.css";

import axios from "axios";

let loadMoreButton = document.querySelector("#loadMore-btn");
let searchBar = document.querySelector("#searchBar");
let result = [];
let content = document.querySelector(".cardContainer");

// document.querySelector(".cardstyle")

// console.log(searchBar);
// function hideContent() {
//   content.style.display = "none";
// }

// function showContent() {
//   content.style.display = "block";

//   // filteredUsers.map((user) => displayUsers(user));
// }

searchBar.addEventListener("keyup", filteredContent);

function filteredContent(ke) {
  const searchString = ke.target.value.toLowerCase();

  const filteredUsers = result.filter((user) => {
    return (
      user.gender.toLowerCase().includes(searchString) ||
      user.name.first.toLowerCase().includes(searchString) ||
      user.name.last.toLowerCase().includes(searchString)
    );
  });

  content.innerHTML = "";
  filteredUsers.map((ele) => displayUsers(ele));

  console.log(filteredUsers);
}

function createUserElements(element) {
  return document.createElement(element);
}

function append(parent, element) {
  return parent.append(element);
}

function displayUsers(user) {
  let li = createUserElements("li"),
    img = createUserElements("img"),
    p = createUserElements("p"),
    p1 = createUserElements("p"),
    div = createUserElements("div");

  // console.log("VJ");

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

let CreatUsers = function (path) {
  axios
    .get(path)
    .then(function (response) {
      // handle success
      console.log(response);
      // let vj = Object.values(response.data.results[0]);
      result = response.data.results;
      console.log(result);
      return result.map((user) => displayUsers(user));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then();
};

CreatUsers("https://randomuser.me/api/?results=100");

// function more() {
//   let CreatUsers = function (path) {
//     axios
//       .get(path)
//       .then(function (response) {
//         // handle success
//         console.log(response);
//         // let vj = Object.values(response.data.results[0]);
//         let result = response.data.results;
//         console.log(result);

//         // console.log(result[0]);

//         // console.log(result[0].gender);

//         // let lj = result.filter((sam) => sam.gender === "male");

//         // console.log(lj);

//         // console.log(lj);

//         // let result = response.data.results;
//         // console.log(result.filter((objects) => objects.gender.value > 5);
//         return result.map(function (users) {
//           let li = createUserElements("li"),
//             img = createUserElements("img"),
//             p = createUserElements("p"),
//             p1 = createUserElements("p"),
//             div = createUserElements("div");

//           console.log("VJ");

//           img.src = users.picture.large;
//           p.innerHTML = `${users.name.first} ${users.name.last}`;
//           p1.innerHTML = `${users.email}`;
//           div.innerHTML = `${users.dob.age}`;

//           append(li, img);
//           append(li, p);
//           append(li, p1);
//           append(li, div);
//           append(document.querySelector(".cardstyle"), li);
//         });
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .then();
//   };

//   CreatUsers("https://randomuser.me/api/?results=10");
// }

// loadMoreButton.addEventListener("click", more);
