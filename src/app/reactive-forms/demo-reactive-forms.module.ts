import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { InputComponent } from './components/input/input.component';
import { DisplayComponent } from './components/display/display.component';
import { PanelComponent } from './components/panel/panel.component';
import { ConfigurationSectionComponent } from './components/configuration-section/configuration-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TextInputComponent } from './components/text-input/text-input.component'

@NgModule({
  declarations: [
    ContainerComponent,
    InputComponent,
    DisplayComponent,
    PanelComponent,
    ConfigurationSectionComponent,
    TextInputComponent
  ],
  exports: [
    ContainerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DemoReactiveFormsModule { }
