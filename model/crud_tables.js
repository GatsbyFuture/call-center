// barcha crudlar shu fileda...
const { knex } = require("../connect_db/connect_knex");
const { form_phone_number } = require('../tools/tools')
// userlarni datasini to'ldirish uchun...
const add_user = async (data) => {
    try {
        data["phone"] = await form_phone_number(data["phone"]);
        // console.log(data);
        await knex('tb_users').insert({
            name: data["name"],
            lastname: data["lastname"],
            middle_name: data["middlename"],
            phone_number: data["phone"],
            gender: data["gender"],
            login: data["login"],
            password: data["password"],
            rol: data["check"]
        });
    } catch (err) {
        console.log(err);
    }
}
// sellerlarni datalarini to'ldirish uchun...
const add_seller = async (data) => {
    try {
        // console.log(data);
        data["phone"] = await form_phone_number(data["phone"]);
        await knex('tb_seller').insert({
            name: data["name"],
            lastname: data["lastname"],
            middle_name: data["middlename"],
            phone_number: data["phone"],
            which_story: data["whereStory"],
            gender: data["gender"],
        });
    } catch (err) {
        console.log(err);
    }
}
// driverni datasini to'ldirish uchun...
const add_driver = async (data) => {
    try {
        data["phone"] = await form_phone_number(data["phone"]);
        // console.log(data);
        await knex('tb_driver').insert({
            name: data["name"],
            lastname: data["lastname"],
            middle_name: data["middlename"],
            car_number: data["carnumber"],
            phone_number: data["phone"],
            gender: data["gender"],
        });
    } catch (err) {
        console.log(err);
    }
}
// customer datasini joylash uchun...
const add_customer = async (data) => {
    try {
        // console.log(data);
        await knex('tb_customer').insert({
            seller_id: '13',
            name: "Danil",
            lastname: 'Karamov',
            middle_name: 'Rustamovich',
            phone_number: '+998940040501',
            telegram_id: "123198745",
            gender: 1
        });
    } catch (err) {
        console.log(err);
    }
}
// order datasini joylash uchun...
const add_order = async (data) => {
    try {
        // console.log(data);
        await knex('tb_customer').insert({
            seller_id: '13',
            customer_id: "27",
            product_name: "Noutbook",
            shipment_payment: 1,
            product_payment: 1,
            latitude: '41.125473',
            longitude: '65.125475'
        });
    } catch (err) {
        console.log(err);
    }
}
// -----------++++++++++-------------
// users/driver/seller datasini olish
const get_staves = async (id) => {
    try {
        switch (id) {
            case 1: return knex.select('id', 'name', 'lastname', 'middle_name', 'phone_number', 'which_story')
                .from('tb_seller').then(data => {
                    // console.log(data);
                    return data;
                });
            case 2: return knex.select('id', 'name', 'lastname', 'middle_name', 'car_number', 'phone_number')
                .from('tb_driver').then(data => {
                    // console.log(data);
                    return data;
                });
            case 3: return knex.select('id', 'name', 'rol', 'status', 'phone_number', 'created_time')
                .from('tb_users').then(data => {
                    // console.log(data);
                    return data;
                });
            default: break;
        }
    } catch (err) {
        console.log(err);
    }
}
// ro'lni o'zgartirish uchun...
const update_rol = async (id, rol) => {
    try {
        // console.log("id :" + id + "/" + "rol :" + rol);
        return await knex('tb_users')
            .where({
                id: id
            })
            .update({
                rol: rol,
            }).then(resutl => {
                return resutl;
            });
    } catch (err) {
        console.log(err);
    }
}
// rolni delete qilib tashlash
const delete_rol = async (id) => {
    try {
        // console.log("id :" + id + "/" + "rol :" + rol);
        return await knex('tb_users')
            .where({
                id: id
            })
            .update({
                status: 0
            }).then(resutl => {
                return resutl;
            });
    } catch (err) {
        console.log(err);
    }
}


// seller datasini tortish va customer va ro'yxatni bir biriga bog'lash...
const get_seller_id_name = async () => {
    try {
        return await knex.select('id', 'name', 'lastname')
            .from('tb_seller').then(data => {
                // console.log(data);
                return data;
            })
    } catch (err) {
        console.log(err);
    }
}
// customer va product datasini joylash
const save_cp_data = async (data) => {
    try {
        // console.log(data);
        data["phone"] = await form_phone_number(data["phone"]);
        let customer_id = await knex('tb_customer').insert({
            seller_id: data["seller_id"],
            name: data["name"],
            lastname: data["last_name"],
            middle_name: data["middle_name"],
            phone_number: data["phone"],
            age: data["age"],
            gender: data["gender"],
        }).select("id").then(data => {
            return data;
        });
        // console.log(customer_id[0]);
        await knex('tb_order').insert({
            seller_id: data["seller_id"],
            customer_id: customer_id,
            product_name: data["product_name"],
            shipment_payment: data["shipment_payment"],
            shipment_pay: parseInt(data["shipment_payment_amount"] == "" ? 0 : data["shipment_payment_amount"]),
            product_payment: data["product_payment"],
            product_pay: parseInt(data["product_payment_amount"] == "" ? 0 : data["product_payment_amount"]),
            all_payment: parseInt(data["product_payment_amount"] == "" ? 0 : data["product_payment_amount"]) + parseInt(data["shipment_payment_amount"] == "" ? 0 : data["shipment_payment_amount"])
        })
    } catch (err) {
        console.log(err);
    }
}
// protsess uchun crud jaroyoni hududi...
const get_data_for_sms = async () => {
    try {
        return await knex.raw(`SELECT tb_order.id,
        tb_seller.name,
        tb_seller.lastname,
        tb_customer.name AS customer_name,
        tb_customer.phone_number,
        tb_order.shipment_payment,
        tb_order.product_payment,
        tb_order.latitude,
        tb_order.longitude,
        tb_customer.sended_sms,
        tb_customer.telegram_id
                FROM tb_order
                LEFT JOIN tb_customer ON tb_customer.id = tb_order.customer_id
                RIGHT JOIN tb_seller ON tb_seller.id = tb_order.seller_id
                WHERE tb_order.status = 1
                `)
            .then(data => {
                // console.log(data);
                return data;
            })
    } catch (err) {
        console.log(err);
    }
}
// id bo'yicha user datasini olish..
const send_id_for_sms = async (id) => {
    try {
        await knex('tb_customer')
            .where({
                id: id
            })
            .update({
                sended_sms: 1
            });
        return await knex("tb_customer")
            .select("phone_number")
            .where({ id: id })
            .then(data => {
                return data;
            });
    } catch (error) {
        console.log(error);
    }
}

// driver nomini olib berish select uchun...
const get_data_driver_for_select = async () => {
    try {
        return await knex("tb_driver")
            .select("id", "name", "lastname")
            .where({ busy: 0 })
            .then(data => {
                return data;
            });
    } catch (err) {
        console.log(err);
    }
}

// productni id bo'yicha locatsiya tashlanganlarini olib berish...
const get_id_name_product = async () => {
    try {
        return await knex.raw('select id, product_name from tb_order where latitude is true and status = 1')
            .then(function (data) { return data[0] });

        // return await knex('tb_order')
        //     .where({
        //         latitude: true
        //     })
        //     .select("id", "product_name")
        //     .then(data => {
        //         return data;
        //     });
    } catch (error) {
        console.log(error);
    }
}
// locatsiyasi bor va registratorchi tomonidan tanlanganlarini tortish product id bo'yicha...
const get_me_locations = async (id) => {
    try {
        // return await knex.raw('select id, latitude, longitude from tb_order where latitude is true')
        //     .then(function (data) {
        //         return data[0]
        //     });
        return await knex("tb_order")
            .where({ id: id })
            .select("id", "latitude", 'longitude')
            .then(data => {
                return data[0];
            })
    } catch (error) {
        console.log(error);
    }
}
// lokatsiyani product id isi bo'yicha olib chiqish...
const send_optimal_location = async (id_pro, which_dri) => {
    try {
        await knex('tb_order')
            .where({ id: id_pro })
            .update({ which_driver: which_dri, status: 0, status_of_deliver: 1 });

        return await knex('tb_order')
            .where({ id: id_pro })
            .select("latitude", "longitude")
            .then(function (data) {
                return data[0];
            });
    } catch (error) {
        console.log(error);
    }
}
// driver chat id sini olib olish...
const get_chat_id_of_driver = async (id) => {
    try {
        return await knex('tb_driver')
            .where({ id: id })
            .select("telegram_id")
            .then(function (data) {
                return data[0];
            });
    } catch (error) {
        console.log(error);
    }
}

// nechtalik url kerakliga qarab tortib chiqish...
const get_need_url = async (id_of_url) => {
    try {
        return await knex('tb_route')
            .where({ id: id_of_url })
            .select("url_silka", "keywords")
            .then(function (data) {
                return data[0];
            });
    } catch (error) {
        console.log(error);
    }
}
// optimal koordinatali urlni driverga bog'lab joylash bazaga...
const save_optimal_url = async (id_for_dr, chat_id_of_dr, optimal_route, url) => {
    try {
        await knex('tb_optimal_route')
            .insert({ driver_id: id_for_dr, chat_id_of_driver: chat_id_of_dr, optimal_sort: optimal_route, url_silka: url })
        await knex('tb_driver')
            .where({
                id: id_for_dr
            })
            .update({
                busy: 1
            });
        return "ok";
    } catch (error) {
        console.log(error);
    }
}
// ****************
// driverlarni datasini tortish va taqdim etish selectda tanlash uchun...
const get_driver_id_name = async () => {
    try {
        return await knex.select('id', 'name', 'lastname')
            .from('tb_driver').then(data => {
                // console.log(data);
                return data;
            })
    } catch (err) {
        console.log(err);
    }
}
// product datalarini olish...
const get_product_data = async (driver_id) => {
    try {
        // console.log(driver_id);
        return await knex.raw(`SELECT 
        tb_order.id,
        tb_seller.id AS seller_id,
        tb_customer.name AS customer_name,
        tb_customer.phone_number,
        tb_order.product_name,
        tb_order.shipment_payment,
        tb_order.product_payment,
        tb_order.status_of_deliver 
                FROM tb_order
                LEFT JOIN tb_customer ON tb_customer.id = tb_order.customer_id
                RIGHT JOIN tb_seller ON tb_seller.id = tb_order.seller_id
                WHERE tb_order.status = 0 AND tb_order.which_driver = ?
                `, [driver_id]
        ).then(data => {
            // console.log(data);
            return data;
        })
    } catch (err) {
        console.log(err);
    }
}





module.exports = {
    add_user,
    add_seller,
    add_driver,
    add_customer,
    add_order,
    // get data
    get_staves,
    // update rol
    update_rol,
    // delete rol
    delete_rol,
    // get id and name of seller
    get_seller_id_name,
    // save data pc
    save_cp_data,
    // protsess jarayoni uchun hudud
    get_data_for_sms,
    // id bo'yicha user phone nomerini olish..
    send_id_for_sms,
    // driverni tanlashga chiqarish...
    get_data_driver_for_select,
    // productni location uchun jadvalga malumotlarni tortish...
    get_id_name_product,
    // productni location bilan id sini qaytarish...
    get_me_locations,
    // locaksiyani koortinatalarini olish va optimal koordinata bilan tekshirish...
    send_optimal_location,
    // id bo'yicha kerakli urlni tortib chiqish...
    get_need_url,
    // driver chat id sini olish
    get_chat_id_of_driver,
    // optimal koordinatali urlni driverga bog'lab bazaga joylash..
    save_optimal_url,
    // driverni id va ismi bilan tortib olish uchun...
    get_driver_id_name,
    // productni kerakli ustunlarini olish...
    get_product_data
}