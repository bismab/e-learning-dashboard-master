import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-my-payments',
  templateUrl: './my-payments.component.html',
  styleUrls: ['./my-payments.component.css']
})
export class MyPaymentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickMe() {
    //alert('yahoo');
    $('.payment-account div').slideToggle(500);
  }

}
