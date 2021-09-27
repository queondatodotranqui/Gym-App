// default code to connect to database
import { connect } from 'mongoose'

main();

async function main() {
  // @ts-ignore
  await connect(process.env.DATABASE_URL);
}