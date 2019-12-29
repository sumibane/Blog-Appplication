import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import {ActivatedRoute,Router} from '@angular/router';
//Using ngx-toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentData:any;
  public edit_data:any;
  public possibleCategory = ["Comedy", "Action", "Technology", "Drama "];

  constructor(public blog:BlogService, public route:ActivatedRoute,private _route:Router,private toastr: ToastrService) { }

  ngOnInit() {
    let blogRoute = this.route.snapshot.paramMap.get('blogId');
    this.currentData= this.blog.currentData(blogRoute).subscribe(
      data => {
        this.currentData= data["data"];
        this.edit_data = data["data"];
      },
      error =>{
        console.log(error.errorMessage);
      }
    )
  }

  public editcurrentBlog(){
      this.blog.editBlog(this.currentData.blogId, this.currentData).subscribe(
        data => {
          if(this.edit_data == this.currentData) {
            console.log("If condition success");
            console.log(this.edit_data,this.currentData);
            this.toastr.warning('Blog edited Successfully!','Warning!');
            setTimeout(() => {this._route.navigate(['/blog/view/'+this.currentData.blogId])},2000);
          }
          else{
            console.log("Else condition success");
            console.log(this.edit_data,this.currentData);
            this.toastr.success("No changes in the data was made", 'Warning!');
            setTimeout(() => {this._route.navigate(['/blog/view/'+this.currentData.blogId])},2000);
          }          
        },
        error => {
          this.toastr.error('Failed to make changes in the Blog', 'Error!');
        }
      );
  }
}
