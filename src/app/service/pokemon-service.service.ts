import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL = `https://pokeapi.co/api/v2/pokemon`;

  constructor(private http: HttpClient) { }

  public getPokemons(){
    return this.http.get(this.baseURL);
  }

  public getDetalhes(name: string){
    return this.http.get(`${this.baseURL}/${name}`)
  }

}
