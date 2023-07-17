const app = require('./App')
const server = app.listen(8000, function () {
    console.log("listening to the port %s .....", server.address().port);
})