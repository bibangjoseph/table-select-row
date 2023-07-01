import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    isLoad = true;
    isCheckedAll = false;
    idSelected: any[] = []
    users: any
    p = 1;
    constructor(private http: HttpClient) {
    }
    ngOnInit() {
    this.getRandomUsers()
    }

    getRandomUsers() {
        this.http.get('https://randomuser.me/api/?results=20').subscribe((response: any) => {
            this.users = response.results;
            this.users.forEach((user: any) => {
                user.isChecked = false
            })
        });
    }

     toggleCheckAll() {
         if(this.isCheckedAll === false) {
             this.idSelected = []
         } else {
             this.idSelected = []
            this.users.forEach((user: any) => {
              user.isChecked = this.isCheckedAll;
              this.idSelected.push(user.id.value)
            });
         }
    }

    selectPerson(id: any) {
        const person = this.users.find((user: any) => user.id.value === id);
        const index = this.idSelected.indexOf(id);
        if(index === -1) {
            this.idSelected.push(id)
        } else {
            this.idSelected.splice(index, 1)
        }
    }
}
