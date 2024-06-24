import { Injectable } from '@angular/core';
import { cockTail } from './cocktail.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailDataService {
  private cocktails:cockTail[] = [];
  private favouriteCockTails:cockTail[] = [];
  private detail:cockTail;
  constructor(private http:HttpClient) { }

  getCockTails(){
    return this.http.get<cockTail[]>('/cockails');
  }

  getcockTailDetails(id:string){
    const params = {'id':id};
    return this.http.get<cockTail>(`cockails/${id}`,{params});
  }

  getData():Observable<cockTail[]>{
    return this.getCockTails().pipe(tap((data)=>{
      this.cocktails = data;
    }))
  }

  getDataDetail(id:string):Observable<cockTail>{
    return this.getcockTailDetails(id).pipe(tap((data)=>{
      this.detail = data;
    }))
  }

  FavouriteToggle(item:cockTail){
    const index = this.favouriteCockTails.findIndex((selected:cockTail) =>{
      return selected.id === item.id
    });
    if(index === -1){
      this.favouriteCockTails.push(item);
    }else{
      this.favouriteCockTails.splice(index,1);
    }
    sessionStorage.setItem('favouriteCockTails',JSON.stringify(this.favouriteCockTails))
  }

  cockTailSelected(item:cockTail){
    const favkey = sessionStorage.getItem('favouriteCockTails');
    if(favkey){
      this.favouriteCockTails = JSON.parse(favkey);
    }
    return this.favouriteCockTails.some((element:cockTail) => item.id === element.id)
  }

}
