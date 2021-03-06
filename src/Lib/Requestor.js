import RNFetchBlob from 'rn-fetch-blob';

//Library function to handle API calls
module.exports = {
  //Upload for POST requests with Blob data
  upload: function (url, api_key, photo, query_params) {
    var ret = [];
    for (var d in query_params) {
      ret.push(
        encodeURIComponent(d) + '=' + encodeURIComponent(query_params[d]),
      );
    }

    var url = url + '?' + ret.join('&');

    return RNFetchBlob.fetch(
      'POST',
      url,
      {
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': api_key,
      },
      photo,
    )
      .then(res => {
        return res.json();
      })
      .then(json => {
        return json;
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  //Function for POST, GET, PUT requests
  request: function (url, method, api_key, data) {
    let headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': api_key,
    };

    let options = {
      method: method,
      headers: headers,
    };

    if (typeof data != 'undefined') {
      options.body = data;
    }

    return fetch(url, options)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return json;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
