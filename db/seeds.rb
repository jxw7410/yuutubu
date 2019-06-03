# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)




User.destroy_all
UserChannel.destroy_all
Video.destroy_all

user1 = User.create(username: 'testuser1', email: 'testuser1@gmail.com', password: 'password123');
user2 = User.create(username: 'testuser2', email: 'testuser2@gmail.com', password: 'password123');
user3 = User.create(username: 'testuser3', email: 'testuser3@gmail.com', password: 'password123');
user4 = User.create(username: 'testuser4', email: 'testuser4@gmail.com', password: 'password123');
user5 = User.create(username: 'testuser5', email: 'testuser5@gmail.com', password: 'password123');
user6 = User.create(username: 'testuser6', email: 'testuser6@gmail.com', password: 'password123');
user7 = User.create(username: 'testuser7', email: 'testuser7@gmail.com', password: 'password123');
user8 = User.create(username: 'testuser8', email: 'testuser8@gmail.com', password: 'password123');
user9 = User.create(username: 'testuser9', email: 'testuser9@gmail.com', password: 'password123');
user10 = User.create(username: 'testuser10', email: 'testuser10@gmail.com', password: 'password123');
user11 = User.create(username: 'testuser11', email: 'testuser11@gmail.com', password: 'password123');
user12 = User.create(username: 'testuser12', email: 'testuser12@gmail.com', password: 'password123');
user13 = User.create(username: 'testuser13', email: 'testuser13@gmail.com', password: 'password123');
user14 = User.create(username: 'testuser14', email: 'testuser14@gmail.com', password: 'password123');
user15 = User.create(username: 'testuser15', email: 'testuser15@gmail.com', password: 'password123');

channel1 = UserChannel.create(name: user1.username, user: user1)
UserChannel.create(name: user2.username, user: user2)
UserChannel.create(name: user3.username, user: user3)
UserChannel.create(name: user4.username, user: user4)
UserChannel.create(name: user5.username, user: user5)
UserChannel.create(name: user6.username, user: user6)
UserChannel.create(name: user7.username, user: user7)
UserChannel.create(name: user8.username, user: user8)
UserChannel.create(name: user9.username, user: user9)
UserChannel.create(name: user10.username, user: user10)
UserChannel.create(name: user11.username, user: user11)
UserChannel.create(name: user12.username, user: user12)
UserChannel.create(name: user13.username, user: user13)
UserChannel.create(name: user14.username, user: user14)
UserChannel.create(name: user15.username, user: user15)

vid1 = Video.create(title: '4 plates', description: "There is a better place and time for this.", user_id: user1.id, channel_id: channel1.id)
#vid1.video_content.attach( io: File.open("/Users/jxw7410/Desktop/videos/405.mov"), filename: "405.mov")