class FoodType {
  constructor(id, icon, name) {
    this.id = id;
    this.icon = icon;
    this.name = name;
  }
}

export default FoodType;

export const FoodTypes = [
  new FoodType('all', '🍴', 'All'),
  new FoodType('burger', '🍔', 'Burger'),
  new FoodType('chicken', '🍗', 'Chicken'),
  new FoodType('pizza', '🍕', 'Pizza'),
  new FoodType('icecream', '🍦', 'Icecream'),
  new FoodType('Sandwich', '🥪', 'Sandwich'),
  new FoodType('cake', '🎂', 'Cake'),
  new FoodType('salad', '🥗', 'Salad'),
  new FoodType('sushi', '🍣', 'Sushi'),
  new FoodType('pasta', '🍝', 'Pasta'),
  new FoodType('Snacks', '🍩', 'Snacks'),
  new FoodType('vegetarian', '🥕', 'Vegetarian'),
  new FoodType('soup', '🥣', 'Soup'),
  new FoodType('juice', '🥤', 'Juice'),
];
