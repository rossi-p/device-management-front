import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from 'src/app/components/add-category/add-category.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories?: Category[];
  currentCategory: Category = {};
  currentIndex = 0;
  title = '';

  constructor(private toastr: ToastrService,
    private categoryService: CategoryService, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.retrieveCategories();
  }

  retrieveCategories(): void {
    this.categoryService.getAll()
      .subscribe(
        data => {
          this.categories = data.data;
          this.currentCategory = data.data[0]
        },
        error => {
          console.log(error);
          this.toastr.success(environment.error(error.status))
        });
  }

  refreshList(): void {
    this.retrieveCategories();
    this.currentCategory = {};
    this.currentIndex = 0;
  }

  setActiveCategory(category: Category, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }

  searchName(): void {
    this.currentCategory = {};
    this.currentIndex = -1;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      minWidth: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteCategory(id: any) {
    this.categoryService.delete(id)
      .subscribe(
        (data) => {
          this.toastr.success(environment.success)
          this.categories = this.categories?.filter(category => category.id !== id)
        },
        error => {
          console.log(error);
          this.toastr.success(environment.error(error.status))
        });
  }

}