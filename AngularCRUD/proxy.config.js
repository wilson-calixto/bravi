const proxy = [
  {
    context: ["/api"],
    target: "http://localhost:3000/",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  },
];
module.exports = proxy;
