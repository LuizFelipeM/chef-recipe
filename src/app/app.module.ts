import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { InformationComponent } from './information/information.component';
import { StepComponent } from './step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    StepComponent
  ],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }