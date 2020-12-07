import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
      var speed = 500;
      $('.accordion .faq-box:first-child').addClass('active');      
      $('.accordion .faq-box:first-child .answer').slideDown(speed);
      $('.accordion .faq-box.active .question').find('i').toggleClass('fa-minus');
      $('.accordion .faq-box').on('click', function(){
        $('.accordion .faq-box').removeClass('active');
        $('.accordion .faq-box .answer').slideUp(speed);
        $(this).addClass('active');
        $(this).find('.answer').slideToggle(speed);
        $('.accordion .question').find('i').removeClass('fa-minus');
        $(this).find('i').toggleClass('fa-minus');  
      });
    });
  }

}
