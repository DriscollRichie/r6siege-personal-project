select thread.id as thread_id, thread."initialPost" as thread_text, thread.user_id as thread_user_id, thread.title as thread_title, users.username as thread_username from thread
join users on thread.user_id = users.id
where thread.id = ${thread_id}