export const deviceBuilder = ( deviceName, deviceId, isPrimary ) => {
  return {
    deviceName: deviceName,
    deviceId: deviceId,
    isPrimary: isPrimary
  }
}