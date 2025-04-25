const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // Must be "sandbox" or "live"
  client_id: "ASpHvIYGlWmsfBE1tr1AtXa_vui5JpCR9R1Iev_7zhzeAwIVcl22kIYGv-axwkFSTyV4KWrWX1ox4Fzn",
  client_secret: "EE-Nwm0Fc4DgXKRoSc0jNuhrgMv2FDSGmlLsd3BIp8cM46nRMVXawVwWiqrVHwmkpRxtxs69NFTUt6ri",
});

module.exports = paypal;
