import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from './posts.service';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: PostsService,
    },
  ],
})
export class SharedModule {}
