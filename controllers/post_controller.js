module.exports = {
  get_posts: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { id } = req.params;

      const posts = await db.get_posts([id]);

      res.status(200).send(posts);
    } catch (err) {
      console.error("get_posts method failed in post_controller.js:", err);
    }
  }
  // get_posts: (req, res) => {
  //   const db = req.app.get('db')
  //   let {id} = req.params
  //   db.get_posts([id]).then(posts => {
  //     res.status(200).send(posts)
  //   })
  // }
  // }
};
