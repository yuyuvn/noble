const bplist = require('bplist-parser');

module.exports = function(uuid, callback) {
  bplist.parseFile('/Library/Preferences/com.apple.Bluetooth.plist', (err, obj) => {
    if (err) {
      return callback(err);
    } else if (obj[0].CoreBluetoothCache === undefined) {
      return callback(new Error('Empty CoreBluetoothCache entry!'));
    }

    uuid = uuid.toUpperCase();

    const formattedUuid = `${uuid.substring(0, 8)}-${uuid.substring(8, 12)}-${uuid.substring(12, 16)}-${uuid.substring(16, 20)}-${uuid.substring(20)}`;

    const coreBluetoothCacheEntry = obj[0].CoreBluetoothCache[formattedUuid];
    const address = coreBluetoothCacheEntry ? coreBluetoothCacheEntry.DeviceAddress.replace(/-/g, ':') : undefined;

    callback(null, address);
  });
};
