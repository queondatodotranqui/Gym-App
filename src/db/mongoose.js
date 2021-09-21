// default code to connect to database
const mongoose = require('mongoose')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/gym-app-dev');
  console.log('connected')
}