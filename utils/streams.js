#!/usr/bin/env node
const fs = require('fs');
const csv = require('csvtojson');
const CSS_APPENDIX = require('./css_appendix');

const actions = {
  reverse: ({}, str) => {
    process.stdout.write(...str.map(a => a.toString().split('').reverse().join('')));
  },

  transform: ({}, str) => {
    process.stdout.write(...str.map(a => a.toString().toUpperCase()));
  },

  outputFile: ({file}) => {
    if (!file) {
      console.error('Error: --file attrbute must be set correctly');
      return;
    }
    try {
      const st = fs.createReadStream(file);
      st.on('data', (chunk) => {
          process.stdout.write(chunk.toString());
      });
    } catch(e) {
      console.error(e);
    }
  },

  convertFromFile: ({file}) => {
    if (!file) {
      console.error('Error: --file attrbute must be set correctly');
      return;
    }
    try {
      const st = fs.createReadStream(file);
      st.pipe(csv()).on('data', (chunk) =>
        process.stdout.write(chunk.toString()));
    } catch(e) {
      console.error(e);
    }
  },

  convertToFile: ({file}) => {
    if (!file) {
      console.error('Error: --file attrbute must be set correctly');
      return;
    }
    try {
      const rs = fs.createReadStream(file);
      const ws = fs.createWriteStream(file.replace('.csv', '.json'));
      rs.pipe(csv()).pipe(ws);
    } catch(e) {
      console.error(e);
    }
  },

  cssBundler: ({path}) => {
    if (!path) {
      console.error('Error: --path attrbute must be set correctly');
      return;
    }

    const watcher = (path) =>
      execSync(`for entry in "${path}"*; do echo "$entry"; done`)
        .toString().split(/\r?\n/);

    let css = '';

    try{

      let list = watcher(path);
      list = list.filter((filename, i) => filename !== 'bundle.css');
      if (list.length) {
        list.forEach((file) => (path.extname(file) === '.css') &&
        (css += fs.readFileSync(file).toString()));
        css += CSS_APPENDIX;
        fs.writeFileSync(path + '/bundle.css');
        console.log('Bundle file created!');
      } else {
        console.log('There were no files to create bundle.css')
      }
    } catch (e) {
      console.error(e);
    }
  },
}

const showHelp = () => {
  console.log(`Could have 5 actions:
  --action=reverse str
  --action=transform str
  --action=outputFile --file=filePath
  --action=convertFromFile --file=filePath
  --action=convertToFile --file=filePath
  ––––––––
  "--action=reverse" is equal to "-a reverse", for example:
  $ ./streams.js --action=transform textToTransform
  or
  $ ./streams.js -a outputFile -f users.csv
  `)
}

const shortcutsDictionary = {
  a: 'action',
  f: 'file',
  p: 'path',
}

let argv = process.argv.slice(2)

const commands = {};
const longReg = /--((\w|-)*)=(.+)$/; // groups 1 and 3
const shortReg = /-(\w)$/;
const freeArgs = [];
argv.forEach((el, i, a) => {
  // expanding shortcuts
  if (shortReg.test(el)) {
    el = `--${shortcutsDictionary[shortReg.exec(el)[1]]}=${a.splice([i+1], 1)[0]}`;
  }
  console.log(el);
  // parsing data
  if (longReg.test(el)) {
    commands[longReg.exec(el)[1]] = longReg.exec(el)[3];
  } else {
    freeArgs.push(el);
  }
});

if (!argv.length) showHelp();
else if (!commands.action) console.error ('There\'s no action set. Rerun with valid --action argument');
else if (!actions[commands.action]) console.log(`There's such action as ${commands.action} :( Try something else?`);
else {
  actions[commands.action](commands, freeArgs);
}
