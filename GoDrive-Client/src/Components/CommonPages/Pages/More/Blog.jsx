import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../Utils/axios'; // Ensure the path is correct

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs/getblogs');
        if (Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          console.error('Expected data to be an array');
        }
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-serif mb-6 pt-20 text-center">
        On the Move in Chennai
      </h1>
      <h2 className="text-3xl font-serif mb-6 text-center">
        Things to Do and Ways to Get There
      </h2>
      {blogs.length > 0 && blogs[0] && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 shadow-lg p-6 m-4 rounded-lg transform transition-all hover:-translate-y-2 duration-300">
          <div className="w-full lg:w-2/3">
            <img
              className="w-120 h-80 object-cover rounded-lg shadow-lg"
              src={blogs[0].img}
              alt={blogs[0].title}
            />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col">
            <div className="p-4">
              <h1 className="text-black text-xl font-serif font-bold">
                {blogs[0].title || 'Title not available'}
              </h1>
              <p className="text-gray-700 text-base mt-4">
                {blogs[0].content && blogs[0].content.heading ? blogs[0].content.heading.split("\n").map((line, idx) => (
                  <span key={idx}>
                    {line}
                    <br />
                  </span>
                )) : 'Content not available.'}
              </p>
              <p className="text-gray-500 text-sm mt-4">
                {blogs[0].date || 'Date not available'}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/more/blogs/${blog._id}`}
              className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 duration-300"
            >
              <img
                className="w-full h-48 object-cover"
                src={blog.img}
                alt={blog.title}
              />
              <div className="p-4">
                <div className="font-bold text-base mb-2 text-black">
                  {blog.title || 'Title not available'}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  {blog.content && blog.content.heading ? blog.content.heading.split("\n").map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  )) : 'Content not available.'}
                </p>
                {blog.date ? (
                  <p className="text-gray-500 text-sm">{blog.date}</p>
                ) : (
                  <p className="text-gray-500 text-sm">Date not available</p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;


