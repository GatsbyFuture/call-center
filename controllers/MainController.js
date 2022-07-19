// kutubxonalarni chaqirish...
var express = require('express');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({ extended: false });
var validator = require('express-validator');
let axios = require("axios").default;

let { add_user, add_seller, add_driver,
    get_staves, update_rol, delete_rol,
    get_seller_id_name, save_cp_data,
    get_data_for_sms, send_id_for_sms,
    get_id_name_product, get_me_locations,
    get_data_driver_for_select, send_optimal_location,
    get_need_url, get_chat_id_of_driver,
    save_optimal_url, get_driver_id_name,
    get_product_data } = require('../model/crud_tables');
const { parse } = require('path');

class main_controller_data {
    // main page
    async mainPage(req, res) {
        res.locals = { title: 'Create product' };
        res.render('Ui/ui-tabs-accordions');
    }
    // open admin form
    async addAdmin(req, res) {
        res.locals = { title: 'Add admin' };
        res.render('Ui/ui-form-admin');
    }
    // open seller form
    async addSeller(req, res) {
        res.locals = { title: 'Add Seller' };
        res.render('Ui/ui-form-seller');
    }
    // open driver form
    async addDriver(req, res) {
        res.locals = { title: 'Add Driver' };
        res.render('Ui/ui-form-driver');
    }
    // -------------------------
    // all save data
    async saveUserData(req, res) {
        try {
            // console.log(req.body);
            // res.json({ result: "ok" });
            await add_user(req.body);
        } catch (err) {
            console.log(err);
            res.json({ result: "err" });
        }
    }
    async saveSellerData(req, res) {
        try {
            await add_seller(req.body);
        } catch (err) {
            console.log(err);
            res.json({ result: "err" });
        }
    }
    async saveDriverData(req, res) {
        try {
            await add_driver(req.body);
        } catch (err) {
            console.log(err);
            res.json({ result: "err" });
        }
    }
    // rol qismi uchun page yuklash
    async showRol(req, res) {
        res.locals = { title: 'show users rol' };
        res.render('Ecommerce/ecommerce-rol-customers');
    }
    // -------------------------
    // USER / DRIVER / SELLER malumotlarini tortish...
    async getSellerData(req, res) {
        try {
            let data = await get_staves(1);
            console.log("controller");
            console.log(data);
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    async getDriverData(req, res) {
        try {
            let data = await get_staves(2);
            console.log("driver");
            console.log(data);
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // rol qismi uchun datani get qilish..
    async getUserData(req, res) {
        try {
            let data = await get_staves(3);
            // console.log("rol");
            // console.log(data);
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // rolni update qilib o'zgartirish...
    async updateUserRol(req, res) {
        try {
            // console.log(req.body);
            let result = await update_rol(req.body["id"], parseInt(req.body["rol"]));
            res.json(JSON.stringify({ data: result }));
        } catch (err) {
            console.log(err);
        }
    }
    // rolni delete qilish...
    async deleteUserRol(req, res) {
        try {
            // console.log(req.body);
            let result = await delete_rol(req.body["id"]);
            res.json(JSON.stringify({ data: result }));
        } catch (err) {
            console.log(err);
        }
    }

    // seller datalarini olish uchun controller...
    async getSellerIdName(req, res) {
        try {
            let data = await get_seller_id_name();
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // customer va productni datasini joylash...
    async saveCPData(req, res) {
        try {
            await save_cp_data(req.body);
        } catch (err) {
            console.log(err);
            res.json({ result: "err" });
        }
    }





    // -----+++++++-----



    // chat page...
    async appsChat(req, res) {
        res.locals = { title: 'Chat' };
        res.render('Chat/apps-chat');
    }
    // ecommerce sendSmsToCustomer...
    async sendSmsToCustomer(req, res) {
        res.locals = { title: 'Send sms to customer' };
        res.render('Ecommerce/send-sms-to-customer');
    }
    // get data for sms...
    async getDataForSms(req, res) {
        try {
            let data = await get_data_for_sms();
            // console.log(data[0]);
            let sort_data = [];
            for (const key in data[0]) {
                if (data[0][key]["latitude"]) {
                    sort_data.push(data[0][key]);
                } else {
                    sort_data.unshift(data[0][key]);
                }
            }
            // console.log(sort_data);
            res.json(JSON.stringify({ ok: "ok", result: sort_data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // get data user for send sms 
    async sendIdForSms(req, res) {
        try {
            // console.log(req.query["id"]);
            let data = await send_id_for_sms(req.query["id"]);
            // console.log("998" + data[0]["phone_number"]);
            let phone = data[0]["phone_number"]
                .replace("+", "")
                .replace("(", "")
                .replace(")", "")
                .replace(/-/g, "");
            console.log(data[0]["phone_number"]);
            await res.json(JSON.stringify({ ok: "ok", result: phone }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }

    // driverni tanlab productga biriktirish uchun...
    async getDataDriverForSelect(req, res) {
        try {
            let data = await get_data_driver_for_select();
            // console.log(data);
            // console.log(sort_data);
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }



    // checkbox bilan belgilab olish uchun datalarni olish
    async getIdNameProduct(req, res) {
        try {
            let data = await get_id_name_product();
            // console.log(data);
            // console.log(sort_data);
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // locatsiyani routeXL ga tayyorlab jo'naish...
    async getMeLocations(req, res) {
        try {
            // locations = [
            //     { 'name': '1', 'lat': 41.3171711, 'lng': 69.2593169 },
            //     { 'name': '2', 'lat': 41.3107405, 'lng': 69.235692 },
            //     { 'name': '3', 'lat': 41.3300144, 'lng': 69.2800665 },
            //     { 'name': '4', 'lat': 41.3251804, 'lng': 69.3379163 },
            //     { 'name': '5', 'lat': 41.3255223, 'lng': 69.335163, 'restrictions': { 'ready': 15, 'due': 60 } },
            //     { 'name': '6', 'lat': 41.3171711, 'lng': 69.2593169 }
            // ]
            let data = [];
            let ids = req.query["select"].split(",");
            for (let i = 0; i < ids.length; i++) {
                data.push(await get_me_locations(parseInt(ids[i])));
            }
            data.unshift({ id: 20020912, latitude: '41.299061', longitude: '69.207631' });
            data.push({ id: 20020912, latitude: '41.299061', longitude: '69.207631' });
            // console.log(data);
            // // let data = await get_me_locations();
            // console.log(data);
            // // console.log(data[0]["id"]);
            let locations_pro = [];
            for (let i = 0; i < data.length; i++) {
                if (i < data.length - 2) {
                    locations_pro.push({ 'name': `${data[i]["id"]}`, 'lat': parseFloat(data[i]["latitude"]), 'lng': parseFloat(data[i]["longitude"]) });
                } else if (i == data.length - 2) {
                    locations_pro.push({
                        'name': `${data[i]["id"]}`, 'lat': parseFloat(data[i]["latitude"]), 'lng': parseFloat(data[i]["longitude"]),
                        'restrictions': { 'ready': 15, 'due': 60 }
                    });
                    locations_pro.push({ 'name': `${data[i + 1]["id"]}`, 'lat': parseFloat(data[0]["latitude"]), 'lng': parseFloat(data[0]["longitude"]) });
                }
            }
            console.log(locations_pro);
            res.json(JSON.stringify({ ok: "ok", result: locations_pro }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // bazadagi lokatsani olish va uni silka ko'rinishiga olib kelish va silkani botga jo'natish...
    async sendOptimalLocation(req, res) {
        try {
            // kelgan bodydan arrayni olib olamiz o'zgaruvchiga..
            let array_of_body = req.body;
            let sort_locations = [];
            // lokatsiyani sorti bo'yicha arrayga o'zlashtirib olamiz bazadan...
            for (const key of array_of_body["optimal_loc"]) {
                let data = await send_optimal_location(key, array_of_body["id_dr"]);
                sort_locations.push(data["latitude"]);
                sort_locations.push(data["longitude"]);
                // console.log(data);
            }
            // console.log(sort_locations);
            // urlni tortamiz va undagi koordinatalarni joylashtiramiz...
            console.log(array_of_body["optimal_loc"]);
            let get_url = await get_need_url(array_of_body["optimal_loc"].length);
            let array_of_keywords = get_url["keywords"].split("/");
            let ready_url_to_send = get_url["url_silka"];
            for (let i = 0; i < sort_locations.length; i++) {
                ready_url_to_send = ready_url_to_send.replace(array_of_keywords[i], sort_locations[i]);
            }
            // driverni id si yordamida chat idsini olib olish...
            let chat_id = await get_chat_id_of_driver(array_of_body["id_dr"]);
            console.log(ready_url_to_send);
            // bazaga urlni saqlab qo'yish qaysi driverga tegishli bo'lsa
            if (chat_id["telegram_id"]) {
                let optimal_route = array_of_body["optimal_loc"].join();
                let result = await save_optimal_url(array_of_body["id_dr"], chat_id["telegram_id"], optimal_route, ready_url_to_send);
                console.log(result);
                // axios bilan telegram botdagi tanlangan drayverga jo'natamiz..
                await axios.get(`https://api.telegram.org/bot5502025968:AAGikSgMRi6ZbSoTMxnzi78B6t8nD7G2iTk/sendMessage?chat_id=${chat_id["telegram_id"]}&text="Assalomu alaykum sizga zakaz biriktirildi qarab tekshirib ko'ring!"`)
                    .then(res => { })
                    .catch((err) => {
                        console.log(err);
                    })
            }

            // console.log(sort_data);
            res.json(JSON.stringify({ ok: "ok", result: "sms jo'natildi" }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // driverlarni yetkazib berdi bermaganligini proccessni ko'rsatish uchun...
    async sortAddressCustomer(req, res) {
        res.locals = { title: 'Sort address customer' };
        res.render('Ecommerce/sort-address-customer');
    }
    // *********************
    // driverlarni id va ismi bo'yicha olish uchun...
    async getDriverIdName(req, res) {
        try {
            let data = await get_driver_id_name();
            res.json(JSON.stringify({ ok: "ok", result: data }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }
    // product malumotlarini statistika qilib chiqarish...
    async getProductData(req, res) {
        try {
            console.log(req.query["seller_id"]);
            let data = await get_product_data(parseInt(req.query["seller_id"]));
            // console.log("driver");
            // console.log(data);
            res.json(JSON.stringify({ ok: "ok", result: data[0] }));
        } catch (err) {
            console.log(err);
            res.json(JSON.stringify({ ok: "err" }));
        }
    }






    // ecommerce Customer...
    async showProccessOurier(req, res) {
        res.locals = { title: 'Show proccess courier' };
        res.render('Ecommerce/show-proccess-courier');
    }
    async viewDailyStatistic(req, res) {
        res.locals = { title: 'View daily statistic' };
        res.render('Ecommerce/view-daily-statistic');
    }

    //
    async tablesDatatable(req, res) {
        res.locals = { title: 'Data Tables' };
        res.render('Tables/tables-datatable');
    }

}

module.exports = new main_controller_data();