import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import compression from 'compression';
import cors from 'cors';
import listingRoute from './routes/listings/listing.js.js';
import searchRoute from './routes/search/general.js.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
app.use(compression());
const PORT = 5000;
// const pool = new Pool({
//     host: `${process.env.PG_HOST}`,
//     port: `${process.env.PG_PORT}`,
//     database: `${process.env.PG_DATABASE}`,
//     user: `${process.env.PG_USER}`,
//     password: `${process.env.PG_PASSWORD}`,
//     ssl: {
//         ca: fs.readFileSync(path.resolve(__dirname, './poolCert.pem')).toString(),
//     },
// });
// async function connectToDB() {
//     try {
//         await supabase.
//         console.log("Database connection established successfully");
//     } catch (error) {
//         console.error("Error connecting to PostgreSQL:", error);
//         await process.exit(1);  // Exit process with failure
//     }
// }
// connectToDB();
const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:5000",
        "http://localhost:8000",
        "https://localhost:8000",
        "https://localhost:3000",
        "https://localhost:5000",
        "https://geopilot.io",
        "https://www.geopilot.io",
        'https://sendgrid.api-docs.io',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong :(" } = err;
    res.status(status).json({ errorMessage: message });
});
app.use('/api1/listings', listingRoute);
app.use('/api1/search', searchRoute);
app.listen(PORT, () => {
    console.log('Server ready!');
});
// export default pool;
