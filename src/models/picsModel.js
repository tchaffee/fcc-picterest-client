import AuthService from '../utils/AuthService';
const auth = new AuthService('xgk3Iwy5uWQt8tnzZjjIdrw0N2shXnug', 'tchaffee.auth0.com');

function getAllPics () {
  return auth.fetch('/api/pics',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function getUserPics (userId) {
  return auth.fetch(`/api/users/${userId}/pics`,
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function getMyPics () {
  return auth.fetch('/api/users/me/pics',
    {
      method: 'GET'
    }
  )
  .then(response => {
    return response.json();
  });
}

function addPic (url, description) {
  return auth.fetch('/api/users/me/pics',
    {
      method: 'POST',
 	    body: JSON.stringify({
		    url: url,
        description: description
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

function deletePic (url) {
  return auth.fetch('/api/users/me/pics',
    {
      method: 'DELETE',
 	    body: JSON.stringify({
		    url: url
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

function likePic (id) {
  return auth.fetch(`/api/pics/${id}`,
    {
      method: 'POST',
 	    body: JSON.stringify({
		    action: 'like'
	    })     
    }
  )
  .then(response => {
    return response;
  });
}

export { getAllPics, getMyPics, getUserPics, addPic, deletePic, likePic };
