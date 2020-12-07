import { AuthHelperService } from 'core/services/auth-helper.service';
import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const teacherROUTES: RouteInfo[] = [
    { path: '/teacher/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/teacher/dashboard/profile', title: 'My Profile', icon: 'nc-single-02', class: '' },
    { path: '/teacher/dashboard/calendar', title: 'My Calendar', icon: 'nc-calendar-60', class: '' },
    { path: '/teacher/dashboard/resources', title: 'My Resources', icon: 'nc-book-bookmark', class: '' },
    { path: '/teacher/dashboard/class-logs', title: 'My Class Log', icon: 'nc-paper', class: '' },
    { path: '/teacher/dashboard/payments', title: 'My Payment', icon: 'nc-money-coins', class: '' },
    { path: '/teacher/dashboard/reviews', title: 'My Teacher Reviews', icon: 'nc-bulb-63', class: '' },
];

export const studentROUTES: RouteInfo[] = [
    { path: '/student/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    { path: '/student/dashboard/profile', title: 'My Profile', icon: 'nc-single-02', class: '' },
    { path: '/student/dashboard/calendar', title: 'My Calendar', icon: 'nc-calendar-60', class: '' },
    { path: '/student/dashboard/resources', title: 'My Resources', icon: 'nc-book-bookmark', class: '' },
    { path: '/student/dashboard/class-logs', title: 'My Class Log', icon: 'nc-paper', class: '' },
    { path: '/student/dashboard/report-card', title: 'My Report Card', icon: 'nc-money-coins', class: '' },
    { path: '/student/dashboard/accounts', title: 'My Account Status', icon: 'nc-money-coins', class: '' },
    { path: '/student/dashboard/teacher-reviews', title: 'My Teacher Reviews', icon: 'nc-bulb-63', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    constructor(private authHelper: AuthHelperService) { }
    ngOnInit() {
        console.log('22');
        
        if (this.authHelper.currentUser.t == 't') {
            this.menuItems = teacherROUTES.filter(menuItem => menuItem);
        } else if (this.authHelper.currentUser.t == 's') {
            this.menuItems = studentROUTES.filter(menuItem => menuItem);
        }
    }
}
