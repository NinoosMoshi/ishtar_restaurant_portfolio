import { Category } from './../../model/category';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { AuthenticationService } from 'src/app/services/security/authentication.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories(){
    this.categoryService.getAllCategories().subscribe(
      data =>{
        this.categories = data
      }
    )
  }






}
