const forecast = require("./utils/forecast");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
    res.render("index", { title: "Weather app", name: "Gaurang Dhameliya" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About me", name: "Gaurang Dhameliya" });
});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help", name: "Gaurang Dhameliya" });
});

app.get("/weather", (req, res) => {
    const { address } = req.query;

    if (!address) return res.send({ error: "Please provide an address" });

    forecast(address, (error, { forecast, location }) => {
        if (error) return res.send({ error });

        res.send({ forecast, location, address });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", { title: "404", name: "Gaurang Dhameliya", message: "Help article not found." });
});

app.get("*", (req, res) => {
    res.render("404", { title: "404", name: "Gaurang Dhameliya", message: "Page not found." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on...http://localhost:${port}`));
