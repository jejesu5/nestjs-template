import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const config = {
    port: process.env.PORT || 3000,
    MONGO_DATABASE_URL: process.env.MONGO_DATABASE_URL,
    JwtSecret: process.env.JWT_SECRET,
    TokenExpiration: process.env.TOKEN_EXPIRATION,
  };
  return config;
});
