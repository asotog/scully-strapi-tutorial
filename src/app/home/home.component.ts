import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PostsService } from '../shared/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private querySubscription: Subscription;

  posts: any[] = [];

  constructor(
    private postsService: PostsService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('JamstackNgSpaceships');
    this.querySubscription = this.postsService
      .getPosts()
      .subscribe(({ data, loading }) => {
        this.posts = data.blogSamples || [];
      });
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
