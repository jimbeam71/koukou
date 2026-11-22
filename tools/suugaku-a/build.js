// 高校 数学A のページを作る。使い方: node tools/suugaku-a/build.js
// 単元を足すとき: このフォルダにデータファイルを置き、下の UNITS に1行足して実行 → push。新しいWorkerは作らない。
var fs = require('fs'), path = require('path');
var ROOT = path.join(__dirname, '..', '..');
var OUT = path.join(ROOT, 'public', 'suugaku-a');
var UNITS = [
  { title: '場合の数と確率', sub: '樹形図・積の法則・順列・組合せ・確率の基本（基礎から）', file: 'baai' }
];
var COMING = ['条件付き確率', '期待値'];

var tpl = fs.readFileSync(path.join(ROOT, 'tools', 'rika', 'unit.template.html'), 'utf8');
var rikaTop = fs.readFileSync(path.join(ROOT, 'public', 'rika', 'index.html'), 'utf8'); // 見た目をそろえるため、理科トップのheadを流用
var head = rikaTop.slice(0, rikaTop.indexOf('<body')).replace(/<title>[^<]*<\/title>/, '<title>高校 数学A</title>');

fs.mkdirSync(OUT, { recursive: true });
var cards = UNITS.map(function (u) {
  var data = require('./' + u.file + '.js');
  data.subject = '数学A'; data.dir = 'suugaku-a';
  var json = JSON.stringify(data).replace(/</g, '\\u003c');
  var html = tpl.replace('<a href="../index.html">← 高校理科トップ</a>', '<a href="index.html">← 数学Aトップ</a>')
    .replace('{{TITLE}}', function () { return data.title; }).replace('{{SUBJECT}}', function () { return '数学A'; }).replace('{{DATA}}', function () { return json; });
  fs.writeFileSync(path.join(OUT, u.file + '.html'), html);
  var n = 0; data.steps.forEach(function (s) { n += s.qs.length; });
  console.log('built suugaku-a/' + u.file + '.html (' + n + '問)');
  return '<a class="unit" href="' + u.file + '.html"><span class="ut">' + u.title + '</span><span class="us">' + u.sub + '</span><span class="uc">' + n + '問 →</span></a>';
}).join('') + COMING.map(function (n) { return '<div class="unit soon"><span class="ut">' + n + '</span><span class="us">じゅんびちゅう</span></div>'; }).join('');

var top = head + '<body><main><p><a href="../index.html" style="color:var(--ink);font-weight:700;text-decoration:none">← 高校トップ</a></p>' +
  '<header><p class="kicker">高校 数学A</p><h1>高校 数学A 自習サイト</h1><p class="lead">基礎からわからなくても大丈夫。見本を見てから、1問ずつ進みます。まちがえた選択肢の理由も見られます。</p></header>' +
  '<section><h2>場合の数と確率</h2><div class="units" style="margin-top:10px">' + cards + '</div></section></main></body></html>';
fs.writeFileSync(path.join(OUT, 'index.html'), top);
console.log('built suugaku-a/index.html');
