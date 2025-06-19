import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../service/pokemon-service.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule, BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  imports: [ MatCardModule, MatButtonModule, MatGridListModule, LayoutModule, MatButtonModule,
    MatIconModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  pokemons:any[]=[];
  cols:number = 3;

  constructor(
    private service: PokemonService,
    private breakpointObserver: BreakpointObserver,
    private route: Router,
  ){
    this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe(result => {
        this.cols = result.matches ? 1 : 4;
      });
  }

  ngOnInit():void{
    this.getListPokemons();
  }

  detalhe(name:string){
    this.route.navigate([`/detalhes/${name}`]);
  }

  like(pokemonId: number){
    const likes = JSON.parse(localStorage.getItem('likedPokemons')||'[]');

    if(!likes.includes(pokemonId)){
      likes.push(pokemonId);
      localStorage.setItem('likedPokemons', JSON.stringify(likes));
    }  else if(likes.includes(pokemonId)){
      let index = likes.indexOf(pokemonId);
      console.log(index);
      likes.splice(index, 1);
    }
  }

  isLiked(pokemonId:number):boolean{
    const likes = JSON.parse(localStorage.getItem('likedPokemons')||'[]');
    return likes.includes(pokemonId);
  }

  getListPokemons(){
    this.service.getPokemons().subscribe((response: any)=>{
      response.results.forEach((result: any)=>{
        this.service.getDetalhes(result.name).subscribe((pokemon:any)=>{
          this.pokemons.push(pokemon);
        })
      })
      console.log(this.pokemons);
    })
  }

}
