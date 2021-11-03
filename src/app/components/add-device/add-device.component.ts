import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { DeviceService } from 'src/app/services/devices.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  public creatingForm!: FormGroup;
  categories?: Category[];

  constructor(private toastr: ToastrService,
    private categoryService: CategoryService,
    private deviceService: DeviceService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDeviceComponent>) {  }

  ngOnInit(): void {
    this.creatingForm = this.fb.group({
      color: ['',[
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('^[a-zA-Z ]*$')
      ]],
      categoryId: '',
      partNumber: '',
    });

    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categoryService.getAll()
      .subscribe(
        data => {
          this.categories = data.data;
        },
        error => {
          console.log(error);
          this.toastr.success(environment.error(error.status))
        });
  }

  createDevice(): void {
    if(!this.creatingForm.value.color || !this.creatingForm.value.categoryId || !this.creatingForm.value.partNumber) return
    let dataCreate = {
      category: this.creatingForm.value.categoryId.id,
      color: this.creatingForm.value.color,
      partNumber: this.creatingForm.value.partNumber
    }
    this.deviceService.create(dataCreate)
      .subscribe(
        data => {
          this.cancel();
          this.showToasterSuccess();
          window.location.reload();
        },
        error => {
          console.log(error);
          this.toastr.error(environment.error(error.status))
        });
  }

  showToasterSuccess(){
    this.toastr.success(environment.success)
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
