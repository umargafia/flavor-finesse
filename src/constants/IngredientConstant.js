class IngredientClass {
  constructor(id, name, amount, image) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.image = image;
  }
}

export default IngredientClass;

export const IngredientList = [
  new IngredientClass(
    1,
    'recipe 1 ajsjs abibqcfuo  dbicb 8 ',
    2,
    require('../../assets/icon.png')
  ),
  new IngredientClass(2, 'egg', 2, require('../../assets/icon.png')),
  new IngredientClass(3, 'milk', '12spns', require('../../assets/icon.png')),
  new IngredientClass(4, 'sugar', '2spns', require('../../assets/icon.png')),
  new IngredientClass(5, 'recipe 5', 1, require('../../assets/icon.png')),
];
