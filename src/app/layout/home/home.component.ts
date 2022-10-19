import { Component, OnInit,ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { TransService } from 'src/app/service/trans.service';
import { FormGroup, NgForm,FormBuilder,Validators,FormArray,FormControl } from '@angular/forms';
import { Table } from 'primeng/table'
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit { 
  @ViewChild('dt') dt: Table | undefined;

  products!:Product[]
  selectProduct!:Product;
  changeid!:string;

  orderForm!:FormGroup;
  rows!: FormArray;
  itemForm!: FormGroup;

  custForm!:FormGroup;
 

  constructor(private Api:TransService,    
    private formBuilder:FormBuilder) {
      this.orderForm = this.formBuilder.group({                 
        lessons: this.formBuilder.array([]) 
      });
   }

  ngOnInit(): void {

    this.Api.getProducts().subscribe(data =>{
      this.products = data
      console.log('ItmCodeModels',this.products);
    } );

    this.custForm = this.formBuilder.group({       
      'customerName': new FormControl(''), 
      'customerEmail': new FormControl(''),
     });

  }

  async onFormSubmit(){
    let data ={
      customerName : this.custForm.value.customerName ,
      customerEmail :this.custForm.value.customerEmail,
      lineItems : this.saveList(),
    }

    this.Api.saveOrders(data).subscribe(res=>{
      console.log(res);
    })  

  }

  onRowSelect(event: any) {
    this.changeid= event.data.productId ;   
  }
  
  selectItem(product: Product) {
    const productId = product.productId ;
    this.addLesson(productId);    
    //this.listOrderForm(detail: product.name);
    //this.messageService.add({severity:'info', summary:'Product Selected', detail: product.name});   
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);

  }

  get lessons() {
    return this.orderForm.controls["lessons"] as FormArray;
  }

  addLesson(event:any) {    
    const lessonForm = this.formBuilder.group({   
      productId: event,
      quantity: [0, Validators.required]
    });
    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }

  async saveList(){
    const submitData: any[] = [];
    this.orderForm.value.lessons.forEach((qu: any) => {
      submitData.push({        
        productId: qu.productId, 
        quantity: qu.quantity,
      });
    }); 


  }



}
