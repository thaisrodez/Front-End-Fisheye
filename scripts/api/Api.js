class Api {
  constructor(url) {
    this._url = url;
  }

  async get() {
    try {
      const res = await fetch(this._url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

class PhotographerApi extends Api {
  constructor(url) {
    super(url);
  }

  async getPhotographers() {
    const apiData = await this.get();
    return apiData.photographers;
  }
}

class MediaApi extends Api {
  constructor(url) {
    super(url);
  }

  async getMedias() {
    const apiData = await this.get();
    return apiData.media;
  }
}
