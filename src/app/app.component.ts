import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app5';

  @ViewChild('form',{static:true}) form!:NgForm;
  contenitoreForm!: FormGroup;

  eroe: {
    name: string,
    alterEgo: string,
    power: string,
    enemy: string,
    planet: string,
    weakness: string | null
  } = {
    name: '',
    alterEgo: '',
    power: '',
    enemy: '',
    planet: '',
    weakness: ''
  }

  powers : {
    label: string
  }[] = [
    {
      label: 'laser'
    },
    {
      label: 'fire'
    },
    {
      label: 'water'
    },
    {
      label: 'ice'
    }
  ]

  private fb: FormBuilder;

  constructor(private _fb: FormBuilder){
      this.fb = _fb;
  }

  validPlanet = (formC: FormControl) => {
    if(String(formC.value).length < 5){
      return { 'planetShort' : true};
    }else{
      return null;
    }
  }

  validEnemy = (formC: FormControl) => {
    if(String(formC.value).length > 10){
      return { 'enemyLong' : true};
    }else{
      return null;
    }
  }


  ngOnInit(): void {
    this.form.statusChanges?.subscribe(stato => {
        console.log(stato);
    });

    this.contenitoreForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      alterEgo: this.fb.control(null, [Validators.required]),
      power: this.fb.control(null, [Validators.required]),
      enemy: this.fb.control(null, [Validators.required, this.validEnemy]),
      planet: this.fb.control(null, [Validators.required, this.validPlanet]),
      weakness: this.fb.control(null, [])
    })
  }

  getFormC(nome:string){
    return this.contenitoreForm.get(nome);
  }

  getErrorsC(nome:string, errore:string){
    return this.contenitoreForm.get(nome)!.errors![errore];
  }

  submitForm():void{
    this.eroe.name = this.form.value.eroeInfo.name;
    this.eroe.alterEgo = this.form.value.eroeInfo.alterEgo;
    this.eroe.power = this.form.value.eroeInfo.power;
    this.eroe.enemy = this.form.value.eroeInfo.enemy;
    this.eroe.weakness = this.form.value.eroeInfo.weakness;
    this.eroe.planet = this.form.value.eroeInfo.planet;
    console.table(this.eroe);
    this.form.reset();
  }
}
