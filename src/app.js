/**
 * @fileoverview Description of this file.
 */
import { AppConfig } from './config/appconfig';
import { User } from './models/user';
import { Product } from './models/product';

const product = new Product();
const user = new User();

console.log(`\x1b[3m${AppConfig.name}\x1b[0m`);