import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface GlobalConfig {
  postgres: {
    url: string;
  };
  jwt: {
    secret: string;
  }
}

const GlobalConfigSchema = Joi.object<GlobalConfig>({
  postgres: Joi.object({
    url: Joi.string().required(),
  }),
  jwt: Joi.object({
    secret: Joi.string().required(),
  })
});

export const globalConfig = registerAs('global', () => {
  const config = {
    postgres: {
      url: process.env.DATABASE_URL,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    }
  };

  const result = GlobalConfigSchema.validate(config, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (result.error) {
    console.error('Global config validation error: ', result.error);
    for (const v of result.error.details) {
      console.error(v.message);
    }
    throw new Error('Missing configuration options');
  }

  return config;
});
