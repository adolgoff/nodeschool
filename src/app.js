/**
 * @fileoverview Description of this file.
 */
import { AppConfig } from './config/appconfig';
import { User } from './models/user';
import { Product } from './models/product';
import DirWatcher from './dirwatcher';
import Importer from './importer';
import path from 'path';

const product = new Product();
const user = new User();

console.log(`\x1b[3m${AppConfig.name}\x1b[0m`);
const wathcer = new DirWatcher();
wathcer.on('dirwatcher:changed', (file) => console.log(Importer.importSync(file)));
wathcer.watch('data');
