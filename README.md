# 高校トップ（koukou）
公開URL: https://koukou.senta1111.workers.dev/

## 理科（化学基礎）
- `/rika/`（トップ）、`/rika/kagaku-kiso/mol.html`、`/rika/kagaku-kiso/sanenki.html`
- 元データ: `tools/rika/kagaku-kiso/<単元>.js`。直したら `node tools/rika/build.js`。
- 単元を足す: データファイルを `kagaku-kiso/` に置き、`tools/rika/build.js` の `KAGAKU_KISO` に1行足して build → push。新しいWorkerは作らない。
