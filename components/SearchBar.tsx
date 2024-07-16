"use client"

import { scrapeAndStoreProduct } from "@/lib/actions";
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

}

const SearchBar = () => {

const [searchPrompt, setsearchPrompt] = useState('');
const [isLoading, setisLoading] = useState(false);

    const handleSubmit= async (event: FormEvent<HTMLFormElement>) =>
      {
         event.preventDefault();
         const isValidLink = isValidAmazonProductURL(searchPrompt);

         if(!isValidLink) return alert('Please provide a valid Amazon Link');

    try {
       setisLoading(true);

       const product =await scrapeAndStoreProduct(searchPrompt);

    } catch (error) {
      console.log(error);
    } finally{
      setisLoading(false);
    }

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
        <button
         type="submit" 
         className="searchbar-btn"
         disabled={searchPrompt===''}
         >
         {isLoading ? 'Searching...' : 'Search'}
         </button>

    </form>
  )
}

export default SearchBar