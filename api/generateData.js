const faker = require('faker');
const bcrypt = require('bcryptjs');

const database = { cars: [], users: []};

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("123456", salt);

let quantityProductsOfUser = 0;
let quantityUsers = 1;

faker.locale = 'pt_BR'

for (var i = 1; i<= 128; i++) {

    if (quantityProductsOfUser == 0) {
        quantityUsers++;
        
        database.users.push({
            id: quantityUsers,
            name: faker.name.findName(),
            phone: faker.phone.phoneNumberFormat(),
            city: faker.address.city(2) + " - " + faker.address.stateAbbr(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude(),
            email: faker.internet.email().toLowerCase(),
            password: hash
        });

        quantityProductsOfUser = Math.ceil(Math.random() * 2);
    }

    database.cars.push({
        id: i,
        name: faker.vehicle.vehicle(),
        year: faker.random.number({ min: 1997, max: 2020}),
        manufacturer: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        type: faker.vehicle.type(),
        fuel: faker.vehicle.fuel(),
        color: faker.internet.color(),
        price: faker.commerce.price(80000),
        description: faker.commerce.productDescription(),
        images: new Array(),
        userId: quantityUsers,
    }); 

    quantityPhotoOfCar = Math.ceil(Math.random() * 4);
    for (let j = 0; j < quantityProductsOfUser; j++) {
        database.cars[i-1].images.push({
            path: "https://source.unsplash.com/550x350/?"+faker.vehicle.model()
        });
    }

    quantityProductsOfUser--;
}

console.log(JSON.stringify(database));