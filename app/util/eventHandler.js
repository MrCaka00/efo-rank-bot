const reqEvent = event => require(`../events/${event}`);

module.exports = client => { //'Vu4ll#0586

  client.on("message", reqEvent("message"));

};