module.exports = {
  threadReply: async (req, res) => {
    try {
      const db = req.app.get("db");
      const { reply } = req.body;
      const { id } = req.params;
      const { user_id } = req.session.user;

      await db.reply_to_thread({ post_text: reply, thread_id: id, user_id });
      res.sendStatus(200);
    } catch (err) {
      console.err("threadReply method failed in post_controller:", err);
      res.sendStatus(500);
    }
  },
  editReply: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { post_text, post_id } = req.body;
      let { user_id } = req.session.user;
      const [editedPost] = await db.edit_post({ post_text, post_id, user_id });
      res.status(200).send(editedPost);
    } catch (err) {}
  },
  deletePost: async (req, res) => {
    try {
      console.log("deletePost endpoint hit");
      const db = req.app.get("db");
      let { id: post_id } = req.params;
      let { user_id } = req.session.user;
      const [posts] = await db.delete_post({ post_id, user_id });
      res.status(200).send(posts);
    } catch (err) {
      console.error("deletePost method failed in post_controller.js:", err);
      res.status(500).send(err);
    }
  }
};
