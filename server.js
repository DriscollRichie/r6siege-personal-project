require("dotenv").config();
const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const session = require("express-session");
const chalk = require("chalk");

// Controllers
const threadController = require("./controllers/thread_controller");
// const postController = require("./controllers/post_controller");
const userController = require("./controllers/user_controller");
const stripeController = require("./controllers/stripe_controller");

// Middleware
const authMiddleware = require("./middlewares/auth_middleware");

//API

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
app.use(bodyParser.json());
massive(CONNECTION_STRING).then(db => {
  console.log(
    chalk.magenta(
      "Successfully " + chalk.blue.underline.bold("connected") + " to DB"
    )
  );
  app.set("db", db);
});

app.use(express.static(`${__dirname}/build`));
app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);

app.get("/api/auth/check", userController.isLoggedin);
app.post("/apit/auth/lougout", userController.logout_user);
app.post("/api/auth/register", userController.register_user);
app.post("/api/auth/login", userController.login_user);
app.post("/RainbowSixApi/playerstats", userController.get_r6stats);

app.get("/api/forums/threads", threadController.get_all_threads);
app.post("/api/forums/threads/new_thread", threadController.create_thread);
app.put("/api/forums/threads/edit_thread/:id", threadController.edit_thread);
app.get("/api/forums/thread/:id", threadController.get_one_thread);
app.delete('/api/forums/delete_thread/:id', authMiddleware, threadController.delete_thread)

app.post("/api/payment", stripeController.payment);

app.listen(SERVER_PORT, () =>
  console.log(`Server is listening on port: ${SERVER_PORT}`)
);
