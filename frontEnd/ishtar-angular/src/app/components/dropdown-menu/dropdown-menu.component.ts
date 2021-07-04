import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent implements OnInit {

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
