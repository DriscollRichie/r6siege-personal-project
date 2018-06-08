select post.id as post_id, post.content as post_text, post.user_id as post_user_id, users.username as post_username from post
join users on post.user_id = users.id
where post.thread_id = ${post_thread_id}