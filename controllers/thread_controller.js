module.exports = {
  get_threads: async (req, res) => {
    try {
      const db = req.app.get("db");

      const threads = await db.get_threads();

      res.status(200).send(threads);
    } catch (err) {
      console.error("get_threads failed in thread_controller.js:", err);
    }
  },

  get_initial_post: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { id } = req.params;
      const [initial_post] = await db.get_initial_post({ id });

      res.status(200).send(initial_post);
    } catch (err) {
      console.error("get_intial_post failed in thread_controller.js:", err);
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

  getTitleById: async (req, res) => {
    try {
      const db = req.app.get("db");
      let {id} = req.params
      const [title] = await db.get_title_by_id({id});
      res.status(200).send(title)
    } catch (err) {
      console.error("getThreadById method failed in thread_controller:", err);
    }
  },

  edit_thread: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { title, initialPost, id, user_id } = req.body;
      const [editedPost] = await db.edit_thread({
        title,
        initialPost,
        id,
        user_id
      });
      res.status(200).send(editedPost);
    } catch (err) {
      console.error("edit_thread method failed in post_controller.js:", err);
    }
  }
};
