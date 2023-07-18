class InstructionClass {
  constructor(id, step, procedure) {
    this.id = id;
    this.step = step;
    this.procedure = procedure;
  }
}

export default InstructionClass;

export const InstructionList = [
  new InstructionClass(1, 1, 'Put the garlic in a pan and then add the onion'),
  new InstructionClass(2, 2, 'Add some salt and oregano.'),
  new InstructionClass(3, 3, 'Preheat the oven to 200 degrees F.'),
  new InstructionClass(
    4,
    4,
    'Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl.'
  ),
  new InstructionClass(
    5,
    5,
    'Whisk together the eggs, buttermilk, butter and vanilla extract and vanilla bean in a small bowl.'
  ),
];
