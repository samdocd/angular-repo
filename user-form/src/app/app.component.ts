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
    
      let nifferror=0;
      const niff = res

      let check1 = niff.substr(0,1)*9;
      let check2 = niff.substr(1,1)*8;
      let check3 = niff.substr(2,1)*7;
      let check4 = niff.substr(3,1)*6;
      let check5 = niff.substr(4,1)*5;
      let check6 = niff.substr(5,1)*4;
      let check7 = niff.substr(6,1)*3;
      let check8 = niff.substr(7,1)*2;
      let controldigit = niff.substr(8,1)

      let total = check1 + check2 +check3 + check4 + check5 + check6 + check7 + check8
      let division = total % 11
      let final = 11 - division
      
      if(final > 9 )
      {
        final = 0;
      }
      

      if(final == controldigit)
      {
        
        nifferror=1;
      }else
      {
        nifferror=0;
        
      }

      if(nifferror==0)
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
