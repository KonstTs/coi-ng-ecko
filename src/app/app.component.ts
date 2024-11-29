import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PfDashboardViewModelService } from './views/dashboard/dashboard-viewmodel.service';
import { PfTableViewModelService } from './shared/structure/table/table-viewmodel.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PfCoingeckoService } from './api/services/coins-services.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers:[PfDashboardViewModelService, PfCoingeckoService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coi-ng-ecko';
}
