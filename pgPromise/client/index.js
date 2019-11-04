document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    loadPosts();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);

    const form2 = document.querySelector("#postsForm");
    form2.addEventListener("submit", addPostsFormSubmitted);

    const form3 = document.querySelector("#usersForm");
    form3.addEventListener("submit", postsFromUser);

    const form4 = document.querySelector("#likerForm");
    form4.addEventListener("submit", likesPerPost);

    const form5 = document.querySelector("#filterLikes");
    form5.addEventListener("submit", filteredLikes);
});

async function loadUsers() {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/users/all`);
    // console.log(response.data)
    response.data.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.id} ${user.firstname} ${user.lastname}, age ${user.age}`;
        usersList.appendChild(listItem);
    });
}

async function addUserFormSubmitted(event) {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3000/users/register`, { firstname, lastname, age });
    loadUsers();
}



async function addPostsFormSubmitted(event) {
    event.preventDefault();
    console.log("hi Peter")
    const body = document.getElementById("postText").value;
    const poster_id = document.getElementById("userID").value;
    console.log(body, poster_id, "hi");
    let response = await axios.post("http://localhost:3000/posts/register", {poster_id, body});
    loadPosts();
}

async function loadPosts() {
    const postsList = document.getElementById("postsList");
    postsList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts/all`);
    // console.log(response.data);
    response.data.forEach((post) => {
        // console.log(post.body);
        let listItem = document.createElement("li");
        listItem.innerText = `${post.body}`;
        postsList.appendChild(listItem);
    })
}

async function postsFromUser(event) {
    event.preventDefault();
    const fromUserList = document.getElementById("postsFromUser");
    const userID = document.getElementById("userID2").value;
    fromUserList.innerHTML = "";
    const response = await axios.get(`http://localhost:3000/posts/${userID}`);
    response.data.forEach((post) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${post.body}`;
        fromUserList.appendChild(listItem);
    })
}


async function likesPerPost(event) {
    event.preventDefault();
    let postNumber = document.getElementById("postNumber").value;
    const likeList = document.getElementById("likesList");
    let counter = 0;
    let emptyArr = [];
    const response = await axios.get(`http://localhost:3000/posts/likes`)
    for (let i of response.data) {
        console.log("hi", i.post_id, postNumber);
        if (i.post_id === Number(postNumber)) {
            counter ++;
            emptyArr.push(i.liker_id);
        }
    }
    let listItem = document.createElement("li");
        listItem.innerText = `Post ${postNumber} has ${counter} likes.`;
        if (counter > 0) {
            listItem.innerText += " It was liked by users "
            for (let i of emptyArr) {
                listItem.innerText += `${i},`;
            }
        }
        likeList.appendChild(listItem);
}


async function filteredLikes (event) {
    event.preventDefault();
    const filteredList = document.getElementById("filteredPostsList");
    const amountOfLikes = document.getElementById("amountOfLikes").value;
    let obj = {};
    let counter = 0;
    const response = await axios.get(`http://localhost:3000/posts/likes`)
    for (let i of response.data) {
        if (!obj[i.post_id]) {
            obj[i.post_id] = 1;
        } else {
            obj[i.post_id] += 1;
        }
    }

    let listItem = document.createElement("li");
    listItem.innerText = `The posts with ${amountOfLikes} or more are posts `;

    for (i in obj) {
        if(obj[i] >= amountOfLikes) {
            listItem.innerText += `${i},`
        }
    }

    filteredList.appendChild(listItem);
}
