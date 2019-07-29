const input = document.querySelector('input[type="text"]');
let aboutUser = document.querySelector('.about-user');
let latestRepos = document.querySelector('.latest-repos');

let h2 = document.querySelector('h2');
h2.style.display = 'none';

input.addEventListener('keyup',getData);

  async  function getData(e){
    let user =e.target.value;
     let promise = await fetch(`https://api.github.com/users/${user}`);
     if(promise.status === 200){
      let data = await promise.json();
      
      let repoPromise = await fetch(`https://api.github.com/users/${user}/repos`);

      let repoData = await repoPromise.json();

      aboutUser.style.border = '1px solid #ddd';
      aboutUser.innerHTML = `
      <div class="user-profile">
      <div><img src=" " alt=""></div> 
       <div><a href="" target="_blank">view profile</a></div>
   </div>
   <div class="user-stats">
       <div class="stats">
            <div class="public-repos">Public repos : ${data.public_repos}</div>
            <div class="public-gists">Public gists : ${data.public_gists}</div>
            <div class="following">Following : ${data.following}</div>
            <div class="follower">Follower : ${data.followers}</div>
       </div>
       <div class="stats2">
           <div class="company">Company : ${data.company}</div>
           <div class="website">Website : ${data.blog}</div>
           <div class="location">Location : ${data.location}</div>
           <div class="member-since">Member since : ${data.created_at}</div>
       </div>
   </div>
      `  ;
      document.querySelector('img').setAttribute('src' , data.avatar_url);
      document.querySelector('a').setAttribute('href' , data.html_url);

      h2.style.display = 'block';

      repoData.sort(function(x , y){
        return y.id - x.id;
      })

      latestRepos.innerHTML = ' ';
      for(let i=0;i<5;i++){
        latestRepos.innerHTML += `
      <div class="repo">
      <div class="repo-name">${repoData[i].name}</div>
      <div >
          <div class="stars">Stars : ${repoData[i].stargazers_count}</div>
          <div class="watchers">Watchers : ${repoData[i].watchers_count}</div>
          <div class="forks">Forks : ${repoData[i].forks}</div>
      </div>
  </div>      `
      }      
     }
    }
