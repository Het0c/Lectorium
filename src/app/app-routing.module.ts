
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
    {path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)},

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
  },
  {
    path: 'book-preview',
    loadChildren: () => import('./book-preview/book-preview.module').then( m => m.BookPreviewPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosModule)
  },



];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
