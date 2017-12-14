import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { routing } from './home.routing';
import {NgxPaginationModule} from 'ngx-pagination';
import { PostComponent } from '../../shared/post/post.component';
import { SummaryPipeModule } from '../../../core/pipes/summary/summary-pipe.module';

@NgModule({
    declarations: [
        HomeComponent,
        PostComponent
    ],
    imports: [
         CommonModule,
         routing,
         NgxPaginationModule,
         SummaryPipeModule
        ],
    exports: [],
    providers: [],
})
export class HomeModule {}