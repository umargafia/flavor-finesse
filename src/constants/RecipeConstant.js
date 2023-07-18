class RecipeClass {
  constructor(id, image, name, time) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.time = time;
  }
}

export default RecipeClass;

export const recipeTypes = [
  new RecipeClass(
    '1',
    require('../images/american.jpg'),
    'Pancakes and Maple Syrup'
  ),
  new RecipeClass(
    '2',
    require('../images/african.jpg'),
    'Scrambled Eggs with Toast'
  ),
  new RecipeClass(
    '3',
    require('../images/appetizer.jpg'),
    'Oatmeal with Fresh Berries'
  ),
  new RecipeClass(
    '4',
    require('../images/asian.jpg'),
    'Bacon and Egg Breakfast Burrito'
  ),
  new RecipeClass(
    '5',
    require('../images/breakfast.jpg'),
    'Avocado Toast with Poached Eggs'
  ),
  new RecipeClass(
    '6',
    require('../images/dinner.jpg'),
    'Belgian Waffles with Whipped Cream and Berries'
  ),
  new RecipeClass(
    '7',
    require('../images/european.jpg'),
    'Greek Yogurt Parfait with Granola and Honey'
  ),
  new RecipeClass(
    '8',
    require('../images/appetizer.jpg'),
    'Breakfast Smoothie Bowl with Mixed Fruits and Nuts'
  ),
];
