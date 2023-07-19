const UserController = require("../controllers/usercontroller");

module.exports = app => {
    app.get("/api/login", UserController.login);
    app.get("/api/logout", UserController.logout);
    app.post("/api/register", UserController.register);
}