import { env } from "@/lib/env.mjs";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


const runSeed = async () => {
    if (!env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }


    const connection = postgres(env.DATABASE_URL, { max: 1 });

    const db = drizzle(connection);


    console.log("⏳ Running seed...");

    const start = Date.now();

    process.exit(0);
};

runSeed().catch((err) => {
    console.error("❌ Seed failed");
    console.error(err);
    process.exit(1);
});