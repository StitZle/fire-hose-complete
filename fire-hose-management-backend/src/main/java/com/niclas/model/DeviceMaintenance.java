package com.niclas.model;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;


@Entity
@Table
public class DeviceMaintenance extends AuditModel {

    @Id
    @Column( name = "id" )
    @GeneratedValue( strategy = GenerationType.AUTO ) //TODO better config for GenerationType
    private long id;

    @Column( name = "username" )
    private String username;

    @Column( name = "user_id" )
    private String userId;

    @Column( name = "notes", columnDefinition = "TEXT" )
    private String notes;

    @OneToMany( fetch = FetchType.LAZY, cascade = CascadeType.ALL )
    @JoinColumn( name = "device_id" )
    private List<MaintenanceDevice> maintenanceDevices;

    public DeviceMaintenance() {
    }

    public long getId() {
        return id;
    }

    public void setId( long id ) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername( String userName ) {
        this.username = userName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId( String userId ) {
        this.userId = userId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes( String notes ) {
        this.notes = notes;
    }

    public List<MaintenanceDevice> getMaintenanceDevices() {
        return maintenanceDevices;
    }

    public void setMaintenanceDevices( List<MaintenanceDevice> maintenanceDevices ) {
        this.maintenanceDevices = maintenanceDevices;
    }
}
