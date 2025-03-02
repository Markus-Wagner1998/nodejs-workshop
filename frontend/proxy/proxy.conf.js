const PROXY_CONFIG = [
    {
        context: [
            "/game/**"
        ],
        "target": "http://localhost:3000/",
        "secure": false,
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader('webpass-remote-user','TOTO_USER');
        },
    },
    {
        context: [
            "/.well-known/**",
            "/realms/**"
        ],
        "target": "http://localhost:8999/",
        "secure": false,
        onProxyReq: (proxyReq) => {
            proxyReq.setHeader('webpass-remote-user','TOTO_USER');
        },
    },
];

module.exports = PROXY_CONFIG;
