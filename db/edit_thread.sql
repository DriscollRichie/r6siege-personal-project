UPDATE "public"."thread" SET "initialPost"=${newThreadText} WHERE "id"=${id} AND "user_id"=${user_id} RETURNING *;