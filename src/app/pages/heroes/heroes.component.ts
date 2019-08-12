import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeComponent } from '../heroe/heroe.component';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeComponent[] = [];
  cargando = false;


  constructor(private heroesService:HeroesService) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes().subscribe( (resp:any) =>{
      this.heroes = resp;
      this.cargando = false;
    })
  }

  borrarHeroe(heroe:HeroeModel, i:number){

    Swal.fire({
      title:"¿Esta Seguro?",
      text: "Esta seguro que desea eliminar a " + heroe.nombre,
      type: 'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(resp => {
      if(resp.value){
        this.heroes.splice(i,1)
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    })

    
  }



}
