const Blog = require("../models/blogs");
const User = require("../models/user");

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
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({}).populate("blogs", { url: 1, author: 1, title: 1, id: 1 });
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  getBlogsFromDb,
  usersInDb,
};
