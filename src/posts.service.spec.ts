import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    let testPosts: Post[] = [];

    beforeEach(() => {
      testPosts = posts.map((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const foundPosts = postsService.findMany();
      expect(foundPosts).toEqual(testPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      const limitPosts = testPosts.slice(2, 4);
      const foundPosts = postsService.findMany({ skip: 2, limit: 2 });
      expect(foundPosts).toEqual(limitPosts);
    });

    it('should return empty posts if skip more than array length', () => {
      const foundPosts = postsService.findMany({ skip: 100, limit: 2 });
      expect(foundPosts).toEqual([]);
    });

    it('should return empty posts if limit 0', () => {
      const foundPosts = postsService.findMany({ skip: 0, limit: 0 });
      expect(foundPosts).toEqual([]);
    });
  });
});
