import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseURL = `https://pokeapi.co/api/v2/pokemon`;

  constructor(private http: HttpClient) { }

  public getPokemons(next:number):Observable<Pokemon[]>{
    console.log(`${this.baseURL}?offset=${next}&limit=16`);
    return this.http.get<Pokemon[]>(`${this.baseURL}?offset=${next}&limit=16`);
  }

  public getDetalhes(name: string){
    return this.http.get(`${this.baseURL}/${name}`)
  }

}
