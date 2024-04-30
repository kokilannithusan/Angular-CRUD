import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs";
import { updateModel } from "../components/login/jason.model";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class DBservice {
    constructor(private http: HttpClient) { }
    headers = new HttpHeaders().set('content-Type', 'application/json').set('Accept','application/json')
    httpOptions = {headers : this.headers}

    //API KIT function
    postSignup(data: any) {
        return this.http.post<any>("http://localhost:3000/posts", data)
            .pipe(map((res: any) => {
                return res;
            }))
    }
    // API KIT FUNCTION
    getSiugnup(getData: any) {
        return this.http.get<any>("http://localhost:3000/posts", getData)
            .pipe(map((res: any) => {
                return res;
            }))
    }

    // API KIT function for raw of data
    deleteSignup(id: number) {
        return this.http.delete<any>("http://localhost:3000/posts/" + id)
            .pipe(map((res: any) => {
                return res;
            }))
    }

    getSignupById(id:number):Observable<updateModel>{
        return this.http.get<updateModel>("http://localhost:3000/posts/"+ id,this.httpOptions)
        .pipe(map((res: any) => {
            return res;
        }))

    }
    

}
