import bcrypt from 'bcryptjs';


const data = {

    users: [
        {
            name: 'ThongAdmin',
            email: 'thongadmin@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
            isSeller: true,
            seller: {
                name: 'Thong',
                logo: 'images/Thong.jpg',
                description: 'Thong1',
                rating: 4.5,
                numReviews: 120,
            }
        },
        {
            name: 'ThongUser1',
            email: 'thonguser1@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],

    products: [
        {
            name: 'Thongdepzai',
            category: 'Huynh',
            image: '/images/Thong.jpg',
            price: 1000000000,
            countInStock: 1,
            brand: 'ThongShop',
            rating: 4.5,
            numReviews: 10,
            description: 'BUY NOW. ITS PERFECT!!! ',
        },
        {
            
            name: 'Product name 2',
            category: 'Shirts',
            image: '/images/shirt02.jpg',
            price: 120,
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
            countInStock: 60,
            brand: 'Cantaloupe',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
        },
    ]
}

export default data;