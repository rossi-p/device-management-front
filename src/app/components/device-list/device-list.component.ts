import { Component, OnInit } from '@angular/core';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/devices.service';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceComponent } from 'src/app/components/add-device/add-device.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  devices?: Device[];
  currentDevice: Device = {};
  currentIndex = 0;
  title = '';

  constructor(private toastr: ToastrService,
    private deviceService: DeviceService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveDevices();
  }

  retrieveDevices(): void {
    this.deviceService.getAll()
      .subscribe(
        data => {
          this.devices = data.data;
          this.currentDevice = data.data[0]
        },
        error => {
          console.log(error);
          this.toastr.success(environment.error(error.status))
        });
  }

  refreshList(): void {
    this.retrieveDevices();
    this.currentDevice = {};
    this.currentIndex = 0;
  }

  setActiveDevice(device: Device, index: number): void {
    this.currentDevice = device;
    this.currentIndex = index;
  }

  searchName(): void {
    this.currentDevice = {};
    this.currentIndex = -1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      minWidth: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteDevice(id: any) {
    this.deviceService.delete(id)
      .subscribe(
        (data) => {
          this.toastr.success(environment.success)
          this.devices = this.devices?.filter(device => device.id !== id)
        },
        error => {
          console.log(error);
          this.toastr.success(environment.error(error.status))
        });
  }

}