class Api {
  constructor({ downloadUrl, uploadUrl, apiKey }) {
    this._downloadUrl = downloadUrl;
    this._uploadUrl = uploadUrl;
    this._apiKey = apiKey;
  }

  getTrendingGifs() {
    return fetch(
      `${this._downloadUrl}/gifs/trending?api_key=${this._apiKey}&limit=30`
    ).then(this._checkResponse);
  }

  searchGifs(searchInput) {
    return fetch(
      `${this._downloadUrl}/gifs/search?api_key=${this._apiKey}&q=${searchInput}&limit=30`
    ).then(this._checkResponse);
  }

  getTrendingSearches() {
    return fetch(
      `${this._downloadUrl}/trending/searches?api_key=${this._apiKey}`
    ).then(this._checkResponse);    
  }

  getAutocomplete(searchInput) {
    return fetch(
      `${this._downloadUrl}/gifs/search/tags?api_key=${this._apiKey}&q=${searchInput}`
    ).then(this._checkResponse);    
  }

  getGifById(id) {
    return fetch(
      `${this._downloadUrl}/gifs/${id}?api_key=${this._apiKey}&gif_id=${id}`
    ).then(this._checkResponse);
  }

  getRandomGif() {
    return fetch(`${this._downloadUrl}/random?api_key=${this._apiKey}`).then(
      this._checkResponse
    );
  }

  uploadGifUrl(url, tags) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("source_image_url", url);
    urlencoded.append("tags", tags);
    return fetch(
      `${this._uploadUrl}?api_key=${this._apiKey}&source_image_url=${url}&tags=${tags}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded,
      }
    ).then(this._checkResponse);
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка загрузки: ${res.status}`);
  }
}

const api = new Api({
  downloadUrl: "https://api.giphy.com/v1",
  uploadUrl: "https://upload.giphy.com/v1/gifs",
  apiKey: "yIKXK4tL4v1AEVLuQS5j2O4WuLHoSg75",
});

export default api;