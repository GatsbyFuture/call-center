// knexda yozilgan kod
const { knex } = require('../connect_db/connect_knex');
// create users table...
const create_users = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_users");
        console.log("creating tb_users");
        await knex.schema.createTable('tb_users', function (t) {
            t.increments('id').primary();
            t.string('name', 50).notNullable();
            t.string('lastname', 50).notNullable();
            t.string('middle_name', 50).defaultTo(null);
            t.string('phone_number', 20).defaultTo(null);
            t.tinyint('gender').defaultTo(1);
            t.string('login', 50).defaultTo(null);
            t.string('password', 50).defaultTo(null);
            t.tinyint('rol').defaultTo(0);
            t.tinyint('status').defaultTo(1);
            t.timestamp('update_time').defaultTo(knex.fn.now());
            t.timestamp('created_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// create seller table...
const create_seller = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_seller");
        console.log("creating tb_seller");
        await knex.schema.createTable('tb_seller', function (t) {
            t.increments('id').primary();
            t.string('name', 50).notNullable();
            t.string('lastname', 50).notNullable();
            t.string('middle_name', 50).defaultTo("");
            t.string('phone_number', 20).notNullable();
            t.string('which_story').notNullable();
            t.integer("telegram_id", 11).defaultTo(null);
            t.tinyint('gender').defaultTo(1);
            t.tinyint('status').defaultTo(1);
            t.timestamp('update_time').defaultTo(knex.fn.now());
            t.timestamp('created_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// create driver table...
const create_driver = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_driver");
        console.log("creating tb_driver");
        await knex.schema.createTable('tb_driver', function (t) {
            t.increments('id').primary();
            t.string('name', 50).notNullable();
            t.string('lastname', 50).notNullable();
            t.string('middle_name', 50).defaultTo(null);
            t.string('car_number', 50).defaultTo(null);
            t.string('phone_number', 20).notNullable();
            t.integer("telegram_id", 11).defaultTo(null);
            t.tinyint('busy').defaultTo(0);
            t.tinyint('gender').defaultTo(1);
            t.tinyint('status').defaultTo(1);
            t.timestamp('update_time').defaultTo(knex.fn.now());
            t.timestamp('created_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// create customer table...
const create_customer = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_customer");
        console.log("creating tb_customer");
        await knex.schema.createTable('tb_customer', function (t) {
            t.increments('id').primary();
            t.integer('seller_id').defaultTo(null);
            t.string('name', 50).notNullable();
            t.string('lastname', 50).defaultTo(null);
            t.string('middle_name', 50).defaultTo(null);
            t.string('phone_number', 20).notNullable();
            t.integer("telegram_number", 11).defaultTo(null);
            t.tinyint('age').defaultTo(0);
            t.integer("telegram_id", 11).defaultTo(null);
            t.tinyint('sended_sms').defaultTo(0);
            t.tinyint('gender').defaultTo(1);
            t.tinyint('status').defaultTo(1);
            t.timestamp('update_time').defaultTo(knex.fn.now());
            t.timestamp('created_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// create order table...
const create_order = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_order");
        console.log("creating tb_order");
        await knex.schema.createTable('tb_order', function (t) {
            t.increments('id').primary();
            t.integer('seller_id').defaultTo(null);
            t.integer('customer_id').defaultTo(null);
            t.string('product_name').notNullable();
            t.tinyint('which_driver').defaultTo(null);
            t.tinyint('shipment_payment').defaultTo(0);
            t.integer('shipment_pay').defaultTo(0);
            t.tinyint('product_payment').defaultTo(0);
            t.integer('product_pay').defaultTo(0);
            t.integer('all_payment').defaultTo(0);
            t.string('latitude', 30).defaultTo(null);
            t.string('longitude', 30).defaultTo(null);
            t.tinyint('status').defaultTo(1);
            // statis of deliver dagi 0 holat default/ 1 biror haydovchiga yuklandi/ 2 yetkazib berildi/ 3 yetkazib berishda muammo
            t.tinyint('status_of_deliver').defaultTo(0);
            t.timestamp('started_time').defaultTo(knex.fn.now());
            t.timestamp('finished_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// lakatsiya uchun silkalar manbayi silkalar manzillarni soniga qarab bo'ladi  min = 5 --> max = 6
const create_for_url_koordinata = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_route");
        console.log("creating tb_route");
        await knex.schema.createTable('tb_route', function (t) {
            // t.increments('id').primary();
            t.integer('id').notNullable();
            t.text('url_silka').notNullable();
            t.text('keywords').notNullable();
            t.tinyint('status').defaultTo(1);
            t.timestamp('started_time').defaultTo(knex.fn.now());
            t.timestamp('finished_time').defaultTo(knex.fn.now());
        })
        console.log("creating is done....");
    } catch (err) {
        console.log(err);
    }
}
// lakatsiya tablitsasini qiymat bilan to'ldirish...
const fill_for_url_koordinata = async () => {
    try {
        console.log("filling tb_route...");
        await knex('tb_route')
            .insert([
                {
                    id: '5', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}"
                },
                {
                    id: '6', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}"
                },
                {
                    id: '7', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}"
                },
                {
                    id: '8', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}"
                },
                {
                    id: '9', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}"
                },
                {
                    id: '10', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}"
                },
                {
                    id: '11', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}"
                },
                {
                    id: '12', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}"
                },
                {
                    id: '13', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}"
                },
                {
                    id: '14', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~{lat14}%2C{lng14}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}/{lat14}/{lng14}"
                },
                {
                    id: '15', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~{lat14}%2C{lng14}~{lat15}%2C{lng15}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}/{lat14}/{lng14}/{lat15}/{lng15}"
                },
                {
                    id: '16', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~{lat14}%2C{lng14}~{lat15}%2C{lng15}~{lat16}%2C{lng16}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}/{lat14}/{lng14}/{lat15}/{lng15}/{lat16}/{lng16}"
                },
                {
                    id: '17', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~{lat14}%2C{lng14}~{lat15}%2C{lng15}~{lat16}%2C{lng16}~{lat17}%2C{lng17}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}/{lat14}/{lng14}/{lat15}/{lng15}/{lat16}/{lng16}/{lat17}/{lng17}"
                },
                {
                    id: '18', url_silka: "https://yandex.uz/maps/10335/tashkent/?mode=routes&rtext=41.299061%2C69.207631~{lat1}%2C{lng1}~{lat2}%2C{lng2}~{lat3}%2C{lng3}~{lat4}%2C{lng4}~{lat5}%2C{lng5}~{lat6}%2C{lng6}~{lat7}%2C{lng7}~{lat8}%2C{lng8}~{lat9}%2C{lng9}~{lat10}%2C{lng10}~{lat11}%2C{lng11}~{lat12}%2C{lng12}~{lat13}%2C{lng13}~{lat14}%2C{lng14}~{lat15}%2C{lng15}~{lat16}%2C{lng16}~{lat17}%2C{lng17}~{lat18}%2C{lng18}~41.299061%2C69.207631&rtt=auto&ruri=~~~~&z=15.18",
                    keywords: "{lat1}/{lng1}/{lat2}/{lng2}/{lat3}/{lng3}/{lat4}/{lng4}/{lat5}/{lng5}/{lat6}/{lng6}/{lat7}/{lng7}/{lat8}/{lng8}/{lat9}/{lng9}/{lat10}/{lng10}/{lat11}/{lng11}/{lat12}/{lng12}/{lat13}/{lng13}/{lat14}/{lng14}/{lat15}/{lng15}/{lat16}/{lng16}/{lat17}/{lng17}/{lat18}/{lng18}"
                },
            ])
        console.log("fill is done....");
    } catch (err) {
        console.log(err);
    }
}
// tayyor urlni driverga berish uchun joylab qo'yish...
const create_for_optimal_url_koordinata = async () => {
    try {
        await knex.raw("DROP TABLE IF EXISTS tb_optimal_route");
        console.log("creating tb_optimal_route");
        await knex.schema.createTable('tb_optimal_route', function (t) {
            t.increments('id').primary();
            t.integer('chat_id_of_driver').notNullable();
            t.integer('driver_id').defaultTo(null);
            t.string('optimal_sort', 250).notNullable();
            t.text('url_silka').notNullable();
            t.tinyint('status').defaultTo(1);
            t.timestamp('started_time').defaultTo(knex.fn.now());
            t.timestamp('finished_time').defaultTo(knex.fn.now());
        })
        console.log("creating is tb_optimal_route done....");
    } catch (err) {
        console.log(err);
    }
}



// o'zini o'zi chaqiruvchi fucntion chaqiramiz...
(async function () {
    // await create_users();
    // await create_seller();
    // await create_driver();
    // await create_customer();
    // await create_order();
    // koordinata url...
    // await create_for_url_koordinata();
    // koortinatani to'ldirish uchun...
    // await fill_for_url_koordinata();
    // tayyor optimal urlni driverga biriktirib joylash...
    await create_for_optimal_url_koordinata();

}());
