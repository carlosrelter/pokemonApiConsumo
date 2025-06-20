import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../service/pokemon-service.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutModule, BreakpointObserver } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-card-list',
  imports: [ MatCardModule, MatButtonModule, MatGridListModule, LayoutModule, MatButtonModule,
    MatIconModule, MatPaginatorModule
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  showButton = false;
  pokemons:any[]=[];
  cols:number = 3;
  atual= 0;
  next:number=0;
  incrementa=300;

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
    this.getListPokemons(this.next);
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    console.log(this.incrementa)
    this.showButton = scrollY >   this.incrementa;
;



    if(!this.showButton == false ){
      this.nextList();
      this.incrementa = this.incrementa+300;
    }
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
      localStorage.setItem('likedPokemons', JSON.stringify(likes));
    }
  }

  isLiked(pokemonId:number):boolean{
    const likes = JSON.parse(localStorage.getItem('likedPokemons')||'[]');
    return likes.includes(pokemonId);
  }

  getListPokemons(next:number){
    this.service.getPokemons(next).subscribe((response: any)=>{
      response.results.forEach((result: any)=>{
        this.service.getDetalhes(result.name).subscribe((pokemon:any)=>{
          this.pokemons.push(pokemon);
        })
      })
    })
  }

  nextList(){
    this.atual = this.atual +16;
    console.log(this.atual)
    this.getListPokemons(this.atual);
  }

  preview(){}

}
