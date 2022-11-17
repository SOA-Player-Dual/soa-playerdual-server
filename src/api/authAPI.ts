import 'dotenv/config';
import createInstance from '@api/baseAPI'

const authAPI = createInstance(process.env.AUTH_API)

export default authAPI;
