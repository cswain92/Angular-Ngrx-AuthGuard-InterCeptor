import { logging } from 'protractor';
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  public Data:any;
  constructor(private ds: DataService) { }
 
  ngOnInit() {
    this.ds.getData().subscribe(res => {
    // console.log(res);
    //  this.Data = res;
      for(const property of res){
       // console.log(property);
        this.Data = property['body'];
        console.log(this.Data);
      }
      
    });
    
    
  }

}
