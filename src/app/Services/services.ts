import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Services {

  private URL: String = "http://localhost:8080/information";
  private headers: HttpHeaders;
  constructor(private http: HttpClient) { }

  public consultInfo(JsonToSend) {
    console.log("services - consultInfo - Init");
    return new Promise((resolve, reject) => {
      this.headers = new HttpHeaders();
      this.headers = this.headers.append('Content-Type', 'application/json');
      let url = `${this.URL}`
      console.log("services - consultInfo - Json to send ", JSON.stringify(JsonToSend));
      console.log("services - consultInfo - completedUrl", url);
      this.http.post(url,JSON.stringify(JsonToSend),{ headers: this.headers }).subscribe(res => {
        resolve(res);
        console.log("services - consultInfo - resolve: ", res);
      }, (err) => {
        reject(err);
      });

    });
  }
}
