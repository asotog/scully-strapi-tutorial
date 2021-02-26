import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
}, {
  path: 'p',
  loadChildren: () => import('./post/post.module').then(m => m.PostModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
