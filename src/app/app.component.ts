import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { NgModel } from "@angular/forms";
import {
  concatMap,
  mergeMap,
  switchMap,
  map,
  take,
  delay
} from "rxjs/operators";
import { from,of } from 'rxjs';
import "rxjs/add/observable/from";
import { HttpClient } from "@angular/common/http";
import { timer } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  searchString: Subject<string> = new Subject();
  searchString$: Observable<string> = this.searchString.asObservable();
  switch$: Observable<string>;
  concat$: Observable<string>;
  merge$: Observable<string>;
  switch:any;

  updateSearch(value) {
    this.searchString.next(value);
    this.buttonClick().subscribe(x => {
      // debugger
      console.log(x);
      this.switch = JSON.stringify(x);
    });
  }

  ngOnInit() {

  }

  buttonClick() {
    // debugger
    return from([1]).pipe(
    // return this.searchString.pipe(
      switchMap(y => {
         return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(delay(2000),map(
           z => {
             return z;
           }
         )
         );
      })
    );
  }
}
