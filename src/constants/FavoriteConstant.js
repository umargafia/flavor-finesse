class FavoriteClass {
  constructor(id, image, name, time) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.time = time;
  }
}

export default FavoriteClass;

export const FavoriteClassList = [
  new FavoriteClass(
    1,
    require('../images/appetizer.jpg'),
    'Pancakes and Maple Syrup',
    '40 mns'
  ),
  new FavoriteClass(
    2,
    require('../images/breakfast.jpg'),
    'Scrambled Eggs with Toast',
    '1hr'
  ),
  new FavoriteClass(
    3,
    require('../images/lunch.jpg'),
    'Oatmeal with Fresh Berries',
    '20 mns'
  ),
  new FavoriteClass(
    4,
    require('../images/dinner.jpg'),
    'Bacon and Egg Breakfast Burrito',
    '1:40 mns'
  ),
];
