class Api {
  constructor() {
    this.baseURL = "https://restcountries.eu/rest/v2";

    this.api = axios.create({
      baseURL: `${this.baseURL}`,
    });

    // response interceptor only intercept if there is error
    this.api.interceptors.response.use(undefined, (error) =>
      Promise.reject(error)
    );
  }

  async _fetch(cacheID, extendURL) {
    let url = this.baseURL + extendURL;
    // Check caches
    const cacheStorage = await caches.open(`${cacheID}`);
    const cachedResponse = await cacheStorage.match(`${url}`);

    // Fetch from server and add to cache
    if (!cachedResponse || !cachedResponse.ok) {
      await cacheStorage.add(url);
      const response = await this.api.get(extendURL);
      return await response.data;
    }
    // Return cache if it has data in caches
    return cachedResponse.json();
  }

  // Get list of all countries
  async getAll() {
    try {
      const response = await this._fetch("getAll", "/all");
      console.log("List of all countries' names:");

      return console.log(response.map((country) => country.name));
    } catch (error) {
      console.log.error;
    }
  }

  // Search for a country by full name
  async getCountryByName(name) {
    // Response is the object of the country
    const response = await this._fetch(`getByName-${name}`, `/name/${name}`);
    console.log(`Object of ${name}:`);

    return console.log(response[0]);
  }

  // Find neighbor countries
  async getNeighbor(name) {
    try {
      // Get the country code of neighboring countries
      const response = await this._fetch(`getByName-${name}`, `/name/${name}`);
      const neighbors = response[0].borders.join(";");

      // Check if it has any neighbors
      if (!neighbors.length) {
        return console.log(`${name} has no bordering countries`);
      } else {
        // Response data have only names.
        const response = await this._fetch(
          `getNeighbor-${name}`,
          `/alpha?codes=${neighbors}`
        );
        console.log(`Neighboring countries of ${name} are:`);

        return console.log(response.map((country) => country.name));
      }
    } catch (error) {
      console.log.error;
    }
  }

  // Get countries with language code
  async getCountryByLanguage(code) {
    try {
      const response = await this._fetch(`getByLang-${code}`, `/lang/${code}`);
      console.log(`Countries with language code (${code}) are:`);

      return console.log(response.map((country) => country.name));
    } catch (error) {
      console.log.error;
    }
  }

  // Get countries with population larger than given value
  async getCountryByPopulation(mil) {
    try {
      const response = await this._fetch("getAll", "/all");
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
    } catch (error) {
      console.log.error;
    }
  }
}

const api = new Api();
api.getAll();
api.getCountryByName("france");
api.getNeighbor("germany");
api.getCountryByLanguage("es");
api.getCountryByPopulation(80);
