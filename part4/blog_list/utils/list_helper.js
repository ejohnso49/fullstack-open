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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
