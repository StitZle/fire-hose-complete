export const deviceBuilder = (deviceName, deviceId, isPrimary) => {
    return {
        deviceName: deviceName,
        deviceId: deviceId !== "" ? deviceId : null,
        isPrimary: isPrimary,
    };
};
