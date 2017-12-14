import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponents } from './index';
import { RouterModule } from '@angular/router';
import { SummaryPipeModule } from '../../core/pipes/summary/summary-pipe.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule ],
    declarations: [
        ...SharedComponents,
    ],
    exports: [
        ...SharedComponents
    ]
})
export class SharedModule {}