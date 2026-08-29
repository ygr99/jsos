// 解析官方 JSOS 快照（MessagePack 文件树）——str 按原始字节保留，修复二进制文件被 UTF-8 解码损坏的问题
// 用法: node tools/parse-snapshot.js [快照文件] [输出目录]
const fs = require('fs');
const path = require('path');

function decodeMsgpack(buf) {
  const p = { i: 0 };
  const val = readValue(buf, p);
  return val;
}
function readValue(buf, p) {
  const b0 = buf[p.i++];
  if (b0 <= 0x7f) return b0;                       // positive fixint
  if (b0 >= 0xe0) return b0 - 0x100;               // negative fixint
  if (b0 >= 0x80 && b0 <= 0x8f) return readMapN(buf, p, b0 & 0x0f);
  if (b0 >= 0x90 && b0 <= 0x9f) return readArrN(buf, p, b0 & 0x0f);
  if (b0 >= 0xa0 && b0 <= 0xbf) return readRaw(buf, p, b0 & 0x1f);
  switch (b0) {
    case 0xc0: return null;
    case 0xc2: return false;
    case 0xc3: return true;
    case 0xc4: return readRaw(buf, p, buf[p.i++]);
    case 0xc5: return readRaw(buf, p, buf.readUInt16BE(postInc(p, 2)));
    case 0xc6: return readRaw(buf, p, buf.readUInt32BE(postInc(p, 4)));
    case 0xca: { const f = buf.readFloatBE(p.i); p.i += 4; return f; }
    case 0xcb: { const f = buf.readDoubleBE(p.i); p.i += 8; return f; }
    case 0xcc: return buf[p.i++];
    case 0xcd: { const v = buf.readUInt16BE(p.i); p.i += 2; return v; }
    case 0xce: { const v = buf.readUInt32BE(p.i); p.i += 4; return v; }
    case 0xd9: return readRaw(buf, p, buf[p.i++]);
    case 0xda: return readRaw(buf, p, buf.readUInt16BE(postInc(p, 2)));
    case 0xdb: return readRaw(buf, p, buf.readUInt32BE(postInc(p, 4)));
    case 0xdc: return readArrN(buf, p, buf.readUInt16BE(postInc(p, 2)));
    case 0xdd: return readArrN(buf, p, buf.readUInt32BE(postInc(p, 4)));
    case 0xde: return readMapN(buf, p, buf.readUInt16BE(postInc(p, 2)));
    case 0xdf: return readMapN(buf, p, buf.readUInt32BE(postInc(p, 4)));
    case 0xd0: { const v = buf.readInt8(p.i); p.i += 1; return v; }
    case 0xd1: { const v = buf.readInt16BE(p.i); p.i += 2; return v; }
    case 0xd2: { const v = buf.readInt32BE(p.i); p.i += 4; return v; }
    case 0xd3: { const v = buf.readBigInt64BE(p.i); p.i += 8; return v; }
    case 0xcf: { const v = buf.readBigUInt64BE(p.i); p.i += 8; return v; }
    default: throw new Error('未处理的 msgpack 前缀 0x' + b0.toString(16) + ' @ ' + (p.i - 1));
  }
}
function postInc(p, n) { const v = p.i; p.i += n; return v; }
function readRaw(buf, p, len) { const b = buf.subarray(p.i, p.i + len); p.i += len; return b; } // Buffer 视图：保留原始字节
function readArrN(buf, p, n) { const a = []; for (let i = 0; i < n; i++) a.push(readValue(buf, p)); return a; }
function readMapN(buf, p, n) {
  const o = {};
  for (let i = 0; i < n; i++) {
    const k = readValue(buf, p);
    o[Buffer.isBuffer(k) ? k.toString('utf8') : String(k)] = readValue(buf, p);
  }
  return o;
}

module.exports = { decodeMsgpack };
if (require.main === module) {
  const fs2 = require('fs');
  const path2 = require('path');
  const SRC = process.argv[2] || 'C:/Users/99/Downloads/cn.uapis.hotboard-v2026.7.26/.jsos-snapshot';
  const OUT = process.argv[3] || 'C:/Users/99/jsos-apps/cn.uapis.hotboard';
  const data = decodeMsgpack(fs2.readFileSync(SRC)).d;
  let files = 0, dirs = 0, skipped = [];
  (function walk(node, rel) {
    for (const [name, val] of Object.entries(node)) {
      const p = path2.join(OUT, rel, name);
      if (val && val.f) {
        const c = val.f.c;
        if (!Buffer.isBuffer(c) && typeof c !== 'string') { skipped.push(path2.join(rel, name)); continue; }
        files++;
        fs2.mkdirSync(path2.dirname(p), { recursive: true });
        // 官方导出的缺陷：二进制文件（b===true）被当作 latin1 字符串再存成 UTF-8，
        // 需要逆变换：utf8 解码成 latin1 字符 → 逐字节写回；文本文件按原样写入
        const buf = val.f.b === true
          ? Buffer.from(Buffer.from(c).toString('utf8'), 'latin1')
          : Buffer.from(c);
        fs2.writeFileSync(p, buf);
      } else if (val && val.d) {
        dirs++;
        walk(val.d, path2.join(rel, name));
      } else skipped.push(path2.join(rel, name));
    }
  })(data, '');
  console.log('提取完成：文件', files, '目录', dirs, '跳过', skipped.length);
}
