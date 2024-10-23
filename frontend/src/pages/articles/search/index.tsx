import React, { FormEvent, useEffect, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Cookies from 'js-cookie';
import Link from "next/link";
import axios from "axios";

const SearchFetcher = () => {
    const [title, setTitle] = useState("");
    const [data, setData] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [submitting, subSubmitted] = useState(false);

    const [type, setType] = useState("");
    const [error, setError] = useState(null);
    
    // useEffect(() => {
    //     submitSearchArticle();
    // }, []);
    
    const submitSearchArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        subSubmitted(true)
        console.log(title)
            // let response = await fetch('http://localhost:8082/api/articles/search', {
            //     method: "POST",
            //     headers:{
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     body: JSON.stringify({
            //         term,
            //     }),
            // })
            // let response = axios({
            //     method: 'post',
            //     url: 'http://localhost:8082/api/articles/search',
            //     data: {
            //         title
            //     }
            //   });
            const postData = {
                title: title
            };
            

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };    
            const  response  = await axios.post(`http://localhost:8082/api/articles/search`, postData, {
                headers: headers
              });  
        
        console.log(response)
        //console.log(JSON.stringify(response));
        
    };
  
   return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="pb-12">
                <div className="flex space-x-2 space-y-2 flex-wrap justify-left items-baseline">
                    <h3 className="my-4 text-2xl font-semibold text-gray-700">Search</h3>
                    <a href="/articles/" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Articles</a>
                    <a href="/articles/new" className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">New Articles</a>
                </div>    
                <form onSubmit={submitSearchArticle}>
                    <div className="mb-5"> 
                        <label htmlFor="title">Search:</label>
                        <input
                            className="border border-gray-300 shadow p-3 w-full rounded mb-"
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                    </div>   
                    <div className="mb-2">   
                        <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg" type="submit">Submit</button>
                    </div>  
                </form>
                         
                { loading && submitting ? (
                    <div className="absolute top-1/2 left-1/2 -mt-4 -ml-2 h-8 w-4 text-indigo-700">
                        <div className="absolute z-10 -ml-2 h-8 w-8 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="currentColor" stroke="currentColor" strokeWidth="0" viewBox="0 0 16 16">
                                <path d="M8 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zM8 4c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zM12.773 12.773c-1.275 1.275-2.97 1.977-4.773 1.977s-3.498-0.702-4.773-1.977-1.977-2.97-1.977-4.773c0-1.803 0.702-3.498 1.977-4.773l1.061 1.061c0 0 0 0 0 0-2.047 2.047-2.047 5.378 0 7.425 0.992 0.992 2.31 1.538 3.712 1.538s2.721-0.546 3.712-1.538c2.047-2.047 2.047-5.378 0-7.425l1.061-1.061c1.275 1.275 1.977 2.97 1.977 4.773s-0.702 3.498-1.977 4.773z"></path>
                            </svg>
                        </div>
                    </div>
                ) : error ? (
                    <p>Error: {error}</p>
                ): !loading && submitting ? (
                   <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Title
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Authors
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Source
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.map((item) => (
                            <tr key={item._id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex">
                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">{item.title}</p>
                                    <p className="text-gray-600 whitespace-no-wrap">{item._id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{item.authors}</p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{item.source}</p>
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {item.status === '1' ?
                               <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Active</span>
                                  </span> : 
                                  <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Not Active</span>
                                  </span>
                                  }
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              
                                { type === '1' ?(  
                                    <Link href={{ pathname: 'articles/view/[id]', query: { id: item._id } }}>
                                      View
                                    </Link>  
                                ):(
                                  <Link href={{ pathname: 'articles/status/[id]', query: { id: item._id } }}>
                                      Change Status
                                    </Link> 
                                )}
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                { type !== '1' ?(  
                                    <Link href={{ pathname: 'articles/edit/[id]', query: { id: item._id } }}>
                                      Edit
                                    </Link>
                                ):(
                                  <></>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                
                ):(
                    <></>
                )}
              </div>
            
        </div>
  
  );
  };
  export default SearchFetcher;