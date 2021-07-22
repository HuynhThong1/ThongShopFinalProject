import bcrypt from 'bcryptjs';


const data = {

    users: [
        {
            name: 'ThongAdmin',
            email: 'thongadmin@gmail.com',
            password: bcrypt.hashSync('1234', 8)
        },
        {
            name: 'ThongUser1',
            email: 'thonguser1@gmail.com',
            password: bcrypt.hashSync('1234', 8)
        },
    ],

    products: [
        {
            
            name: 'Product name 1',
            category: 'Shirts',
            image: '/images/shirt01.jpg',
            price: 120,
            size: 'S',
            countInStock: 10,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 2',
            category: 'Shirts',
            image: '/images/shirt02.jpg',
            price: 120,
            size: 'M',
            countInStock: 0,
            brand: 'Cantaloupe',
            rating: 4,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 3',
            category: 'Shirts',
            image: '/images/shirt03.jpg',
            price: 120,
            size: 'S',
            countInStock: 30,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 4',
            category: 'Shirts',
            image: '/images/shirt04.jpg',
            price: 120,
            size: 'S',
            countInStock: 40,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 5',
            category: 'Shirts',
            image: '/images/shirt05.jpg',
            price: 120,
            size: 'S',
            countInStock: 50,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 6',
            category: 'Shirts',
            image: '/images/shirt06.jpg',
            price: 120,
            size: 'S',
            countInStock: 60,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
    ]
}

export default data;