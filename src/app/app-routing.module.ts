import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Ingresado } from './guards/ingresado.guard';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookListComponent } from './book-list/book-list.component'; // Importa el componente


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
    { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
    { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
    { path: 'verify-code', loadChildren: () => import('./verify-code/verify-code.module').then(m => m.VerifyCodePageModule) },
    { path: 'update-password', loadChildren: () => import('./update-password/update-password.module').then(m => m.UpdatePasswordPageModule) },
    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [Ingresado]
    },
    { path: 'book-search', component: BookSearchComponent },
    { path: 'book-list', component: BookListComponent }, // Añade la ruta para book-list
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule) },
    { path: '**', redirectTo: 'not-found' },
  {
    path: 'verify-code',
    loadChildren: () => import('./verify-code/verify-code.module').then( m => m.VerifyCodePageModule)
  },
  {
    path: 'update-password',
    loadChildren: () => import('./update-password/update-password.module').then( m => m.UpdatePasswordPageModule)
  },


  

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
