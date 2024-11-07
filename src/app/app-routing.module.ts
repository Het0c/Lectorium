<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './guards/ingresado.guard';


const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
    { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
    { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule) },
    { path: 'verify-code', loadChildren: () => import('./verify-code/verify-code.module').then(m => m.VerifyCodePageModule) },
    { path: 'update-password', loadChildren: () => import('./update-password/update-password.module').then(m => m.UpdatePasswordPageModule) },


    { path: 'book-preview', loadChildren: () => import('./book-preview/book-preview.module').then(m => m.BookPreviewPageModule) },


    {
        path: '',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
        canActivate: [IngresadoGuard]
    },

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
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
=======
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './guards/ingresado.guard';
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
        canActivate: [IngresadoGuard]
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
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },  {
    path: 'libros-ciencia',
    loadChildren: () => import('./libros-ciencia/libros-ciencia.module').then( m => m.LibrosCienciaPageModule)
>>>>>>> 3c52276b39fb5c3b563e75a4d58b0b72c60301a4
  },
  {
    path: 'book-preview',
    loadChildren: () => import('./book-preview/book-preview.module').then( m => m.BookPreviewPageModule)
  },






  

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
