import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { SitesService } from './sites.service';
import { Site } from './interfaces/site.interface';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  findAll(): Promise<Site[]> {
    return this.sitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Site> {
    return this.sitesService.findOne(id);
  }

  @Post()
  create(@Body() createSiteDto: CreateSiteDto): Promise<Site> {
    return this.sitesService.create(createSiteDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Site> {
    return this.sitesService.delete(id);
  }
}
