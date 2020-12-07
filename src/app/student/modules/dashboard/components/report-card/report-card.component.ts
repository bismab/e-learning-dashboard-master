import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('document').ready(function(){
      $('.details').on('click', function(e){
        e.preventDefault();
        $('.details').siblings('.tables').slideUp(500);
        $(this).siblings('.tables').slideToggle(800);
      });
    });
  }

}
