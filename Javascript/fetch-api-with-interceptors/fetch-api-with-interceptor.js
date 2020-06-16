class Api {
  constructor() {
    this.api = axios.create({
      baseURL: "https://restcountries.eu/rest/v2",
    });

    // intercept request to get data from cache
    // if doesn't exist in cache then fetch from server => update cache => return data from cache
    this.api.interceptors.request.use(async (request) => {
      const cacheData = await this.getData(request);
      request.adapter = () => {
        return Promise.resolve({ // stop sending the request, return with cache data
          data: cacheData,
          status: request.status,
          statusText: request.statusText,
          headers: request.headers,
          config: request,
          request: request,
        });
      };
      return request;
    }, undefined);

    this.api.interceptors.response.use(
      response => response.data,
      (error) => Promise.reject(error)
    );
  }

  async getData(request) {
    let fullURL = request.baseURL + request.url;
    if (request.hasOwnProperty("params")) {
      fullURL += "?" + $.param(request.params);
    }

    // Check caches
    const cacheStorage = await caches.open(`${fullURL}`);
    let cachedResponse = await cacheStorage.match(`${fullURL}`);

    // If no match found in caches => send request => update response to cache
    if (!cachedResponse || !cachedResponse.ok) {
      await cacheStorage.add(fullURL).catch(error => Promise.reject(error)); // get data from server and add to cache
      cachedResponse = await cacheStorage.match(`${fullURL}`);
    }
    return cachedResponse.json(); // return data from cache
  }

  // Get list of all countries
  async getAll() {
    // Response data have only names.
    const response = await this.api.get("/all", {
      params: {
        fields: "name",
      },
    });
    console.log("List of all countries' names:");

    // Change array of countries objects into list of names and console.log that list
    return console.log(response.map((country) => country.name));
  }

  // Search for a country by full name
  async getCountryByName(name) {
    // Response is the object of the country
    const response = await this.api.get(`/name/${name}`);
    console.log(`Object of ${name}:`);

    return console.log(response[0]);
  }

  // Find neighbor countries
  async getNeighbor(name) {
    // Get the country code of neighboring countries
    const response = await this.api.get(`/name/${name}`);
    const neighbors = response[0].borders;

    // Check if it has any neighbors
    if (!neighbors.length) {
      return console.log(`${name} has no bordering countries`);
    } else {
      let names = [];
      // Response data have only names.
      const response = await this.api.get(`/alpha`, {
        params: {
          codes: neighbors.join(";"),
          fields: "name",
        },
      });
      console.log(`Neighboring countries of ${name} are:`);
      return console.log(response.map((country) => country.name));
    }
  }

  // Get countries with language code
  async getCountryByLanguage(code) {
    // Response data have only names
    const response = await this.api.get(`/lang/${code}`, {
      params: {
        fields: "name",
      },
    });
    console.log(`Countries with language code (${code}) are:`);
    return console.log(response.map((country) => country.name));
  }

  // Get countries with population larger than given value
  async getCountryByPopulation(mil) {
    // Response data have names and their population
    const response = await this.api.get("/all", {
      params: {
        fields: "name;population",
      },
    });
    console.log(`Countries with population >= ${mil} millions are:`);
    return console.log(
      response
        .filter((country) => country.population >= mil * 1e6)
        .map((country) => {
          const temp = {};
          temp[country.name] = country.population;
          return temp;
        })
    );
  }
}

const api = new Api();
api.getAll();
api.getCountryByName("france");
api.getNeighbor("germany");
api.getCountryByLanguage("es");
api.getCountryByPopulation(80);
