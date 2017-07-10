exports.DATABASE_URL =
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "mongodb://farmer:family@ds027628.mlab.com:27628/family-farm"
    : "mongodb://localhost/familyfarm");
exports.PORT = process.env.PORT || 8080;
