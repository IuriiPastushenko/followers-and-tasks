import { ServerOrganization } from './src/app';
import { TypeOrmConnects } from './src/typeorm/typeorm.connects';
import { UsersRouter } from './src/users/users.controller';

const typeOrmConnects = new TypeOrmConnects();

// Describing the bootstrap method
async function bootstrap(): Promise<void> {
  const serverOrganization = new ServerOrganization(new UsersRouter());
  await serverOrganization.init();
}

bootstrap();

export { typeOrmConnects };
