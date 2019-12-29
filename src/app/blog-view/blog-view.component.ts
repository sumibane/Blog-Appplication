import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BlogService } from "../blog.service";
//Using ngx-toastr
import { ToastrService } from "ngx-toastr";
import {Location} from '@angular/common';

@Component({
  selector: "app-blog-view",
  templateUrl: "./blog-view.component.html",
  styleUrls: ["./blog-view.component.css"]
})
export class BlogViewComponent implements OnInit {
  //Declarations
  public currentBlog: any;

  constructor(
    public blog: BlogService,
    private _route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private _location:Location
  ) {}

  ngOnInit() {
    //Get the selected Route
    let receivedId = this._route.snapshot.paramMap.get("blogId");
    this.currentBlog = this.blog.currentData(receivedId).subscribe(
      data => {
        this.currentBlog = data["data"];
      },
      error => {
        console.log(error.errorMessage);
      }
    );
  }
  //Delete blog Method
  public deleteCurrentBlog() {
    this.blog.deleteBlog(this.currentBlog.blogId).subscribe(
      data => {
        this.toastr.success("Blog has been deleted successfully!", "Success!");
        setTimeout(() => {
          this.router.navigate(["/home"]);
        });
      },
      error => {
        this.toastr.error(
          "Blog couldn't be deleted, some issues occured!",
          "Error!"
        );
        console.log(error.errorMessage);
      }
    );
  }
  //Go back function
  public goback()
  {
    this._location.back();
  }
}
