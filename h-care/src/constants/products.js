const products = [
  // Furniture (10)
  { id: 'f1', title: 'Study Desk - Compact', category: 'Furniture', price: 1200, condition: 'Used', image: '/assets/desk.png', trending: true },
  { id: 'f2', title: 'Wooden Bookshelf', category: 'Furniture', price: 1800, condition: 'Used', image: '/assets/bookshelf.png' },
  { id: 'f3', title: 'Single Bed Frame', category: 'Furniture', price: 2500, condition: 'Used', image: '/assets/bed.png', discounted: true },
  { id: 'f4', title: 'Study Chair - Ergonomic', category: 'Furniture', price: 900, condition: 'Used', image: '/assets/chair.png' },
  { id: 'f5', title: 'Dining Table (4 seater)', category: 'Furniture', price: 3200, condition: 'Used', image: '/assets/table.png' },
  { id: 'f6', title: 'Side Table', category: 'Furniture', price: 450, condition: 'Used', image: '/assets/side-table.png' },
  { id: 'f7', title: 'Wardrobe - 2 door', category: 'Furniture', price: 4000, condition: 'Used', image: '/assets/wardrobe.png' },
  { id: 'f8', title: 'Shoe Rack', category: 'Furniture', price: 300, condition: 'Used', image: '/assets/shoe-rack.png' },
  { id: 'f9', title: 'Coffee Table', category: 'Furniture', price: 700, condition: 'Used', image: '/assets/coffee-table.png' },
  { id: 'f10', title: 'TV Stand', category: 'Furniture', price: 850, condition: 'Used', image: '/assets/tv-stand.png' },

  // Shirts (10)
  { id: 's1', title: 'Cotton Shirt - Blue', category: 'Shirts', price: 399, condition: 'Like New', image: '/assets/shirt-blue.png' },
  { id: 's2', title: 'Formal Shirt - White', category: 'Shirts', price: 499, condition: 'Like New', image: '/assets/shirt-white.png', trending: true },
  { id: 's3', title: 'Checked Shirt', category: 'Shirts', price: 299, condition: 'Used', image: '/assets/shirt-checked.png' },
  { id: 's4', title: 'Denim Shirt', category: 'Shirts', price: 599, condition: 'Like New', image: '/assets/shirt-denim.png' },
  { id: 's5', title: 'Polo Tee', category: 'Shirts', price: 249, condition: 'Used', image: '/assets/polo.png' },
  { id: 's6', title: 'Hooded Shirt', category: 'Shirts', price: 699, condition: 'Like New', image: '/assets/hoodie.png', discounted: true },
  { id: 's7', title: 'Graphic Tee', category: 'Shirts', price: 199, condition: 'Used', image: '/assets/tee.png' },
  { id: 's8', title: 'Linen Shirt', category: 'Shirts', price: 599, condition: 'Like New', image: '/assets/linen.png' },
  { id: 's9', title: 'Striped Shirt', category: 'Shirts', price: 349, condition: 'Used', image: '/assets/shirt-striped.png' },
  { id: 's10', title: 'Flannel Shirt', category: 'Shirts', price: 279, condition: 'Used', image: '/assets/flannel.png' },

  // Pants (10)
  { id: 'p1', title: 'Denim Jeans - Slim', category: 'Pants', price: 799, condition: 'Used', image: '/assets/jeans.png', trending: true },
  { id: 'p2', title: 'Chinos - Khaki', category: 'Pants', price: 699, condition: 'Used', image: '/assets/chinos.png' },
  { id: 'p3', title: 'Track Pants', category: 'Pants', price: 349, condition: 'Like New', image: '/assets/trackpants.png' },
  { id: 'p4', title: 'Formal Trousers', category: 'Pants', price: 599, condition: 'Used', image: '/assets/trousers.png' },
  { id: 'p5', title: 'Cargo Pants', category: 'Pants', price: 499, condition: 'Used', image: '/assets/cargo.png' },
  { id: 'p6', title: 'Shorts', category: 'Pants', price: 199, condition: 'Used', image: '/assets/shorts.png' },
  { id: 'p7', title: 'Joggers', category: 'Pants', price: 299, condition: 'Like New', image: '/assets/joggers.png' },
  { id: 'p8', title: 'Formal Pants - Black', category: 'Pants', price: 649, condition: 'Used', image: '/assets/pants-black.png' },
  { id: 'p9', title: 'Linen Pants', category: 'Pants', price: 549, condition: 'Like New', image: '/assets/pants-linen.png' },
  { id: 'p10', title: 'Stretch Pants', category: 'Pants', price: 429, condition: 'Used', image: '/assets/stretch.png' },

  // Jackets (10)
  { id: 'j1', title: 'Winter Jacket - Puffer', category: 'Jackets', price: 1299, condition: 'Like New', image: '/assets/jacket-puffer.png', discounted: true },
  { id: 'j2', title: 'Leather Jacket', category: 'Jackets', price: 2200, condition: 'Used', image: '/assets/jacket-leather.png' },
  { id: 'j3', title: 'Denim Jacket', category: 'Jackets', price: 999, condition: 'Used', image: '/assets/jacket-denim.png' },
  { id: 'j4', title: 'Blazer', category: 'Jackets', price: 1499, condition: 'Like New', image: '/assets/blazer.png' },
  { id: 'j5', title: 'Rain Jacket', category: 'Jackets', price: 799, condition: 'Used', image: '/assets/jacket-rain.png' },
  { id: 'j6', title: 'Bomber Jacket', category: 'Jackets', price: 899, condition: 'Used', image: '/assets/jacket-bomber.png' },
  { id: 'j7', title: 'Hooded Jacket', category: 'Jackets', price: 699, condition: 'Used', image: '/assets/jacket-hood.png' },
  { id: 'j8', title: 'Fleece Jacket', category: 'Jackets', price: 499, condition: 'Used', image: '/assets/jacket-fleece.png' },
  { id: 'j9', title: 'Windcheater', category: 'Jackets', price: 399, condition: 'Used', image: '/assets/jacket-wind.png' },
  { id: 'j10', title: 'Softshell Jacket', category: 'Jackets', price: 1099, condition: 'Like New', image: '/assets/jacket-soft.png' },

  // Kitchen Appliances (10)
  { id: 'k1', title: 'Microwave (20L)', category: 'Kitchen Appliances', price: 2200, condition: 'Used', image: '/assets/microwave.png', trending: true },
  { id: 'k2', title: 'Electric Kettle', category: 'Kitchen Appliances', price: 450, condition: 'Like New', image: '/assets/kettle.png' },
  { id: 'k3', title: 'Mixer Grinder', category: 'Kitchen Appliances', price: 1200, condition: 'Used', image: '/assets/mixer.png' },
  { id: 'k4', title: 'Toaster', category: 'Kitchen Appliances', price: 350, condition: 'Used', image: '/assets/toaster.png' },
  { id: 'k5', title: 'Rice Cooker', category: 'Kitchen Appliances', price: 900, condition: 'Used', image: '/assets/ricecooker.png' },
  { id: 'k6', title: 'Blender', category: 'Kitchen Appliances', price: 650, condition: 'Like New', image: '/assets/blender.png' },
  { id: 'k7', title: 'Hand Mixer', category: 'Kitchen Appliances', price: 299, condition: 'Used', image: '/assets/handmixer.png' },
  { id: 'k8', title: 'Sandwich Maker', category: 'Kitchen Appliances', price: 399, condition: 'Used', image: '/assets/sandwich.png' },
  { id: 'k9', title: 'Induction Cooktop', category: 'Kitchen Appliances', price: 1499, condition: 'Like New', image: '/assets/induction.png' },
  { id: 'k10', title: 'Portable Gas Stove', category: 'Kitchen Appliances', price: 799, condition: 'Used', image: '/assets/gas-stove.png' },

  // Study Material (10)
  { id: 'b1', title: 'Calculus Textbook', category: 'Study Material', price: 250, condition: 'Used', image: '/assets/textbook-calc.png' },
  { id: 'b2', title: 'Physics Notes Bundle', category: 'Study Material', price: 199, condition: 'Used', image: '/assets/notes-physics.png', discounted: true },
  { id: 'b3', title: 'Chemistry Lab Manual', category: 'Study Material', price: 150, condition: 'Used', image: '/assets/manual-chem.png' },
  { id: 'b4', title: 'Programming Textbook', category: 'Study Material', price: 399, condition: 'Used', image: '/assets/textbook-programming.png' },
  { id: 'b5', title: 'Reference Guide - English', category: 'Study Material', price: 120, condition: 'Used', image: '/assets/textbook-english.png' },
  { id: 'b6', title: 'Exam Question Papers - Bundle', category: 'Study Material', price: 99, condition: 'Used', image: '/assets/papers.png' },
  { id: 'b7', title: 'NOTEBOOKS Pack (10)', category: 'Study Material', price: 250, condition: 'New', image: '/assets/notebooks.png' },
  { id: 'b8', title: 'Sketchbook', category: 'Study Material', price: 180, condition: 'Used', image: '/assets/sketchbook.png' },
  { id: 'b9', title: 'Lab Coat', category: 'Study Material', price: 350, condition: 'Used', image: '/assets/labcoat.png' },
  { id: 'b10', title: 'Drawing Kit', category: 'Study Material', price: 299, condition: 'Used', image: '/assets/drawingkit.png' },

  // Beddings (10)
  { id: 'bd1', title: 'Single Bed Sheet', category: 'Beddings', price: 399, condition: 'New', image: '/assets/sheet.png' },
  { id: 'bd2', title: 'Pillow Set', category: 'Beddings', price: 299, condition: 'New', image: '/assets/pillows.png' },
  { id: 'bd3', title: 'Comforter', category: 'Beddings', price: 899, condition: 'Used', image: '/assets/comforter.png' },
  { id: 'bd4', title: 'Blanket', category: 'Beddings', price: 499, condition: 'Used', image: '/assets/blanket.png' },
  { id: 'bd5', title: 'Mattress Topper', category: 'Beddings', price: 1299, condition: 'Like New', image: '/assets/topper.png' },
  { id: 'bd6', title: 'Bed Runner', category: 'Beddings', price: 199, condition: 'New', image: '/assets/bedrunner.png' },
  { id: 'bd7', title: 'Duvet Cover', category: 'Beddings', price: 599, condition: 'Used', image: '/assets/duvet.png' },
  { id: 'bd8', title: 'Bedsheet Set (2)', category: 'Beddings', price: 799, condition: 'New', image: '/assets/sheet-set.png' },
  { id: 'bd9', title: 'Bolster Cover', category: 'Beddings', price: 149, condition: 'New', image: '/assets/bolster.png' },
  { id: 'bd10', title: 'Mattress Protector', category: 'Beddings', price: 399, condition: 'New', image: '/assets/protector.png' },
];

export const categories = [
  { id: 'c1', name: 'Furniture', image: '/assets/category-furniture.png' },
  { id: 'c2', name: 'Shirts', image: '/assets/category-shirts.png' },
  { id: 'c3', name: 'Pants', image: '/assets/category-pants.png' },
  { id: 'c4', name: 'Jackets', image: '/assets/category-jackets.png' },
  { id: 'c5', name: 'Kitchen Appliances', image: '/assets/category-kitchen.png' },
  { id: 'c6', name: 'Study Material', image: '/assets/category-study.png' },
  { id: 'c7', name: 'Beddings', image: '/assets/category-beddings.png' },
];

export default products;
