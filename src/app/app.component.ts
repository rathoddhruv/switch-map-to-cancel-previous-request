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
  delay,
  from
} from "rxjs/operators";
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
    // this.switch$ = this.searchString$.pipe(
    //   switchMap(x =>
    //     this.http.get("https://jsonplaceholder.typicode.com/users").pipe(
    //       delay(1000),
    //       map(y => `outer: ${x}, inner: ${y[0]}`)
    //     )
    //   )
    // );

    // this.buttonClick().subscribe(x => (this.switch$ = x));
  }

  buttonClick() {
    // debugger
    return Observable.create().pipe(
    // return this.searchString.pipe(
      switchMap(y => {
         return this.http.get("https://jsonplaceholder.typicode.com/users").pipe(map(
           z => {
             return z;
           }
         )
         );
      })
    );
  }
}
