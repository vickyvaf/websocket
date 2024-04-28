(() => {
  var e = {
      239: (e) => {
        const o = process.env.PORT || 8e3;
        e.exports = { PORT: o };
      },
      903: (e) => {
        "use strict";
        e.exports = require("uuid");
      },
      86: (e) => {
        "use strict";
        e.exports = require("ws");
      },
      611: (e) => {
        "use strict";
        e.exports = require("http");
      },
    },
    o = {};
  function t(r) {
    var s = o[r];
    if (void 0 !== s) return s.exports;
    var n = (o[r] = { exports: {} });
    return e[r](n, n.exports, t), n.exports;
  }
  (() => {
    const { WebSocketServer: e } = t(86),
      o = t(611),
      { v4: r } = t(903),
      { PORT: s } = t(239),
      n = o.createServer(),
      c = new e({ server: n });
    n.listen(s, () => {
      console.log(`server started on port ${s}`);
    });
    const l = {};
    c.on("connection", (e, o) => {
      console.log(
        `new connection: ${o.socket.remoteAddress}:${o.socket.remotePort}`,
        o.rawHeaders[9]
      );
      const t = r();
      (l[t] = e),
        e.on("close", () => {
          console.log(`${t} disconnected`), delete l[t];
        }),
        e.on("message", (e) => {
          const o = JSON.parse(e);
          console.log(`${t} received: `, o);
        }),
        console.log(`${t} connected`);
      const s = setInterval(() => {
        Object.values(l).forEach((e) => {
          const o = new Date().toTimeString();
          e.send(o), console.log(`new message: ${o} was sent to: ${t}`);
        });
      }, 5e3);
      return () => clearInterval(s);
    });
  })();
})();
