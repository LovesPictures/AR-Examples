const CLIENT_ID = '94f652e4d69f4a89b80bd7d1f47f9c7c',
USER_ID = '19814931',
TOKEN = '19814931.b534787.d25b533b022d49769069548141559507',
TAG = 'corder';


// get: 'user',
//  userId: '19814931',
//  clientId: '94f652e4d69f4a89b80bd7d1f47f9c7c',
//  accessToken: '19814931.b534787.d25b533b022d49769069548141559507',
//  resolution: 'standard_resolution',
//  template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
//  sortBy: 'most-recent',
// limit: 18,
// links: false



const getProfile = () => {
  const URL = `https://api.instagram.com/v1/users/${USER_ID}/?access_token=${TOKEN}`;
  fetch(URL).
  then(response => response.json()).
  then(response => {
    drawData(response);
    drawBio(response);
    drawCounters(response);
  });
};




const drawGallery = () => {
  const URL = `https://api.instagram.com/v1/users/${USER_ID}/media/recent/?access_token=${TOKEN}`;
  fetch(URL).
  then(response => response.json()).
  then(response => {
    var ListGallery = '';
    response.data.forEach(e => {
      ListGallery += `
            <li>
              <img src="${e.images.standard_resolution.url}">
              <span class="label">${e.likes.count}  <i class="fa fa-heart-o" aria-hidden="true"></i></span>
            </li>`;
    });
    document.getElementById('gallery').innerHTML = ListGallery;

  });
};

drawData = response => {
  let pPhoto = `
          <div
            class="box__picture"
            style="
              background-image:url(${response.data.profile_picture});">
          </div>
          <button class="box__follow">
            <a href="https://www.instagram.com/${response.data.username}" target="_blank">follow on instagram</a>
          </button>`,
  fullName = `${response.data.full_name}`;

  document.getElementById('profilePhoto').innerHTML = pPhoto;
  document.getElementById('full_name').innerHTML = fullName;
};

drawBio = response => {
  let bio = response.data.bio;
  document.getElementById('bio').innerHTML = bio;
};




drawCounters = response => {
  let counters = `
          <div class="counters">
            <div>
            <p class="counters__total">
              ${response.data.counts.media}
            </p>
            <p class="counters__name">
              media
            </p>
          </div>
          <div>
            <p class="counters__total">
              ${response.data.counts.followed_by}
            </p>
            <p class="counters__name">Followed by</p>
          </div>
          <div>
            <p class="counters__total">
              ${response.data.counts.follows}
            </p>
            <p class="counters__name">follows</p>
          </div>
          </div>
          `;
  document.getElementById('counters').innerHTML = counters;
};



getProfile();
drawGallery();