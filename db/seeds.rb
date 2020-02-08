# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([( name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "open-uri"

User.destroy_all
UserChannel.destroy_all
Video.destroy_all
VideoPost.destroy_all
Like.destroy_all
SearchHistory.destroy_all
Subscription.destroy_all
ActiveStorage::Attachment.all.each{ |attachment| attachment.purge }

demouser = User.create(username: "demouser", email: "demouser@gmail.com", password: "password123")
UserChannel.create(name: demouser.username, user: demouser)

user1 = User.create(username: "HowDoIPressCircle", email: "fakeemail1@gmail.com", password: "password123")
user2 = User.create(username: "FFfan", email: "fakeemail2@gmail.com", password: "password123")
user3 = User.create(username: "AC1", email: "ac1@gmail.com", password: "password123")
user4 = User.create(username: "AC2", email: "ac2@gmail.com", password: "password123")
user5 = User.create(username: "AC3", email: "ac3@gmail.com", password: "password123")
user6 = User.create(username: "AC4", email: "ac4@gmail.com", password: "password123")
user7 = User.create(username: "AC5", email: "ac5@gmail.com", password: "password123")
user8 = User.create(username: "AC6", email: "ac6@gmail.com", password: "password123")
user9 = User.create(username: "AC7", email: "ac7@gmail.com", password: "password123")
user10 = User.create(username: "AC8", email: "ac8@gmail.com", password: "password123")

channel1 = UserChannel.create(name: user1.username, user: user1)
channel2 = UserChannel.create(name: user2.username, user: user2)
channel3 = UserChannel.create(name: user3.username, user: user3)
channel4 = UserChannel.create(name: user4.username, user: user4)
channel5 = UserChannel.create(name: user5.username, user: user5)
channel6 = UserChannel.create(name: user6.username, user: user6)
channel7 = UserChannel.create(name: user7.username, user: user7)
channel8 = UserChannel.create(name: user8.username, user: user8)
channel9 = UserChannel.create(name: user9.username, user: user9)
channel10 = UserChannel.create(name: user10.username, user: user10)

video = Video.create(
  title: "Nergigante Part I",
  description: "Part I of an elder dragon hunt with a lance",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 57.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante.png")
video.thumbnail.attach(io: file, filename: "nergigante.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante.mp4")
video.video_content.attach(io: file, filename: "nergigante.mp4")

video = Video.create(
  title: "Nergigante Part II",
  description: "Part II of an elder dragon hunt with a lance",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 73.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante2.png")
video.thumbnail.attach(io: file, filename: "nergigante2.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante2.mp4")
video.video_content.attach(io: file, filename: "nergigante2.mp4")

video = Video.create(
  title: "Nergigante Part III",
  description: "Part III of an elder dragon hunt with a lance.",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 63.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante3.png")
video.thumbnail.attach(io: file, filename: "nergigante3.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante3.mp4")
video.video_content.attach(io: file, filename: "nergigante3.mp4")

video = Video.create(
  title: "Nergigante Part IV",
  description: "Part IV of an elder dragon hunt with a lance.",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 56.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante4.png")
video.thumbnail.attach(io: file, filename: "nergigante4.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante4.mp4")
video.video_content.attach(io: file, filename: "nergigante4.mp4")

video = Video.create(
  title: "Nergigante Part V",
  description: "Part V of an elder dragon hunt with a lance.",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 59.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante5.png")
video.thumbnail.attach(io: file, filename: "nergigante5.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante5.mp4")
video.video_content.attach(io: file, filename: "nergigante5.mp4")

video = Video.create(
  title: "Nergigante Part VI",
  description: "Part VI of an elder dragon hunt with a lance.",
  user_id: user1.id,
  channel_id: channel1.id,
  duration: 102.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante6.png")
video.thumbnail.attach(io: file, filename: "nergigante6.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/nergigante6.mp4")
video.video_content.attach(io: file, filename: "nergigante6.mp4")


video = Video.create(
  title: "FFXIV: Answers - End of an Era",
  description: "All rights belong to Square Enix. 
  <div>Please support the offical video:</div> 
  <a href='https://www.youtube.com/watch?v=39j5v8jlndM'>https://www.youtube.com/watch?v=39j5v8jlndM</a>",
  user_id: user2.id,
  channel_id: channel2.id,
  duration: 99.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/end_of_an_era.png")
video.thumbnail.attach(io: file, filename: "end_of_an_era.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/end_of_an_era.mp4")
video.video_content.attach(io: file, filename: "end_of_an_era.mp4")

video = Video.create(
  title: "FFXIV: Innocence - Crown of the Immaculate.",
  description: "All rights to belong to Square Enix, and owner of video.
  <div>Please support the offical video:</div>
  <a href='https://www.youtube.com/watch?v=Wc4w0AXWcnI'>https://www.youtube.com/watch?v=Wc4w0AXWcnI</a>",
  user_id: user2.id,
  channel_id: channel2.id,
  duration: 57.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/innocence.png")
video.thumbnail.attach(io: file, filename: "innocence.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/innocence.mp4")
video.video_content.attach(io: file, filename: "innocence.mp4")

video = Video.create(
  title: "FFXIV: Weight of the World- YoRHa Unit No.9 Type S",
  description: "All rights belong to Square Enix, and owner of video.
  <div>Please support the offical video:</div> 
  <a href='https://www.youtube.com/watch?v=jVAgd9dbYIs'>https://www.youtube.com/watch?v=jVAgd9dbYIs</a>",
  user_id: user2.id,
  channel_id: channel2.id,
  duration: 86.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/yoruha_9s.png")
video.thumbnail.attach(io: file, filename: "yorha_9s.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/yoruha_9s.mp4")
video.video_content.attach(io: file, filename: "yorha_9s.mp4")

video = Video.create(
  title: "FFXIV: Wayward Daughter - Tsukuyomi",
  description: "All rights belong to Square Enix, and owner of video.
  <div>Please support the offical video:</div> 
  <a href='https://www.youtube.com/watch?v=njYgggITz2g'>https://www.youtube.com/watch?v=njYgggITz2g</a>",
  user_id: user2.id,
  channel_id: channel2.id,
  duration: 85.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/tsukuyomi.png")
video.thumbnail.attach(io: file, filename: "tsukuyomi.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/tsukuyomi.mp4")
video.video_content.attach(io: file, filename: "tsukuyomi.mp4")

video = Video.create(
  title: "AC7: Siren's Song P1",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user3.id,
  channel_id: channel3.id,
  duration: 120.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song.png")
video.thumbnail.attach(io: file, filename: "sirens_song.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song.mp4")
video.video_content.attach(io: file, filename: "sirens_song.mp4")

video = Video.create(
  title: "AC7: Siren's Song P2",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user4.id,
  channel_id: channel4.id,
  duration: 119.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song2.png")
video.thumbnail.attach(io: file, filename: "sirens_song2.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song2.mp4")
video.video_content.attach(io: file, filename: "sirens_song2.mp4")

video = Video.create(
  title: "AC7: Siren's Song P3",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user5.id,
  channel_id: channel5.id,
  duration: 120.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song3.png")
video.thumbnail.attach(io: file, filename: "sirens_song3.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song3.mp4")
video.video_content.attach(io: file, filename: "sirens_song3.mp4")

video = Video.create(
  title: "AC7: Siren's Song P4",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user6.id,
  channel_id: channel6.id,
  duration: 119.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song4.png")
video.thumbnail.attach(io: file, filename: "sirens_song4.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song4.mp4")
video.video_content.attach(io: file, filename: "sirens_song4.mp4")

video = Video.create(
  title: "AC7: Siren's Song P5",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user7.id,
  channel_id: channel7.id,
  duration: 118.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song5.png")
video.thumbnail.attach(io: file, filename: "sirens_song5.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song5.mp4")
video.video_content.attach(io: file, filename: "sirens_song5.mp4")

video = Video.create(
  title: "AC7: Siren's Song P6",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user8.id,
  channel_id: channel8.id,
  duration: 119.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song6.png")
video.thumbnail.attach(io: file, filename: "sirens_song6.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song6.mp4")
video.video_content.attach(io: file, filename: "sirens_song6.mp4")

video = Video.create(
  title: "AC7: Siren's Song P7",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user9.id,
  channel_id: channel9.id,
  duration: 118.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song7.png")
video.thumbnail.attach(io: file, filename: "sirens_song7.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song7.mp4")
video.video_content.attach(io: file, filename: "sirens_song7.mp4")

video = Video.create(
  title: "AC7: Siren's Song P8",
  description: "Featuring a SU-57 with Pulse Laser",
  user_id: user10.id,
  channel_id: channel10.id,
  duration: 44.00,
)

file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song8.png")
video.thumbnail.attach(io: file, filename: "sirens_song8.png")
file = open("https://yuutubu-seed-bucket.s3.amazonaws.com/sirens_song8.mp4")
video.video_content.attach(io: file, filename: "sirens_song8.mp4")
