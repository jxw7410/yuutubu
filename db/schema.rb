# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_21_151725) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "search_histories", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "context", null: false
    t.string "category", default: "SEARCH_HISTORY"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_search_histories_on_user_id"
  end

  create_table "user_channels", force: :cascade do |t|
    t.string "name", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_user_channels_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "video_dislikes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "video_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category", default: "DISLIKES"
    t.index ["user_id", "video_id"], name: "index_video_dislikes_on_user_id_and_video_id", unique: true
    t.index ["user_id"], name: "index_video_dislikes_on_user_id"
    t.index ["video_id"], name: "index_video_dislikes_on_video_id"
  end

  create_table "video_like_dislikes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "video_id", null: false
    t.boolean "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "video_likes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "video_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category", default: "LIKES"
    t.index ["user_id", "video_id"], name: "index_video_likes_on_user_id_and_video_id", unique: true
    t.index ["user_id"], name: "index_video_likes_on_user_id"
    t.index ["video_id"], name: "index_video_likes_on_video_id"
  end

  create_table "video_posts", force: :cascade do |t|
    t.text "description", null: false
    t.integer "user_id", null: false
    t.integer "video_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "videos", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "duration", null: false
    t.integer "views", default: 0
    t.index ["channel_id"], name: "index_videos_on_channel_id"
    t.index ["user_id"], name: "index_videos_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
