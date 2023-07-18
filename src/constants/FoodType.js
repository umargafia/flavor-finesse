class FoodType {
  constructor(id, icon, name) {
    this.id = id;
    this.icon = icon;
    this.name = name;
  }
}

export default FoodType;

export const FoodTypes = [
  new FoodType("all", "🍴", "All"),
  new FoodType("juice", "🥤", "Juice"),
  new FoodType("vegetarian", "🥕", "Vegetarian"),
  new FoodType("chicken", "🍗", "Chicken"),
  new FoodType("burger", "🍔", "Burger"),
  new FoodType("cake", "🎂", "Cake"),
  new FoodType("Snacks", "🍩", "Snacks"),
  new FoodType("Sandwich", "🥪", "Sandwich"),
];
