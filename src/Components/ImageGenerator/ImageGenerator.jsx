import React, { useRef, useState } from 'react'
import './imagegenerator.css'
import headinerimg from '../Assets/heading-img.jpg'

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState('/')
  let inputRef = useRef(null)
  const [loading, setLoding] = useState(false)


  const imageGenrator = async () => {
    console.log('het')
    if (inputRef.current.value === "") {
      console.log('het')
      return 0;
    }
    setLoding(true)
    const response = await fetch('https://api.openai.com/v1/images/generations',
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer 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",
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          // size: "512 x 512",
        }),
      }
    );
    let data = await response.json()
    console.log(data)
    let dat_arr = data.data
    setImage_url(dat_arr[0].url)
    setLoding(false)
  }

  return (
    <>
      <div className="main-containner">
        <div className="header">
          Ai Image <span>Generator</span>
        </div>
        <div className="img-loading">
          <div className="image">
            <img src={image_url === '/' ? headinerimg : image_url} alt="loading image" />

          </div>
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
          </div>
        </div>
        <div className="search-box">
          <input type="text" ref={inputRef} className='search-input' placeholder='Describe your creation in detail' />
          <div className="geberate-btn " onClick={() => imageGenrator()}>Generate</div>
        </div>

      </div>


    </>


  )
}

export default ImageGenerator
