import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PokemonService } from '../../service/pokemon-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalhes',
  imports: [ MatCardModule, MatButtonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.css'
})
export class DetalhesComponent {

  pokemons:any[]=[];
  pokemon:any;

  constructor(
    private service: PokemonService,
    private route : ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit():void{
    const name = this.route.snapshot.paramMap.get('name')
    this.detalhePokemon(name!);
  }

  detalhePokemon(name:string){
    this.service.getDetalhes(name).subscribe((response)=>{
      console.log(response)
      this.pokemon = response;
    })
  }

  retorna(){
    this.router.navigate(['']);
  }

}
