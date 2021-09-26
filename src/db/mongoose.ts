// default code to connect to database
import { connect } from 'mongoose'
import * as chalk from 'chalk'

main().catch(err => console.log(err));

async function main() {
  await connect('mongodb://localhost:27017/gym-app-dev');
  console.log(chalk.bgWhite.black(' Connected to DB '))
}