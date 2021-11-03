import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  public liveForm!: FormGroup;

  constructor(private toastr: ToastrService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCategoryComponent>) {  }

  ngOnInit(): void {
    this.liveForm = this.fb.group({
      name: ''
    });
  }

  createCategory(): void {
    console.log(this.liveForm.value);
    if(!this.liveForm.value.name) return
    this.categoryService.create(this.liveForm.value)
      .subscribe(
        data => {
          this.cancel();
          this.showToasterSuccess();
          window.location.reload();
          console.log("data ::",data);
        },
        error => {
          console.log("error",error.status);
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
