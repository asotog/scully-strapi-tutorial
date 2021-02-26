import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { tap } from 'rxjs/operators';
import {
  BlogSamplesGQL,
  BlogSamplesQuery,
  BlogSampleGQL,
  BlogSampleQuery,
} from './graphql.gen';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private blogSamplesGQL: BlogSamplesGQL,
    private blogSampleGQL: BlogSampleGQL,
    private transferStateService: TransferStateService
  ) {}

  public getPosts() {
    if (isScullyGenerated()) {
      return this.transferStateService.getState<
        ApolloQueryResult<BlogSamplesQuery>
      >(`/posts`);
    }
    return this.blogSamplesGQL
      .watch()
      .valueChanges.pipe(
        tap((data) =>
          this.transferStateService.setState<
            ApolloQueryResult<BlogSamplesQuery>
          >(`/posts`, data)
        )
      );
  }

  public getPost(postId: string) {
    if (isScullyGenerated()) {
      return this.transferStateService.getState<
        ApolloQueryResult<BlogSampleQuery>
      >(`/p/${postId}`);
    }
    return this.blogSampleGQL
      .watch({ id: postId })
      .valueChanges.pipe(
        tap((data) =>
          this.transferStateService.setState<
            ApolloQueryResult<BlogSampleQuery>
          >(`/p/${postId}`, data)
        )
      );
  }
}
