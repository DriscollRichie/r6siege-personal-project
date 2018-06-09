UPDATE "public"."post" SET "content"=${post_text} WHERE "id"=${post_id} AND user_id = ${user_id} RETURNING"content";
