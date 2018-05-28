import { execSync } from 'child_process';
import { EventEmitter } from 'events'
import path from 'path';
import csvjson from 'csvjson';
import Importer from './importer';

const DEFAULT_DELAY = 500;

export default class DirWatcher extends EventEmitter {
  /**
   * Declaring properties
   */
  constructor() {
    super();
    this.interval = null;
    this.files = [];
  }

  /**
   * Watches directory and emit 'dirwatcher:changed' event
   * after anything was added to the path folder
   * @param {any} path
   * @param {any} delay – TBD
   * @memberOf DirWathce
   */
  watch(dirname, delay) {
    clearInterval(this.interval);
    const folderPath = `${path.join(__dirname, '../', dirname)}/`;
    this.files = this.watcher(folderPath);
    this.interval = setInterval(() => {
      const list = this.watcher(folderPath);
      const delta = list.filter((filename, i) => this.files[i] !== (filename));
      if (delta.length) {
        delta.forEach((file) => (path.extname(file) === '.csv') && this.emit('dirwatcher:changed', file));
        this.files = list;
      }
    }, delay || DEFAULT_DELAY);
  }

  /**
   * Undo watches listener
   * @param {any} path
   * @memberOf DirWathce
   */
  unwatch(path) {
    clearInterval(this.interval);
  }

  /**
   *
   * @param {any} path string
   * @return array of strings
   * @memberOf DirWatcher
   */
  watcher(path) {
    return execSync(`for entry in "${path}"*; do echo "$entry"; done`).toString().split(/\r?\n/);
  }
}
