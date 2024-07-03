"use client"

import { url } from "inspector"
import { FormEvent, useState } from "react"

const isValidAmazonProductURL =(url:string)=>{
 try{
  const parsedURL =new URL(url);
  const hostname = parsedURL.hostname;

   //check for amazon.com or amazon.in
    if(
      hostname.includes('amazon.com') || hostname.includes('amazon.in') || hostname.endsWith('amazon')
    ){
      return true;
    }
  } catch (error){
    return false;
        }
  return false;
//1:02:
}

const SearchBar = () => {

const [searchPrompt, setsearchPrompt] = useState('')
  const handleSubmit=(event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
  }
  return (
    <form className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}>

        <input
        type="text"
        value={searchPrompt}
        onChange={(e)=>setsearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
        />      
        <button type="submit" className="searchbar-btn">Search</button>

    </form>
  )
}

export default SearchBar