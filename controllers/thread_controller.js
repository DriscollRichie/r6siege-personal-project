module.exports = {
  get_all_threads: async (req, res) => {
    try {
      const db = req.app.get("db");

      const threads = await db.get_all_threads();

      res.status(200).send(threads);
    } catch (err) {
      console.error("get_threads failed in thread_controller.js:", err);
    }
  },

  create_thread: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { initial_post, id, title } = req.body;
      const [post] = await db.create_thread({
        id,
        title,
        initial_post
      });
      res.status(200).send(post);
    } catch (err) {
      console.error("create_thread method failed in post_controller.js:", err);
    }
  },

  edit_thread: async (req, res) => {
    try {
      // console.log('ENDPOINT HIT')
      const db = req.app.get("db");
      let { newThreadText, user_id } = req.body;
      let { id } = req.params;
      // console.log('req.body', req.body)
      // console.log('req.params', req.params)
      const [editedThread] = await db.edit_thread({
        newThreadText,
        id,
        user_id
      });

      console.log("editedThread", editedThread);

      res.status(200).send(editedThread);
    } catch (err) {
      console.error("edit_thread method failed in thread_controller.js:", err);
    }
  },
  get_one_thread: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { id } = req.params;
      const [thread] = await db.get_one_thread({ thread_id: id });
      const posts = await db.get_posts({ post_thread_id: id });
      thread.posts = posts;
      res.status(200).send(thread);
    } catch (err) {
      console.error("getThread method failed in thread_controller.js:", err);
      res.status(500).send(err);
    }
  },

  delete_thread: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { id } = req.params;
      const { user_id } = req.session.user;
      console.log(req.session.user)

      await db.delete_one_thread({ thread_id: id, user_id});
      res.sendStatus(200);
    } catch (err) {
      console.error("delete_thread method failed in thread_controller:", err);
      res.status(500).send(err);
    }
  }
};
