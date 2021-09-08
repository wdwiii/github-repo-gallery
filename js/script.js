'use strict';
//Div where profile information will appear
const overview = document.querySelector('.overview');

const username = 'wdwiii';

//Fetch API Data
const getData = async () => {
  const fetchUser = await fetch(`https://api.github.com/users/${username}`);
  const userData = await fetchUser.json();
  //console.log(userData);

  //Function Notes
  //1. Declare variable that will create a div element
  //2. Add .user-info class to div
  //3. Set innerHTML using values from userData to populate fields
  //4. Append the the div to the overview element
  const displayUser = userData => {
    const userInfoDiv = document.createElement('div');
    userInfoDiv.classList.add('user-info');
    userInfoDiv.innerHTML = `<figure>
          <img alt="user avatar" src=${userData.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${userData.name}</p>
          <p><strong>Bio:</strong> ${userData.bio}</p>
          <p><strong>Location:</strong> ${userData.location}</p>
          <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
        </div> `;
    overview.append(userInfoDiv);
  };
  displayUser(userData);
};

getData();
