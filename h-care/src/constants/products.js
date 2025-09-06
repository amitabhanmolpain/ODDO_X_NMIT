const products = [
  {
    id: 'p1',
    title: 'Study Desk - Wooden (Good Condition)',
    category: 'Furniture',
    price: 1200,
    condition: 'Used',
    image: '/assets/desk.png',
    trending: true,
  },
  {
    id: 'p2',
    title: 'College Starter Pack (Bag + Notebooks)',
    category: 'Starter Packs',
    price: 799,
    condition: 'Bundle',
    image: '/assets/starter-pack.png',
    trending: false,
    discounted: true,
  },
  {
    id: 'p3',
    title: 'Basic Laptop (Refurbished)',
    category: 'Electronics',
    price: 8500,
    condition: 'Refurbished',
    image: '/assets/laptop.png',
    trending: true,
    discounted: true,
  },
  {
    id: 'p4',
    title: 'Jacket and Shoes Combo',
    category: 'Clothing',
    price: 499,
    condition: 'Used',
    image: '/assets/jacket.png',
    trending: false,
  },
  {
    id: 'p5',
    title: 'Textbook Bundle - Semester 1',
    category: 'Books',
    price: 350,
    condition: 'Used',
    image: '/assets/books.png',
    trending: true,
  },
  {
    id: 'p6',
    title: 'City Bike (Well Maintained)',
    category: 'Cycles & Gear',
    price: 3200,
    condition: 'Used',
    image: '/assets/bike.png',
    trending: false,
    discounted: true,
  }
];

export const categories = [
  { id: 'c1', name: 'Furniture', image: '/assets/category-furniture.png' },
  { id: 'c2', name: 'Starter Packs', image: '/assets/category-starter.png' },
  { id: 'c3', name: 'Electronics', image: '/assets/category-electronics.png' },
  { id: 'c4', name: 'Clothing', image: '/assets/category-clothing.png' },
  { id: 'c5', name: 'Books', image: '/assets/category-books.png' },
  { id: 'c6', name: 'Cycles & Gear', image: '/assets/category-cycles.png' },
];

export default products;
