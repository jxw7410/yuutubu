# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)




User.destroy_all
UserChannel.destroy_all

user1 = User.create(username: 'Jimmy', email: 'jimmy@gmail.com', password: 'password123');
user2 = User.create(username: 'Johan', email: 'johan@gmail.com', password: 'password123');

UserChannel.create(name: user1.username, user: user1)
UserChannel.create(name: user2.username, user: user2)
