import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema"

const CONNECTION_STRING = process.env.DATABASE_URL || ""

const client = postgres(CONNECTION_STRING)
export const db = drizzle(client, { schema })
// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// const connectionString = process.env.DATABASE_URL || ""
// // Disable prefetch as it is not supported for "Transaction" pool mode
// const client = postgres(connectionString, { prepare: false })
// const db = drizzle(client);

// const res = db.query.stores

// export { db }