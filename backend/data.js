import bcrypt from 'bcryptjs'
const data = {
  users: [
    {
      name: 'Molk',
      email: 'admin@elboutik.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'jane@test.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Bols Feed Me Kitty avec couvercles',
      slug: 'bols-feed-me-kitty-avec-couvercles',
      category: 'Articles de maison',
      image: '/images/img1.jpg', //679px x 829px
      price: 54,
      countInStock: 6,
      rating: 4.5,
      numReviews: 10,
      description: 'En porcelaine avec couvercles assortis',
    },
    {
      // _id: '2',
      name: 'Ensemble de sous-verres My Purr-fect',
      slug: 'ensemble-de-sous-verres-my-purr-fect',
      category: 'Articles de maison',
      image: '/images/img2.jpg',
      price: 75.81,
      countInStock: 10,
      rating: 4.1,
      numReviews: 3,
      description: 'Laissez les adorables chatons vous saluer dès le matin',
    },
    {
      // _id: '3',
      name: 'Pawsitively Tasse en Céramique Patte de Chat 250ML',
      slug: 'pawsitively-tasse-en-céramique-patte-de-chat-250ML',
      category: 'Articles de maison',
      image: '/images/img3.jpg',
      price: 82.99,
      countInStock: 10,
      rating: 3.7,
      numReviews: 12,
      description: 'Cadeau parfait pour les amoureux des chats',
    },
    {
      // _id: '4',
      name: 'Cat & Rose Bucket Bag',
      slug: 'cat-&-rose-bucket-bags',
      category: 'Sacs à main',
      image: '/images/img4.jpg',
      price: 64,
      countInStock: 0,
      rating: 4.7,
      numReviews: 19,
      description: "Style sac seau avec beaucoup d'espace",
    },
  ],
};
export default data;
