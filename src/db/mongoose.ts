// default code to connect to database
import { connect } from 'mongoose'
import * as chalk from 'chalk'

main().catch(err => console.log(err));

async function main() {
  // @ts-ignore
  await connect(process.env.DATABASE_URL);
  console.log(chalk.bgWhite.black(' Connected to DB '))
}