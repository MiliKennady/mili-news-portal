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
                            <div className='articleDetails'>
                                <span>Author : {article.author}</span>
                                <span>Source : {article.source.name}</span>
                                <span>Published On : {new Date(article.publishedAt).toLocaleDateString('en-GB')}</span>
                            </div>
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