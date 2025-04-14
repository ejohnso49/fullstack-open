const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = (await User.find({})).at(0);
  const blog = new Blog({
    user: user.id,
    ...request.body,
  });

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newBlog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    newBlog,
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(404).json({ error: `Blog does not exist with id: ${id}` });
  }
});

module.exports = blogsRouter;
