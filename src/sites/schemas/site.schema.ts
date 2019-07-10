import * as mongoose from 'mongoose';

export const SiteSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  type: String,
  createdBy: String,
  image: String,
});
