import gulp from 'gulp'
import del from 'del'
import fs from 'fs'
import path from 'path'
import request from 'request'
import axios from 'axios'

const iconUrl = [
  '//at.alicdn.com/t/font_587370_507efdozr0sh5mi.css',
  '//at.alicdn.com/t/font_587370_507efdozr0sh5mi.js',
];

function path__dime(expath) {
  return path.join(__dirname, expath)
}

/**
 * 更新图标库
 */
gulp.task('updateIcon', ['clean:icon', 'down:icon'], function () {
  fs.readFile(path__dime('../src/assets/icon/iconfont.css'), 'utf8', function (err, data) {
    const regexp = /url\(('\/\/at.alicdn.com\/(\S+)'\))/g;
    console.log(data.toString().match(regexp));
  });
});

/**
 *  清空图标
 */
gulp.task('clean:icon', function () {
  return del.sync(['../src/assets/icon/**.{js,css}'], {force: true});
});

/**
 * 下载图标
 */
gulp.task('down:icon', function () {
  for (let i = 0; i < iconUrl.length; i++) {
    const fileUrl = `http:${iconUrl[i]}`;
    const filename = path__dime(`../src/assets/icon/iconfont${fileUrl.match(/\.(css|js)/)[0]}`);
    request(fileUrl).pipe(fs.createWriteStream(filename)).on('close', function () {
      console.log('更新完毕')
    });
  }
});

/**
 * 更新 api
 */
gulp.task('update:api', function () {
  /** api 地址 */
  const apiPath = 'http://192.168.199.209:8080/v2/api-docs';
  /** 类名称 */
  const fileName = 'ge';
  /** 存放路径 */
  const writePath = path__dime(`../src/store/${fileName}/api.js`);
  writeApi(apiPath, writePath, fileName)
});

function writeApi(apiPath, writePath, fileName) {
  axios.get(apiPath).then(res => {
    const list = renderList(res.data.paths);
    const className = `import {server} from '@/tools/servers'\n
/**
 * ${res.data.info.title}
 */
export class ${fileName.replace(/\w/, function (a) {
      return a.toLocaleUpperCase()
    })} {\n${list}}\n`;
    fs.writeFileSync(writePath, className)
  })
}

function renderList(paths) {
  let li = '';
  const pathy = Object.keys(paths);
  for (let i = 0; i < pathy.length; i++) {
    const d = paths[pathy[i]];
    const mothed = Object.keys(d)[0].toLocaleUpperCase();
    const body = mothed === 'GET' ? 'search' : 'data';
    li += `  /**
   * ${d[Object.keys(d)[0]].description || d[Object.keys(d)[0]].summary}
   * string
   */
  static ${pathy[i].replace(/\//g, '')}(${ body + ' = {}'}) {
    return server.connection('${mothed}', '${pathy[i]}', ${body})\n  }\n\n`
  }
  return li
}
