INSERT INTO "public"."thread"("user_id", "title", "initialPost") VALUES(${id}, ${title}, ${initial_post}) RETURNING "id", "user_id", "title", "initialPost";