package com.niclas.utils;



public class MaintenanceDeviceDto {

    private String deviceName;

    private String deviceId;

    private boolean isPrimary;

    private int maintained = 0;

    private int discarded = 0;

    public MaintenanceDeviceDto() {
    }

    public MaintenanceDeviceDto( String deviceName, String deviceId, boolean isPrimary, int maintained, int discarded ) {
        this.deviceName = deviceName;
        this.deviceId = deviceId;
        this.isPrimary = isPrimary;
        this.maintained = maintained;
        this.discarded = discarded;
    }

 /*   public MaintenanceDeviceDto( Device device ) {
        this.deviceName = device.getDeviceName();
        this.deviceId = device.getDeviceId();
        this.isPrimary = device.getIsPrimary();
    }
*/

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName( String deviceName ) {
        this.deviceName = deviceName;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId( String deviceId ) {
        this.deviceId = deviceId;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public void setPrimary( boolean primary ) {
        isPrimary = primary;
    }

    public int getMaintained() {
        return maintained;
    }

    public void setMaintained( int maintained ) {
        this.maintained = maintained;
    }

    public int getDiscarded() {
        return discarded;
    }

    public void setDiscarded( int discarded ) {
        this.discarded = discarded;
    }
}
