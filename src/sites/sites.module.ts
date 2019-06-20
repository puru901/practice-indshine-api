import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { SiteSchema } from './schemas/site.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Site', schema: SiteSchema }])],
  controllers: [SitesController],
  providers: [SitesService],
})
export class SitesModule {}
