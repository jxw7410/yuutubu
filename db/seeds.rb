# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([( name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



require 'open-uri'


User.destroy_all
UserChannel.destroy_all
Video.destroy_all
VideoPost.destroy_all
VideoLike.destroy_all
VideoDislike.destroy_all

user1 = User.create(username: 'Master', email: 'master@gmail.com', password: 'password123');
user2 = User.create(username: 'User1', email: 'User1@gmail.com', password: 'password123');
user3 = User.create(username: 'User2', email: 'User2@gmail.com', password: 'password123');
user4 = User.create(username: 'User3', email: 'User3@gmail.com', password: 'password123');
user5 = User.create(username: 'User4', email: 'User4@gmail.com', password: 'password123');
user6 = User.create(username: 'User5', email: 'User5@gmail.com', password: 'password123');
user7 = User.create(username: 'User6', email: 'User6@gmail.com', password: 'password123');
user8 = User.create(username: 'User7', email: 'User7@gmail.com', password: 'password123');
user9 = User.create(username: 'User8', email: 'User8@gmail.com', password: 'password123');
user10 = User.create(username: 'User9', email: 'User9@gmail.com', password: 'password123');



channel1 = UserChannel.create(name: user1.username, user: user1)
channel2 = UserChannel.create(name: user2.username, user: user2)
channel3 =UserChannel.create(name: user3.username, user: user3)
channel4 =UserChannel.create(name: user4.username, user: user4)
channel5 =UserChannel.create(name: user5.username, user: user5)
channel6 =UserChannel.create(name: user6.username, user: user6)
channel7 =UserChannel.create(name: user7.username, user: user7)
channel8 =UserChannel.create(name: user8.username, user: user8)
channel9 =UserChannel.create(name: user9.username, user: user9)
channel10 =UserChannel.create(name: user10.username, user: user10)


video1 = Video.create(
    title: 'Battlefield Hornet takeoff', 
    description: "Hornet take off in Battlefield",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 26.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/battlefieldhornet.png')
video1.thumbnail.attach(io: file, filename: 'hornettakeoff.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/hornetgame.mp4')
video1.video_content.attach(io: file, filename: 'battlefieldhornet.mp4')

video2 = Video.create(
    title: "Get Cobra'd!", 
    description: "Dumping flares with no missile lock, and not using mg when at someone's 6, hmm...",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 16.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/battlefieldcobra.png')
video2.thumbnail.attach(io: file, filename: 'hornetgetcobora.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/cobragame.mp4')
video2.video_content.attach(io: file, filename: 'battlefieldcobra.mp4')


video3 = Video.create(
    title: "Real hornet take off.", 
    description: "A real hornet taking off an aircraft carrier.",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 19.00
)


file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/hornetpilot.png')
video3.thumbnail.attach(io: file, filename: "hornetpilot.png")
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/hornetreallife.mp4')
video3.video_content.attach(io: file, filename: "realhornet.mp4")

video4 = Video.create(
    title: "Cobra maneuver in real life.", 
    description: "A plane using it's own body as a speed brake is surreal. Only in Russia.",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 6.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/hornetpilot.png')
video4.thumbnail.attach(io: file, filename: 'hornetpilot1.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/cobra.mp4')
video4.video_content.attach(io:file, filename: 'su35cobra.mp4')

video5 = Video.create(
    title: 'Kulbit maneuver', 
    description: "America doesn't believe in low energy dogfights, but the F-22 have the ability to do so.",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 11.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/f22.png')
video5.thumbnail.attach(io: file, filename: 'f22.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kulbit.mp4')
video5.video_content.attach(io: file, filename: 'kulbit.mp4')


video6 = Video.create(
    title: 'Repost!', 
    description: "F-22 is pretty cool, and I am too tired to write all these seed classes.",
    user_id: user1.id,
    channel_id: channel1.id,
    duration: 11.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/f22.png')
video6.thumbnail.attach(io: file, filename: 'f22_again.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kulbit.mp4')
video6.video_content.attach(io: file, filename: 'kulbit_again.mp4')


video7 = Video.create(
    title: 'S stands for...?', 
    description: "SMILE SWEET SISTER SADISTIC SURPRISE SERVICE S-",
    user_id: user2.id,
    channel_id: channel2.id,
    duration: 15.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/sblend.png')
video7.thumbnail.attach(io: file, filename: 's_blend.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/s_standsfor.mp4')
video7.video_content.attach(io: file, filename: 's_blend.mp4')

video8 = Video.create(
    title: '100% pure f***ing muscles', 
    description: "You ready to see this?",
    user_id: user2.id,
    channel_id: channel2.id,
    duration: 15.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/fattythumb.png')
video8.thumbnail.attach(io: file, filename: 'vrchat_fatguy.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/puremuscles.mp4')
video8.video_content.attach(io: file, filename: 'vrchat_fatguy.mp4')


video9= Video.create(
    title: 'No Swearing in my anime server.', 
    description: "Only waifus allowed.",
    user_id: user2.id,
    channel_id: channel2.id,
    duration: 7.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/birdguy.png')
video9.thumbnail.attach(io: file, filename: 'birdguy.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/birdguy.mp4')
video9.video_content.attach(io: file, filename: 'birdguy.mp4')


video10= Video.create(
    title: 'This guy sings better than you', 
    description: "His beat is on point!",
    user_id: user2.id,
    channel_id: channel2.id,
    duration: 12.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/rapstartthumb.png')
video10.thumbnail.attach(io: file, filename: 'abcguy.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/beatonpoint.mp4')
video10.video_content.attach(io: file, filename: 'abcguy.png')



video11 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user3.id,
    channel_id: channel3.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video11.thumbnail.attach(io: file, filename: 'kenshiro_1.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video11.video_content.attach(io: file, filename: 'kenshiro_1.mp4')

video12 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user4.id,
    channel_id: channel4.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video12.thumbnail.attach(io: file, filename: 'kenshiro_2.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video12.video_content.attach(io: file, filename: 'kenshiro_2.mp4')


video13 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user5.id,
    channel_id: channel5.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video13.thumbnail.attach(io: file, filename: 'kenshiro_3.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video13.video_content.attach(io: file, filename: 'kenshiro_3.mp4')


video14 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user6.id,
    channel_id: channel6.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video14.thumbnail.attach(io: file, filename: 'kenshiro_4.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video14.video_content.attach(io: file, filename: 'kenshiro_4.mp4')

video15 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user7.id,
    channel_id: channel7.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video15.thumbnail.attach(io: file, filename: 'kenshiro_5.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video15.video_content.attach(io: file, filename: 'kenshiro_5.mp4')


video16 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user8.id,
    channel_id: channel8.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video16.thumbnail.attach(io: file, filename: 'kenshiro_6.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video16.video_content.attach(io: file, filename: 'kenshiro_6.mp4')


video17 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user9.id,
    channel_id: channel9.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video17.thumbnail.attach(io: file, filename: 'kenshiro_7.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video17.video_content.attach(io: file, filename: 'kenshiro_7.mp4')


video18 = Video.create(
    title: 'Omae wo mou shindeiru',
    description: "Nani?!",
    user_id: user10.id,
    channel_id: channel10.id,
    duration: 4.00
)

file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/kenshiro.png')
video18.thumbnail.attach(io: file, filename: 'kenshiro_8.png')
file = open('https://yuutubu-seed-bucket.s3.amazonaws.com/shinderu.mp4')
video18.video_content.attach(io: file, filename: 'kenshiro_8.mp4')