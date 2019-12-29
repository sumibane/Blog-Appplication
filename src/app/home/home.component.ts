import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Declarations
  public allBlogs:any;
  
  constructor(public blogs:BlogService) { }

  ngOnInit() {
    this.allBlogs = this.blogs.getData().subscribe(
      data => {
        this.allBlogs = data['data'];
      },
      error => {
        console.log(error.errorMessage);
      }
    )
  }

}
