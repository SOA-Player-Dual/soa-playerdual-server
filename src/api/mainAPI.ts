import 'dotenv/config';
import createInstance from '@api/baseAPI';

const mainAPI = createInstance(process.env.LARAVEL_API)

export default mainAPI;
