import { AuthHelperService } from 'core/services/auth-helper.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { teacherROUTES } from '../../sidebar/sidebar.component';
import { studentROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private teacherNavs = [
    //{ path: '/teacher/dashboard', title: 'Dashboard', icon: '', class: 'navbar-brand' },
    { path: '/teacher/training/all', title: 'Trainings', icon: '', class: 'navbar-brand' },
    { path: '/teacher/ticket/all', title: 'Tickets', icon: '', class: 'navbar-brand' },
    { path: '/teacher/faq/all', title: 'FAQs', icon: '', class: 'navbar-brand' },
  ]
  private studentNavs = [
    //{ path: '/student/dashboard', title: 'Dashboard', icon: '', class: 'navbar-brand' },
    { path: '/student/help', title: 'Help', icon: '', class: 'navbar-brand' },
    { path: '/student/ticket/all', title: 'Ticket', icon: '', class: 'navbar-brand' },
    { path: '/student/enrollment/all', title: 'Enrollments', icon: '', class: 'navbar-brand' }
  ]
  navLinks = [];
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    public authHelper: AuthHelperService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    if (this.authHelper.currentUser && this.authHelper.currentUser.t == 't') {
      this.listTitles = teacherROUTES.filter(listTitle => listTitle);
      this.navLinks = this.teacherNavs.filter(nav => nav);
    } else if (this.authHelper.currentUser && this.authHelper.currentUser.t == 's') {
      this.listTitles = studentROUTES.filter(listTitle => listTitle);
      this.navLinks = this.studentNavs.filter(nav => nav);
    }
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }

  logOut() {
    this.authHelper.logOut();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

}
