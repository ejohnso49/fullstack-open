const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) {
    return undefined;
  }

  return blogs.reduce((currentMaxBlog, blog) => {
    if (blog.likes > currentMaxBlog.likes) {
      return blog;
    } else {
      return currentMaxBlog;
    }
  }, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (blogs.length < 1) {
    return undefined;
  }

  const blogCountMap = blogs.reduce((blogCount, blog) => {
    const currentCount = blogCount[blog.author] || 0;
    blogCount[blog.author] = currentCount + 1;
    console.log(`${blog.author}: ${blogCount[blog.author]}`);
    return blogCount;
  }, {});

  return Object.keys(blogCountMap).reduce((result, author) => {
    if (blogCountMap[author] > result.blogs) {
      result.author = author;
      result.blogs = blogCountMap[author];
    }

    return result;
  }, { author: "", blogs: 0 });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
