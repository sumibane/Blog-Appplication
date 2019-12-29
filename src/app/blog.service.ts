import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  //Declarations
  private url = "https://blogapp.edwisor.com/api/v1/blogs/"
  private authToken = "?authToken=ZTAzMmQ2MzA4ZjgyYWMxZTJhYmNlZjAwZjk4MWM0ZjA0NTU4ZDY1NDk2ZWY5Y2IzYmEwMjA1Y2UyN2Y3YWVmNzMwMDJhYjcwYmZhNmM0NzcwOThkOTJjZmJkNTNmNDhmZDM4YTQ1MzQzYzRkZDYwNDQzYjNkNTMwYjYyNjJhMTVjMQ=="


  constructor(private _http:HttpClient) { }

  //Method to return all blogs (used in home component)
  public getData():any{
    let response = this._http.get(this.url+'all'+this.authToken);
    return response;
  }

  //Method to get the current blog(used in view and edit component)
  public currentData(blogIndex:any):any{
    let currentresponse = this._http.get(this.url+'view/'+blogIndex+this.authToken);
    return currentresponse;
  }

  //Method to create a blog(used in create componenet)
  public createBlog(blogData:any):any{
    let createResponse = this._http.post(this.url+'create'+this.authToken, blogData);
    return createResponse;
  }

  //Method to delete the blog(used in view component)
  public deleteBlog(blogId):any {
    let data={}
    let deleteResponse = this._http.post(this.url+blogId+'/delete'+this.authToken,data);
    return deleteResponse;
  }

  //Method to edit the blog
  public editBlog(blogId:any,blogData:any):any {
    let editResponse = this._http.put(this.url+blogId+'/edit'+this.authToken,blogData);
    return editResponse;
  }
  
}
