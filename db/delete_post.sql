DELETE FROM "public"."post" WHERE "id"=${post_id} AND user_id = ${user_id} 
returning *