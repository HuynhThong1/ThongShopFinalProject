import bcrypt from 'bcryptjs';


const data = {

    users: [
        {
            name: 'ThongAdmin',
            email: 'thongadmin@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Store 01',
            email: 'store01@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: true,
            seller: {
                name: 'Store 1',
                logo: 'images/carouselImg01.jpg',
                description: 'Ho Chi Minh',
                rating: 5.0,
                numReviews: 19,
            }
        },
        {
            name: 'Store 02',
            email: 'store02@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: true,
            seller: {
                name: 'Store 2',
                logo: 'images/carouselImg02.jpg',
                description: 'Ha Noi',
                rating: 5.0,
                numReviews: 19,
            }
        },
        {
            name: 'Store 03',
            email: 'store03@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
            isSeller: true,
            seller: {
                name: 'Store 3',
                logo: 'images/carouselImg03.jpg',
                description: 'Da Nang',
                rating: 5.0,
                numReviews: 19,
            }
        },
        {
            name: 'ThongUser1',
            email: 'thong1@gmail.com',
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
            rating: 0,
            numReviews: 0,
            description: 'BUY NOW. ITS PERFECT!!! ',
        },
        {
            
            name: 'Product name 2',
            category: 'Shirts',
            image: '/images/shirt02.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Cantaloupe',
            rating: 0,
            numReviews: 0,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 3',
            category: 'Shirts',
            image: '/images/shirt03.jpg',
            price: 120,
            countInStock: 30,
            brand: 'Cantaloupe',
            rating: 0,
            numReviews: 0,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 4',
            category: 'Shirts',
            image: '/images/shirt04.jpg',
            price: 120,
            countInStock: 40,
            brand: 'Cantaloupe',
            rating: 0,
            numReviews: 0,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 5',
            category: 'Shirts',
            image: '/images/shirt05.jpg',
            price: 120,
            countInStock: 50,
            brand: 'Cantaloupe',
            rating: 0,
            numReviews: 0,
            description: 'High quality product',
        },
        {
            
            name: 'Product name 6',
            category: 'Shirts',
            image: '/images/shirt06.jpg',
            price: 120,
            countInStock: 60,
            brand: 'Cantaloupe',
            rating: 0,
            numReviews: 0,
            description: 'High quality product',
        },
    ]
}

export default data;