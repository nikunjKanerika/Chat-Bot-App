import  dotenv from 'dotenv';

dotenv.config();
import app from './app';


dotenv.config();

const PORT = Number(process.env.PORT) || 8001;

// Connect to the database
import { Connection } from './db/db';
Connection();

import logger from './utils/logger';

app.listen(PORT, () => {
    logger.info(`server running at port ${PORT}`);
});
