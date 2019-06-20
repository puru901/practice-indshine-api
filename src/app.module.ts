import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { SitesModule } from './sites/sites.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users/schemas/user.schema';
import { SiteSchema } from './sites/schemas/site.schema';
import { SitesController } from './sites/sites.controller';
import { SitesService } from './sites/sites.service';
import config from './config/keys';

@Module({
  imports: [
    UsersModule,
    SitesModule,
    MongooseModule.forRoot(config.mongoURI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Site', schema: SiteSchema },
    ]),
  ],
  controllers: [AppController, UsersController, SitesController],
  providers: [AppService, UsersService, SitesService],
})
export class AppModule {}
