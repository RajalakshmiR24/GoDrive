// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import api from '../../../Utils/axios'; // Ensure the path is correct

// const Article = () => {
//   const { id } = useParams(); // Get the article ID from the URL
//   const [article, setArticle] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // Add loading state

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await api.get(`/blogs/getallblogs/${id}`);
//         setArticle(response.data);
//       } catch (error) {
//         console.error('Error fetching blog data:', error);
//         setError('Failed to load the article. Please try again later.');
//       } finally {
//         setLoading(false); // Set loading to false after the fetch is done
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   if (!article) {
//     return <div className="text-center">No article data available.</div>;
//   }

//   const { title, img, content, date } = article;
//   const { heading, subheadings, conclusion } = content || {};

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-lg rounded-lg mb-4 p-4">
//         <img
//           src={img || 'default-image.jpg'} // Provide a default image URL
//           alt={title || 'Default title'}
//           className="w-full h-48 object-cover rounded-lg mb-4"
//         />
//         <h2 className="text-xl font-semibold mb-2">{title || 'Title not available'}</h2>
//         {content && (
//           <>
//             <h3 className="text-lg font-semibold mb-2">{heading || 'Heading not available'}</h3>
//             {subheadings && subheadings.map((item, index) => (
//               <div key={index} className="mb-4">
//                 <h4 className="font-semibold">{item.subheading || 'Subheading not available'}</h4>
//                 {Array.isArray(item.subsection_content) ? (
//                   item.subsection_content.map((subItem, subIndex) => (
//                     <div key={subIndex} className="mb-2">
//                       <h5 className="font-semibold">{subItem.subheading || 'Subheading not available'}</h5>
//                       <p>{subItem.subsection_content || 'Content not available'}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p>{item.subsection_content || 'Content not available'}</p>
//                 )}
//               </div>
//             ))}
//             {conclusion && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Conclusion</h3>
//                 <p>{conclusion || 'Conclusion not available'}</p>
//               </div>
//             )}
//           </>
//         )}
//         <p className="text-sm text-gray-600 mt-4">{date || 'Date not available'}</p>
//       </div>
//     </div>
//   );
// };

// export default Article;


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/getallblogs/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching the article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <img src={article.img} alt={article.title} />
      <p>{article.content.heading}</p>
    </div>
  );
};

export default Article;
