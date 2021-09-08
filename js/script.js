'use strict';
//Div where profile information will appear
const overview = document.querySelector('.overview');

//Unordered list where repos will be displayed
const repoList = document.querySelector('.repo-list');

const username = 'wdwiii';

//Fetch API User Data
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

//Fetch API Repo Data
const getRepos = async () => {
  const fetchRepos = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await fetchRepos.json();
  console.log(repoData);

  //Function Notes
  //1. Create function to display repo names
  //2. Loop through each object in the repoData array
  //3. For each object:
  //3a. Create h3 element
  //3b. Assign the repo text content as the objects 'name' value
  //3c. Append the h3 element to the repoList
  //4. Call function with repoData as a parameter
  const displayRepoInfo = repoData => {
    repoData.forEach(repo => {
      const repoName = document.createElement('h3');
      repoName.textContent = repo.name;
      repoList.append(repoName);
      console.log(repoName);
    });
  };
  displayRepoInfo(repoData);
};
getRepos();
getData();
