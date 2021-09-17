'use strict';
//Div where profile information will appear
const overview = document.querySelector('.overview');

//Unordered list where repos will be displayed
const repoList = document.querySelector('.repo-list');

const repoSection = document.querySelector('.repos');

const repoData = document.querySelector('.repo-data');

const username = 'wdwiii';

const btnBackToRepo = document.querySelector('.view-repos');

const filterInput = document.querySelector('.filter-repos');

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
  const reposArray = await fetchRepos.json();
  console.log(reposArray);

  //Function Notes
  //1. Create function to display repo names
  //2. Loop through each object in the reposArray array
  //3. For each object:
  //3a. Create li element
  //3b. Assign the innerHTML of the li to be an h3 element w/ repo name as text content
  //3c. Append the li element to the repoList
  //4. Call function with reposArray as a parameter
  const displayRepoName = reposArray => {
    filterInput.addEventListener('input', function (e) {
      const searchbarValue = e.target.value;
      const repos = document.querySelectorAll('.repo');

      for (let repo of repos) {
        let searchResult = searchbarValue.toLowerCase();
        let repoTitle = repo.textContent.toLowerCase();

        if (repoTitle.includes(searchResult)) {
          repo.classList.remove('hide');
        } else {
          repo.classList.add('hide');
        }
      }
      console.log(searchbarValue);
    });

    //Function Notes
    //1. Loop through the repos in the reposArray
    //2. For each:
    //- Create a list item
    //- Set the innerHTML as a h3 that displays the repo name
    //- Add the class 'repo' to the list item
    //- Append the list item to the list with a class of repo-list
    reposArray.forEach(repo => {
      const repoListItem = document.createElement('li');
      repoListItem.innerHTML = `<h3>${repo.name}</h3>`;
      repoListItem.classList.add('repo');
      repoList.append(repoListItem);
      console.log(repoListItem);
    });
  };
  displayRepoName(reposArray);
};

//When the user clicks on the h3 element, the event handler will grab the element’s text and then pull the corresponding data for the repo with the same name.
repoList.addEventListener('click', function (e) {
  if (e.target.matches('h3')) {
    const repoName = e.target.textContent;
    console.log(repoName);
    getRepoInfo(repoName);
  }
});

//Fetch specifc information about repo
//1. Fetch and parse repo infomation from API
//2. Fetch and parse languages infomation from languages_url
//3. Loop through language data
//3a. For each language, push to empty language array
const getRepoInfo = async repoName => {
  const fetchInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await fetchInfo.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];

  for (let language in languageData) {
    languages.push(language);
  }
  displayRepoInfo(repoInfo, languages);
};

//Function Notes
//1. Empty the contents of the .repo-data section
//2. Declare variable to create div element
//3. Set innerHTML of new div to repo information
//4. Append the newly created div to the .repo-data section
//5. Remove 'hide' class from .repo-data section
//6. Add 'hide' class to .repos section
const displayRepoInfo = (repoInfo, languages) => {
  repoData.innerHTML = '';
  const repoInfoDiv = document.createElement('div');
  repoInfoDiv.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(', ')}</p>
      <a class="visit" href="${
        repoInfo.html_url
      }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(repoInfoDiv);
  repoData.classList.remove('hide');
  repoSection.classList.add('hide');
  btnBackToRepo.classList.remove('hide');
};

//Event listener for back to repo gallery button
//1. Hide the individual repo data
//2. Hide the back to repo gallery button
//3. Show the repo list
btnBackToRepo.addEventListener('click', function () {
  repoData.classList.add('hide');
  repoSection.classList.remove('hide');
  btnBackToRepo.classList.add('hide');
});

getRepos();
getData();
