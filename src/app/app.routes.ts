import { Routes } from '@angular/router';
import { TakeUntilComponent } from './take-until/take-until.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';


export const routes: Routes = [

    { path: '', component: LoginPageComponent },
    // { path: 'takeuntil', component: TakeUntilComponent }
];
