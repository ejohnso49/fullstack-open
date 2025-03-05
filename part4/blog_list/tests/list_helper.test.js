const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("dummy", () => {
  test("returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("totalLikes", () => {
  const blogList = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b523676234d17f8",
      title: "Go Harm",
      author: "Ed W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 4,
      __v: 0,
    },
    {
      _id: "5a4223a71b523676234d17f8",
      title: "Go To d Harmful",
      author: "Edsger W. Ijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];

  test("when list has one blog, likes equal to single blogs", () => {
    const listWithOneBlog = blogList.slice(0, 1);
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, listWithOneBlog[0].likes);
  });

  test("of a list with multiple items", () => {
    const result = listHelper.totalLikes(blogList);
    assert.strictEqual(result, 5 + 4 + 3);
  });

  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });
});

describe("favoriteBlog", () => {
  const blogListSingleHighest = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422aa71b523676234d17f8",
      title: "Go Harm",
      author: "Ed W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a4223a71b523676234d17f8",
      title: "Go To d Harmful",
      author: "Edsger W. Ijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];

  const blogListMultipleHighest = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b523676234d17f8",
      title: "Go Harm",
      author: "Ed W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a4223a71b523676234d17f8",
      title: "Go To d Harmful",
      author: "Edsger W. Ijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 0,
      __v: 0,
    },
  ];

  test("empty lists returns favorite as undefined", () => {
    const result = listHelper.favoriteBlog([]);
    assert.deepStrictEqual(result, undefined);
  });

  test("returns the highest liked items", () => {
    const result = listHelper.favoriteBlog(blogListSingleHighest);
    assert.deepStrictEqual(result, blogListSingleHighest[1]);
  });

  test("returns the first item if multiple have same number of likes", () => {
    const result = listHelper.favoriteBlog(blogListMultipleHighest);
    assert.deepStrictEqual(result, blogListMultipleHighest[0]);
  });
});
