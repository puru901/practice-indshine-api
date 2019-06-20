import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Site } from './interfaces/site.interface';
import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

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
    return await rp(site.url)
      .then(html => {
        const length = cheerio('meta', html).length;
        let $ = cheerio.load(html);
        for (let i = 0; i < length; i++) {
          if ($('meta')[i].attribs.property === 'og:title') {
            site.title = $('meta')[i].attribs.content;
          }
          if ($('meta')[i].attribs.name === 'description') {
            site.description = $('meta')[i].attribs.content;
          }
        }
        if ($('title').text() !== '') {
          site.title = $('title').text();
        }
        const newSite = new this.siteModel(site);
        return newSite.save();
      })
      .catch(err => {
        return err.message;
      });
  }

  async delete(id: string): Promise<Site> {
    return await this.siteModel.findByIdAndRemove(id);
  }
}
