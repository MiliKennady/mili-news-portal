import React from 'react'

interface CARDPROPS {
    data: any
}

let Card: React.FC<CARDPROPS> = ({data})  =>{

    console.log(data);

    const openTheArticle = (newsUrl:any) => {
        window.open(newsUrl)
    }
  return (
    <div className='cardContainer'>
        { data.map( (article:any) => {
            if( !article.urlToImage){
                return null
            }
            else{

                return(
                    <div className='card'>
                        <img src={article.urlToImage} />
                        <div className='content'>
                            <a className='title' onClick={() => openTheArticle(article.url)}>{article.title}</a>
                            <p>{article.description}</p>
                            <button onClick={() => openTheArticle(article.url)}>Read More</button>
                        </div>
                    </div>
                );

            }
            
        }) }
    </div>
  )
}

export default Card