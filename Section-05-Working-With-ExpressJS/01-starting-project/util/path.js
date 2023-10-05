const path = require('path');
// const { mainModule } = require('process');

// module.exports = path.dirname(process.mainModule.filename);

module.exports = path.dirname(require.main.filename);