const searchInput = document.querySelector("#search");
const maleButton = document.querySelector("#male");
const femaleButton = document.querySelector("#female");
const showMore = document.querySelector("#show_more");

const loader = document.querySelector("#loader");
const content = document.querySelector("#content");

let displayedUsers = 20;
let users = [];

async function fetchUsers(url) {
  try {
    loader.style.display = "block";
    const res = await fetch(url);
    const { results } = await res.json();

    users = users.concat(results);

    showUsers(users.slice(0, displayedUsers), content);
    loader.style.display = "none";

    if (displayedUsers < users.length) {
      showMore.style.display = "block";
    }
  } catch (err) {
    console.log(err);
  }
}

fetchUsers("https://randomuser.me/api/?results=200");

showMore.onclick = () => {
  showUsers(users.slice(0, (displayedUsers += 10)), content);
  if (displayedUsers >= users.length) {
    showMore.style.display = "none";
  }
};

maleButton.onclick = () => {
  content.innerHTML = "";
  users = [];
  fetchUsers("https://randomuser.me/api/?results=200&gender=male", content);
};
femaleButton.onclick = () => {
  content.innerHTML = "";
  users = [];
  fetchUsers("https://randomuser.me/api/?results=200&gender=female", content);
};

searchInput.onkeyup = () => {
  filterUsers(searchInput.value);
};

function showUsers(arr, place) {
  place.innerHTML = arr
    .map(
      (user) =>
        `
        <a id="user" href="../../user.html">
            <div class="random__users-card">
                <div class="random__users-card__img">
                    <img src="${user.picture.large}" alt="${user.name.first}">
                </div>
                <div class="random__users-card__details">
                    <h4>${user.name.title}.${user.name.first} ${user.name.last}</h4>
                    <p>${user.email}</p>
                </div>
            </div>
        </a>
    `
    )
    .join("");

  const allUsers = document.querySelectorAll("#user");

  allUsers.forEach((user,i) => {
    user.onclick = () => {
      const singleUser = users[i];
      localStorage.setItem("user", JSON.stringify(singleUser));
    };
  });
}

function filterUsers(searchTerm) {
  const findedUsers = users.filter((user) => {
    const fullName = `${user.name.first} ${user.name.last}`;
    return fullName
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());
  });

  showUsers(findedUsers.slice(0, displayedUsers), content);
}
