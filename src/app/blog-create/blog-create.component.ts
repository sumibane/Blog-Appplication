import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

//Using ngx-toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  public blogTitle:string;
  public blogBodyHtml:string;
  public blogDescription:string;
  public blogCategory:string;
  public possibleCategory = ["Comedy", "Technical", "Drama","Action"];


  constructor(private blog:BlogService, private route:Router,private toastr: ToastrService) {

   }

  ngOnInit() {
  }
  
  public newBlog() : any {

    //Collect the data in object to pass in the Post request
    let temp_data = {
    title: this.blogTitle,
    description: this.blogDescription,
    blogBody: this.blogBodyHtml,
    category: this.blogCategory
    };

    //Define the method to pass the data
    this.blog.createBlog(temp_data).subscribe(
      data => {
        this.toastr.success('Blog was created Successfully!', 'Success!');
        setTimeout(()=>{this.route.navigate(['blog/view', data.data.blogId])},
        2000)
      },
      error => {
        this.toastr.error('Blog failed to create.', 'Oops!');
        console.log( error.errorMessage);
      }
    )
  }

}
