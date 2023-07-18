class Course {
  constructor(id, image, name) {
    this.id = id;
    this.image = image;
    this.name = name;
  }
}

export default Course;

export const CourseList = [
  new Course("dessert", require("../images/appetizer.jpg"), "Dessert"),
  new Course("breakfast", require("../images/breakfast.jpg"), "Breakfast"),
  new Course("lunch", require("../images/lunch.jpg"), "Lunch"),
  new Course("dinner", require("../images/dinner.jpg"), "Dinner"),
];
