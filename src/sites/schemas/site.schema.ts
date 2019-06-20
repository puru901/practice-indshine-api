import * as mongoose from 'mongoose';

export const SiteSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String,
  type: String,
});
