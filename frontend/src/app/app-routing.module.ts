import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { UserAuthModule } from './user-auth/user-auth.module';
import { MainModule } from './main/main.module';

const appRoutes: Routes = [
    { path: '**', redirectTo: 'login'}
];
@NgModule({
    imports: [
        UserAuthModule,
        MainModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports: [RouterModule, UserAuthModule],
    providers: []

})
export class AppRoutingModule { }
