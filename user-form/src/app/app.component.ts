import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'SignUp Form';
  selectedCountry:any[] = [];
  pcodeplaceholder: string = ''
  userAge:any = 0
  
  


  constructor(private fb: FormBuilder) {}
// Countries and Cities List
  countries = [
    {id:1, name:'France',
    city:[{id:101, cname:'Paris'},
    {id:102, cname:'Lyon'}]},
    {id:2, name:'Germany',
    city:[{id:201, cname:'Berlin'},
    {id:202, cname:'Munich'}]},
    {id:3, name:'Portugal',
    city:[{id:301, cname:'Porto'},
    {id:302, cname:'Lisbon'}]},
    {id:4, name:'Sweden',
    city:[{id:401, cname:'Stockholm'},
    {id:402, cname:'Gothenburg'}]},
    {id:5, name:'Spain',
    city:[{id:101, cname:'Madrid'},
    {id:102, cname:'Barcelona'}]}
  ]



sForm: FormGroup;

//Form Initialization and Validators
  ngOnInit(): void {

    this.sForm = this.fb.group({
      name:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
      niff:new FormControl('',[Validators.required,Validators.minLength(9)]),
      email:new FormControl('',[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      dob:new FormControl(null,[Validators.required]),
      country:new FormControl(null,[Validators.required]),
      city:new FormControl(null,[Validators.required]),
      address:new FormControl('',[Validators.required]),
      pcode:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required,Validators.pattern('^(3|2|9)\\d{8}'),Validators.maxLength(9)]),
      gender:new FormControl('',Validators.required)
      
     
     
    })
// Portugal Country,City and P.O Box Checks

    this.sForm.get('country')?.valueChanges.subscribe((res: number)=>{
      if(res){
        this.selectedCountry = this.countries.filter((obj: any) => obj.id === res)[0].city;
        
        if(this.country.value === 3)
        {
          this.sForm.get('pcode').setValue(null)
          this.sForm.get('pcode').addValidators([Validators.required,Validators.pattern('[1-9]\\d{3}(-)\\d{3}')])
          this.pcodeplaceholder = 'xxxx-xxx';
          
          
                 } else
                 {
                  this.sForm.get('pcode').setValue(null)
                  this.sForm.get('pcode').clearValidators();
                  this.sForm.get('pcode').addValidators([Validators.required]);
                  this.pcodeplaceholder = '';
                 }
                }
           } )
//Date of Birth to Age Calculation

          this.sForm.get('dob')?.valueChanges.subscribe((res)=>{
            let diff:any = new Date(res)
            let timeCurrent:any = new Date() 
            let age:any = timeCurrent - diff
            this.userAge = (age/(1000 * 3600 * 24)/365.25)
            if(this.userAge < 18 )
            {
              this.sForm.get('dob')?.setErrors({'underage': true});
            }

            
         
               } )


  //NIFF Calculator

  this.sForm.get('niff')?.valueChanges.subscribe((res)=>{
    if(res){
    
   
   const contribuinte = res
   
   let temErro=0;
  
  if (
  contribuinte.substr(0,1) != '1' && // pessoa singular
  contribuinte.substr(0,1) != '2' && // pessoa singular
  contribuinte.substr(0,1) != '3' && // pessoa singular
  contribuinte.substr(0,2) != '45' && // pessoa singular não residente
  contribuinte.substr(0,1) != '5' && // pessoa colectiva
  contribuinte.substr(0,1) != '6' && // administração pública
  contribuinte.substr(0,2) != '70' && // herança indivisa
  contribuinte.substr(0,2) != '71' && // pessoa colectiva não residente
  contribuinte.substr(0,2) != '72' && // fundos de investimento
  contribuinte.substr(0,2) != '77' && // atribuição oficiosa
  contribuinte.substr(0,2) != '79' && // regime excepcional
  contribuinte.substr(0,1) != '8' && // empresário em nome individual (extinto)
  contribuinte.substr(0,2) != '90' && // condominios e sociedades irregulares
  contribuinte.substr(0,2) != '91' && // condominios e sociedades irregulares
  contribuinte.substr(0,2) != '98' && // não residentes
  contribuinte.substr(0,2) != '99' // sociedades civis
  
  ) { temErro=1;}
  let check1 = contribuinte.substr(0,1)*9;
  let check2 = contribuinte.substr(1,1)*8;
  let check3 = contribuinte.substr(2,1)*7;
  let check4 = contribuinte.substr(3,1)*6;
  let check5 = contribuinte.substr(4,1)*5;
  let check6 = contribuinte.substr(5,1)*4;
  let check7 = contribuinte.substr(6,1)*3;
  let check8 = contribuinte.substr(7,1)*2;
  
  let comparador;
  let total = check1 + check2 + check3 + check4 + check5 + check6 + check7 + check8;
  let divisao = total / 11;
  let modulo11 = total - Number(divisao)*11;
  if ( modulo11==1 || modulo11==0){ comparador=0; } 
  else { comparador= 11-modulo11;}
  
  
  let ultimoDigito=contribuinte.substr(8,1)*1;
  if ( ultimoDigito != comparador ){ temErro=1;}
  
  if (temErro==1)
  { 
   
    this.sForm.get('niff')?.setErrors({'nifferror': true});
} 

  
                
             
   }
   } )
  




  }
  
   register()
  {
    console.log(this.sForm)
    this.sForm.reset();
  }

  get name()
  {
    
    return this.sForm.get('name');
    
  }

  get niff()
  {
    return this.sForm.get('niff');
  }
  get email()
  {
    return this.sForm.get('email');
  }

  get dob()
  {
    return this.sForm.get('dob');
  }
  get country()
  {
      return this.sForm.get('country');
   }

  get city()
  {
    return this.sForm.get('city');
  }

  get address()
  {
    return this.sForm.get('address');
  }

  get pcode()
  {
    return this.sForm.get('pcode')
  }

  get phone()
  {
    return this.sForm.get('phone');
  }
  get gender()
  {
    return this.sForm.get('gender');
  }
  

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }


  

  

  

}
