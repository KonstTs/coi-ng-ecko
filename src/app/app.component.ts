import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PfDashboardViewModelService } from './views/dashboard/dashboard-viewmodel.service';
import { HttpClientModule } from '@angular/common/http';
import { PfCoingeckoService } from './api/services/coins-services.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PfTextComponent } from './shared/input/text/text.component';
import { PfTableComponent } from './shared/structure/table/table.component';
import { PfSelectComponent } from './shared/input/select/select.component';
import { PfDeviceService } from './services/device.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  providers:[PfDashboardViewModelService, PfCoingeckoService, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coi-ng-ecko';
  constructor() { 
  }
}
