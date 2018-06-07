module.exports = {
  register_user: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { username, password } = req.body;

      const [user] = await db.register_user([username, password]);
      req.session.user = {
        user_id: user.id
      };
      res.status(200).send(user);
    } catch (err) {
      console.error("register_user failed in user_controller.js:", err);
    }
  },

  login_user: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { username, password } = req.body;

      const [user] = await db.login_user([username, password]);
      req.session.user = {
        user_id: user.id
      };
      res.status(200).send(user);
    } catch (err) {
      console.error("login_user failed in user_controller:", err);
      res.status(500).send(err);
    }
  },

  isLoggedin: async (req, res) => {
    try {
      const db = req.app.get("db");
      if (!req.session.user) {
        return res.sendStatus(403);
        ``;
      }

      let [user] = await db.get_user_by_id({ id: req.session.user.user_id });
      delete user.password;
      return res.status(200).send(user);
    } catch (err) {
      console.error("isLoggedIn failed in user_conroller:", err);
    }
  },

  logout_user: (req, res) => {
    try {
      req.session.destroy();
      res.sendStatus(200);
    } catch (err) {
      console.error("logout_user failed in user_controller.js:", err);
    }
  },

  get_r6stats: (req, res) => {
    const RainbowSixApi = require("rainbowsix-api-node");
    const R6 = new RainbowSixApi();
    let { r6Username, r6Platform } = req.body;
    R6.stats(r6Username, r6Platform)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
