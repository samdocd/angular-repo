import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-dialog';

  public dialogPosition: Object = {
    X:'center', Y:'center'
  }
  public isModal: boolean = true;
  public showIconClose: boolean = true;
  public animation: string = 'none'
  public autocap: string = 'off'

  @ViewChild('template') ejDialog: DialogComponent | any;
  // The Dialog shows within the target element.
  @ViewChild('root-container', { read: ElementRef, static: true }) container: ElementRef | any;
  // The Dialog shows within the target element.
  public targetElement?: HTMLElement;

  // To get all element of the dialog component after component get initialized.
  ngOnInit() {
    this.initilaizeTarget();
  }

  // Initialize the Dialog component target element.
  public initilaizeTarget: EmitType<object> = () => {
    this.targetElement = this.container.nativeElement.parentElement;
  }
  // Sample level code to handle the button click action
  public onOpenDialog = (event: any): void => {
      // Call the show method to open the Dialog
      this.ejDialog.show();
  };
  // Sample level code to hide the Dialog when click the Dialog overlay
  public closeDialog = (event: any): void => {
    // Call the show method to open the Dialog
    this.ejDialog.hide();
  }

  public onOverlayClick: EmitType<object> = () => {
    this.ejDialog.hide();
}



}
