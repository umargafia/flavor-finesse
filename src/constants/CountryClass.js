class Country {
  constructor(country, image) {
    this.id = country;
    this.country = country;
    this.image = image;
  }
}

export default Country;

export const CountryList = [
  new Country("African", require("../images/african.jpg")),
  new Country("American", require("../images/american.jpg")),
  new Country("Asian", require("../images/asian.jpg")),
  new Country("European", require("../images/european.jpg")),
  new Country("Latin", require("../images/latin.jpg")),
];
