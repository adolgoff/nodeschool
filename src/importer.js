import fs from 'fs';
import csvjson from 'csvjson';

export default class Importer {
  /**
   * Return a promise that resolves to imported data
   * @param {any} path
   * @return {Promise}
   * @memberOf Importer
   */
  static import(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject (err);
        resolve (csvjson.toObject(data));
      });
    });
  }

  /**
   * Return imported data from the file
   * @param {any} path
   * @return {any} Object or array from CSVs
   * @memberOf Importer
   */
  static importSync(path) {
    const data = fs.readFileSync(path, 'utf8');
    return csvjson.toObject(data);
  }
}
