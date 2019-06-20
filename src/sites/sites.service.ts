import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Site } from './interfaces/site.interface';

@Injectable()
export class SitesService {
  constructor(@InjectModel('Site') private readonly siteModel: Model<Site>) {}

  async findAll(): Promise<Site[]> {
    return await this.siteModel.find();
  }

  async findOne(id: string): Promise<Site> {
    return await this.siteModel.findOne({ _id: id });
  }

  async findByType(type: string): Promise<Site> {
    return await this.siteModel.find({ type: type });
  }

  async create(site: Site): Promise<Site> {
    const newSite = new this.siteModel(site);
    return await newSite.save();
  }

  async delete(id: string): Promise<Site> {
    return await this.siteModel.findByIdAndRemove(id);
  }
}
