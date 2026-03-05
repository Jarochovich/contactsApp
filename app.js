const express = require("express");
const hbs = require("hbs");
const expressHbs = require("express-handlebars");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
const urlencodedParser = express.urlencoded({extended: false});
const dataFile = fs.readFileSync(process.env.PATH_DATA, 'utf-8');

let data = JSON.parse(dataFile);
console.log(data);


// SETTINGS HANDLEBARS
app.use(express.static(path.join(__dirname, "public")))

app.engine("hbs", expressHbs.engine(
{
        layoutsDir: 'views/layout',
        defaultLayout: 'layout',
        extname: 'hbs',
        helpers: {
        linkRefuse: function(ref, text) {
            return new hbs.SafeString(`<a class="ref" href="${ref}">
                <button class="btn btn-cancel" type="button">${text}</button>
            </a>`);
        },
    }
}
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + `/views/partial`);

// HELPERS
// hbs.registerHelper("getName", () => {
//    fetch(`/Update?name=${this.name}?phone=${this.phone}`)
//    .then(response => response.json());
// });

// hbs.registerHelper("linkRefuse", function (ref, text) {
//     return new hbs.SafeString(`<a class="ref" href="${ref}">${text}</a>`)
// });

// METHODS
app.get("/", (req, res) => {
    res.render("phone", {
        title: 'Главная',
        data: data
    });
});

app.get("/Add",  (req, res) => {
    res.render("addPhone", {
        title: 'Добавление номера',
        data
    });
});

app.post("/Add", urlencodedParser, (req, res) => {

    console.log(`Пришли данные: ${req.body}`);
    console.log(`Имя: ${req.body.name}; Телефон: ${req.body.phone}`);

    const body = {'name': req.body.name, 'phone': req.body.phone};

    data.push(body);
    fs.writeFileSync(process.env.PATH_DATA, JSON.stringify(data, null, 2));

    res.redirect("/");
});

app.get("/Update", (req, res) => {
    let name = req.query.name;

    let contact = data.find(contact => contact.name === name);

    console.log(name);
    console.log(contact.phone);

    res.render("updatePhone", {
        title: 'Изменение номера',
        data: data,
        name: contact.name,
        phone: contact.phone
    });
});

app.post("/Update", urlencodedParser, (req, res) => {
    const {originalName, name, phone } = req.body;

    console.log('Оригинальное имя:', originalName);
    console.log('Новое имя:', name);
    console.log('Новый телефон:', phone);

    let contactIndex = data.findIndex(contact => contact.name === originalName);

    data[contactIndex].name = name;
    data[contactIndex].phone = phone;

    fs.writeFileSync(process.env.PATH_DATA, JSON.stringify(data, null, 2));
    
    
    res.redirect("/");
});

app.post("/Delete", (req, res) => {
    console.log('Сработал post');

    const name = req.body.name;

    data = data.filter(contact => contact.name !== name);

    fs.writeFileSync(process.env.PATH_DATA, JSON.stringify(data, null, 2));

    res.redirect("/");
});

app.get("/Delete", (req, res) => {
    console.log('Сработал get');

    res.redirect("/");
})

app.use((req, res) => {
    res.status(404).json({message: "Ничего не найдено"});
})

module.exports = app;