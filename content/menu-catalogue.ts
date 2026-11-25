/**
 * Official menu catalogue transcribed from Amour du Goût printed menus
 * (Instagram "Our Menu" stories). Only clearly readable items are included.
 * Prices are in Rwandan Francs (RWF) as printed.
 *
 * Source status: transcribed from owner-supplied menu photography.
 * Confirm any uncertain spellings with the business before production copy.
 */

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
};

export type MenuSection = {
  id: string;
  label: string;
  description: string;
  items: MenuItem[];
};

export const MENU_CURRENCY = "RWF";

export const MENU_NOTE =
  "Prices are shown in Rwandan Francs (RWF) as printed on the Amour du Goût menu. Availability may vary — message us to confirm today’s selection.";

export const menuSections: MenuSection[] = [
  {
    id: "breakfast",
    label: "Breakfast Classics",
    description: "Morning boards and café breakfast favourites.",
    items: [
      {
        id: "royal-english",
        name: "The Royal English",
        price: 11500,
        description:
          "Bacon, sausage, eggs (scrambled, fried, or poached), baked beans, mushrooms, tomatoes, and toast.",
      },
      {
        id: "parisian-morning",
        name: "The Parisian Morning",
        price: 11500,
        description:
          "French-inspired selection of croissant, pain au chocolat, pancakes, baguette, fresh juice, and coffee.",
      },
      {
        id: "bakers-breakfast-board",
        name: "Baker’s Breakfast Board",
        price: 13500,
        description:
          "Eggs of your choice, croissant, pancake, baguette, waffles, bacon, berries, orange, fresh juice, and coffee.",
      },
      {
        id: "granola-yoghurt",
        name: "Granola Yoghurt",
        price: 5000,
        description: "Granola, yoghurt, banana, fresh berries, and mint.",
      },
    ],
  },
  {
    id: "french-classics",
    label: "French Classics",
    description: "Bakery staples, freshly presented.",
    items: [
      { id: "french-toast", name: "French Toast", price: 6500 },
      { id: "croissant", name: "Croissant", price: 2000 },
      { id: "danish-pastry", name: "Danish Pastry", price: 2500 },
      { id: "petit-swisse", name: "Petit Swisse", price: 2500 },
      { id: "pain-au-raisin", name: "Pain Au Raisin", price: 2500 },
    ],
  },
  {
    id: "sweet-treats",
    label: "Sweet Treats",
    description: "Crêpes, pancakes, éclairs, and dessert classics.",
    items: [
      { id: "tiramisu", name: "Tiramisu", price: 6000 },
      {
        id: "caramel-strawberry-crepe",
        name: "Caramel Strawberry Crepe",
        price: 4200,
      },
      {
        id: "caramel-strawberry-pancakes",
        name: "Caramel Strawberry Pancakes",
        price: 5200,
      },
      {
        id: "speculoos-pancakes",
        name: "Speculoos Pancakes",
        price: 5200,
      },
      { id: "long-eclaire", name: "Long Eclaire", price: 3500 },
      { id: "mini-eclaire", name: "Mini Eclaire", price: 2000 },
      { id: "cheese-cake", name: "Cheese Cake", price: 7000 },
      { id: "mini-cheesecake-pie", name: "Mini Cheesecake Pie", price: 3500 },
    ],
  },
  {
    id: "pies-brownies",
    label: "Fruit Pies & Brownies",
    description: "Small pies and brownie desserts.",
    items: [
      { id: "mini-strawberry-pie", name: "Mini Strawberry Pie", price: 3500 },
      { id: "mini-mango-pie", name: "Mini Mango Pie", price: 3500 },
      { id: "brownie-ice-cream", name: "Brownie Ice Cream", price: 5500 },
    ],
  },
  {
    id: "classic-mains",
    label: "Classic Mains",
    description: "Sandwiches, burgers, wraps, and café plates.",
    items: [
      {
        id: "chicken-basil-pita",
        name: "Chicken Basil Pita",
        price: 8000,
        description:
          "Grilled chicken, pasta, cheese, tomato, fresh basil, and crisp veggies in a warm pita pocket.",
      },
      {
        id: "tomato-avocado-sandwich",
        name: "Tomato Avocado Sandwich",
        price: 5000,
        description: "Fresh tomato and avocado on toasted bread.",
      },
      {
        id: "classic-deli-sandwich",
        name: "The Classic Deli Sandwich",
        price: 7500,
        description: "In-house special sandwich with ham, beef fillet, and cheese.",
      },
      {
        id: "crispy-chicken-burger",
        name: "Crispy Chicken Burger",
        price: 8000,
        description: "Golden fried chicken in a soft bun with fresh toppings.",
      },
      {
        id: "double-chicken-burger",
        name: "Double Chicken Burger",
        price: 10000,
        description: "Two juicy patties stacked with melted cheese.",
      },
      {
        id: "double-cheez-burger",
        name: "Double Cheez Burger",
        price: 9000,
        description: "Two juicy beef patties stacked with melted cheese.",
      },
      {
        id: "bacon-cheez-burger",
        name: "Bacon Cheez Burger",
        price: 8500,
        description: "Two juicy beef patties stacked with melted cheese.",
      },
      {
        id: "cheez-burger",
        name: "Cheez Burger",
        price: 7000,
        description: "Juicy beef patties stacked with melted cheese.",
      },
      {
        id: "chicken-tender-wrap",
        name: "Chicken Tender Wrap",
        price: 8000,
        description: "Crispy chicken tenders wrapped with fresh greens.",
      },
      {
        id: "beef-wrap",
        name: "Beef Wrap",
        price: 7500,
        description: "A Middle Eastern favourite with falafel and tzatziki sauce.",
      },
      {
        id: "classic-hotdog",
        name: "Classic Hotdog",
        price: 7000,
        description: "A signature house-made hot dog with all the right flavours.",
      },
      {
        id: "tuna-melt",
        name: "Tuna Melt",
        price: 8000,
        description: "Tuna and melted cheese toasted to perfection.",
      },
      {
        id: "croque-monsieur",
        name: "Croque Monsieur",
        price: 7000,
        description: "Brioche bread, mayonnaise, ham, cheese, and béchamel sauce.",
      },
      { id: "chips-salad", name: "Chips & Salad", price: 3000 },
    ],
  },
  {
    id: "big-platters",
    label: "Big Bite Platters",
    description: "Sharing plates for the table.",
    items: [
      {
        id: "board-room-platter",
        name: "Board Room Platter",
        price: 17000,
        description:
          "Grilled cheese, meatballs, chicken pops, chicken wings, cheese, sausage, and masala cheese fries.",
      },
      {
        id: "mediterranean-platter",
        name: "Mediterranean Platter",
        price: 17000,
        description:
          "Fish fingers, chicken tempura, bacon cheese quesadilla, honey cream cheese toast, and masala cheese fries.",
      },
      {
        id: "smoked-sausage-cheese",
        name: "Smoked Sausage and Cheese",
        price: 12000,
      },
    ],
  },
  {
    id: "small-platters",
    label: "Small Bite Platters",
    description: "Fries, bites, and bruschetta.",
    items: [
      {
        id: "bacon-cheese-fries",
        name: "Bacon Cheese Fries",
        price: 8000,
        description: "Crispy fries loaded with bacon and melted cheese.",
      },
      {
        id: "sausage-cheese-fries",
        name: "Sausage Cheese Fries",
        price: 7000,
        description: "Classic mix of sausage and cheesy fries.",
      },
      {
        id: "tokyo-chicken",
        name: "Tokyo Chicken",
        price: 7000,
        description: "Lightly fried soy-glazed chicken bites.",
      },
      {
        id: "classic-bruschetta",
        name: "Classic Bruschetta",
        price: 7000,
        description: "Six bites of cheese, ham, and toasted bread.",
      },
      {
        id: "tomato-avocado-bruschetta",
        name: "Tomato Avocado Bruschetta",
        price: 5000,
        description: "Six French tomatoes and avocado topped toast.",
      },
    ],
  },
  {
    id: "salads",
    label: "Baker’s Salads",
    description: "Fresh bowls with bright toppings.",
    items: [
      {
        id: "chicken-superfood-salad",
        name: "Chicken Superfood Salad",
        price: 7000,
        description:
          "Kale, lettuce, avocado, mango, quinoa, chicken, and cucumber.",
      },
      {
        id: "quinoa-power-salad",
        name: "Quinoa Power Salad",
        price: 6000,
        description: "Romaine, kale, chickpeas, raisin, green apple, cucumber.",
      },
      {
        id: "tex-mex-salad",
        name: "Tex-Mex Salad",
        price: 6000,
        description:
          "Iceberg lettuce, cabbage, parsley, chicken, cheese, and Tex-Mex dressing.",
      },
      {
        id: "greek-garden-salad",
        name: "Greek Garden Salad",
        price: 5500,
        description: "Romaine, kale, rocket, olives, and feta cheese.",
      },
    ],
  },
  {
    id: "smoothies",
    label: "Smoothies",
    description: "Blended fruit drinks.",
    items: [
      { id: "mango-berry", name: "Mango Berry", price: 10000 },
      { id: "tango-mango", name: "Tango Mango", price: 7000 },
      { id: "verry-berry-smooth", name: "Verry Berry Smooth", price: 7000 },
      { id: "detox-green-smooth", name: "Detox Green Smooth", price: 7000 },
      { id: "banana-berry-smooth", name: "Banana Berry Smooth", price: 7000 },
      { id: "vanilla-berry-smooth", name: "Vanilla Berry Smooth", price: 7000 },
    ],
  },
  {
    id: "milkshakes",
    label: "Milkshakes",
    description: "Creamy café shakes.",
    items: [
      { id: "vanilla-milkshake", name: "Vanilla Milkshake", price: 6000 },
      { id: "chocola-milkshake", name: "Chocola Milkshake", price: 6000 },
      {
        id: "strawberry-milkshake",
        name: "Strawberry Milkshake",
        price: 5500,
      },
      { id: "house-milkshake", name: "House Milkshake", price: 8000 },
    ],
  },
  {
    id: "fresh-juice",
    label: "Fresh Juice",
    description: "Pressed and fresh fruit juices.",
    items: [
      { id: "passion-juice", name: "Passion Juice", price: 3500 },
      { id: "pineapple-juice", name: "Pineapple Juice", price: 3500 },
      { id: "tree-tomato-juice", name: "Tree Tomato Juice", price: 4000 },
      { id: "watermelon-juice", name: "Watermelon Juice", price: 4000 },
      { id: "mango-juice", name: "Mango Juice", price: 4500 },
      { id: "mocktail-juice", name: "Mocktail Juice", price: 6000 },
    ],
  },
  {
    id: "coffee",
    label: "Coffee",
    description: "Espresso bar favourites.",
    items: [
      { id: "cafe-latte", name: "Café Latte", price: 3000 },
      { id: "cappuccino", name: "Cappuccino", price: 3000 },
      { id: "cortado", name: "Cortado", price: 3000 },
      { id: "flat-white", name: "Flat White", price: 3000 },
      { id: "americano", name: "Americano", price: 2800 },
      { id: "black-coffee", name: "Black Coffee", price: 2500 },
      { id: "cafe-au-lait", name: "Café Au Lait", price: 4000 },
      { id: "espresso", name: "Espresso", price: 2900 },
      { id: "caramel-macchiato", name: "Caramel Macchiato", price: 3500 },
      { id: "vanilla-latte", name: "Vanilla Latte", price: 3500 },
      { id: "cafe-mocha", name: "Café Mocha", price: 3500 },
    ],
  },
  {
    id: "iced-coffee",
    label: "Iced Coffee",
    description: "Chilled espresso drinks.",
    items: [
      { id: "iced-vanilla-latte", name: "Iced Vanilla Latte", price: 4000 },
      {
        id: "iced-caramel-macchiato",
        name: "Iced Caramel Macchiato",
        price: 4000,
      },
      { id: "iced-mocha", name: "Iced Mocha", price: 4000 },
      { id: "iced-americano", name: "Iced Americano", price: 4000 },
      { id: "iced-black-coffee", name: "Iced Black Coffee", price: 3500 },
      { id: "iced-cappuccino", name: "Iced Cappuccino", price: 3500 },
      { id: "iced-latte", name: "Iced Latte", price: 3500 },
    ],
  },
  {
    id: "tea",
    label: "Tea",
    description: "Hot teas from classic to spiced.",
    items: [
      { id: "african-tea", name: "African Tea", price: 3000 },
      { id: "fruit-tea", name: "Fruit Tea", price: 4000 },
      { id: "green-tea", name: "Green Tea", price: 3000 },
      { id: "dawa-tea", name: "Dawa Tea", price: 4000 },
      { id: "ginger-tea", name: "Ginger Tea", price: 4500 },
      { id: "russian-tea", name: "Russian Tea", price: 4500 },
      { id: "hibiscus-tea", name: "Hibiscus Tea", price: 2000 },
      { id: "spice-tea", name: "Spice Tea", price: 4000 },
      { id: "lemon-tea", name: "Lemon Tea", price: 3500 },
    ],
  },
  {
    id: "iced-tea",
    label: "Iced Tea",
    description: "Cold tea pours.",
    items: [
      { id: "iced-fresh-fruit-tea", name: "Iced Fresh Fruit Tea", price: 4500 },
      { id: "iced-spice-tea", name: "Iced Spice Tea", price: 4500 },
      { id: "iced-black-tea", name: "Iced Black Tea", price: 3000 },
    ],
  },
  {
    id: "ice-cream",
    label: "Ice Cream Scoop",
    description: "Scoops to finish the moment.",
    items: [
      { id: "vanilla-scoop", name: "Vanilla", price: 2500 },
      { id: "chocola-scoop", name: "Chocola", price: 2500 },
      { id: "strawberry-scoop", name: "Strawberry", price: 2500 },
      { id: "all-in-one-scoop", name: "All In One", price: 7500 },
    ],
  },
  {
    id: "water",
    label: "Water",
    description: "Still and sparkling.",
    items: [
      { id: "sparkling-water", name: "Sparkling Water", price: 1500 },
      { id: "bottled-water", name: "Bottled Water", price: 1000 },
    ],
  },
];

export function formatMenuPrice(price: number) {
  return `${price.toLocaleString("en-US")} ${MENU_CURRENCY}`;
}

export function countMenuItems() {
  return menuSections.reduce((total, section) => total + section.items.length, 0);
}
