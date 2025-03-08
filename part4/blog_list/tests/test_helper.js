const Blog = require("../models/blogs");

const initialBlogs = [
  {
    author: "Joe Blow",
    title: "Joe Blows",
    url: "example.com/joe_blow",
    likes: 20,
  },
  {
    author: "Joe Malone",
    title: "Joe Malones",
    url: "example.co.uk/joe_malone",
    likes: 100,
  },
  {
    author: "Joe Schmoe",
    title: "Joe Schmoes",
    url: "example.org/joe_schmoe",
    likes: 1,
  },
];

const getBlogsFromDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

module.exports = {
  initialBlogs,
  getBlogsFromDb,
};
