import { Routes } from '@angular/router';
import { TakeUntilComponent } from './take-until/take-until.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DataStructureComponent } from './data-structure/data-structure.component';


export const routes: Routes = [

    { path: '', component: DataStructureComponent },
    // { path: '', component: HomeComponent },
    // { path: 'takeuntil', component: TakeUntilComponent }
];
