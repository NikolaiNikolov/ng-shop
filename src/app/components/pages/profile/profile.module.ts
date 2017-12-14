 import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { routing } from './profile.routing';
import { SummaryPipeModule } from '../../../core/pipes/summary/summary-pipe.module';
import { NgxPaginationModule } from 'ngx-pagination';
 
 @NgModule({
     declarations: [ProfileComponent],
     imports: [ 
         CommonModule,
        routing,
        NgxPaginationModule,
        SummaryPipeModule
    ],
     exports: [],
     providers: [],
 })
 export class ProfileModule {}