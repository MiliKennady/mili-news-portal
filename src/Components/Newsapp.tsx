import {useState, useEffect} from 'react'
import Card from './Card'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Newsapp() {

    const [search, setSearch] = useState("india");
    const [source, setSource] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [newsData, setNewsData] = useState("");
    const [expand, setExpand] = useState(false);

    // const API_KEY = "79fec32e63ec4b609f36851aa2c517cc";
    const API_KEY = "fd3d4ba1c73549418e3f3db2c5fc98a0";

    const getData = async () => {
        
        // query part will be in the form ?q=keyword&category=our_category&sources=our_source&from=our_date
        let queryParam;
        if(search){
            queryParam = `q=${search}`;
        }
        else{
            queryParam = "q=general";
        }
        
        if(source){
            queryParam = queryParam + `&sources=${source}`;
        }
        if(author){
            queryParam = queryParam + `&author=${author}`;
        }
        queryParam = queryParam + `&from=${date}`;

        const response = await fetch(`https://newsapi.org/v2/everything?${queryParam}&apiKey=${API_KEY}`);
        // converting to json
        const jsonData = await response.json();
        setNewsData(jsonData.articles);
        
    }

    const handleInput = (event: any) => {
        setSearch(event.target.value);
    }

    const handleSourceInput = (event: any) => {
        setSource(event.target.value);
    }

    const handleAuthorInput = (event: any) => {
        setAuthor(event.target.value);
    }

    const handleDateInput = (event:any) => {
        const dateString = event.target.value
        const dateObjString = new Date(dateString).toISOString();
        const dateRequiredString = dateObjString.substring(0,dateObjString.indexOf("T"));
        setDate(dateRequiredString);
    }

    const switchExpand = () => {
        setExpand(!expand);
    }

    // passing an empty array, so getData is called during the first re-render
    useEffect(() => {
        getData()
    }, [search]);
    
    const userInput = (event: any) => {
        setSearch((event.target as HTMLInputElement).value);
        
    }

    const clearInputs = () => {
        setSource("");
        setAuthor("");
        setDate("");
    }

  return (
    <div>
        <nav>
            <div>
                <h1>Top News</h1>
            </div>
            <div className='searchAndFilter'>
            <div className='searchBar'>
                <div>
                <input type='text' placeholder='Search News' onChange={handleInput}/>
                <span onClick={switchExpand}>
                    {expand? <ExpandMoreIcon className='icons' onClick = {clearInputs}/> : <ExpandLessIcon className='icons' onClick = {clearInputs} />}
                </span>
                
                </div>
                <button onClick={getData}>Search</button>
            </div>
            <div className={expand?`advancedFilters`:`advancedFiltersHide`}>
                <input type='text' placeholder='Search Sources' onChange = {handleSourceInput} value = {source}/>
                <input type='text' placeholder='Search Authors'  onChange = {handleAuthorInput} value={author}/>
                <input type='date' placeholder='Search Date' onChange={handleDateInput} />
            </div>
            </div>
            
            
        </nav>
        <div>
            <p className='head'>Your News Feed</p>
        </div>
        
        <div className = 'categoryBtn'>
                <button onClick={ (event) => userInput(event)} value = "sports">SPORTS</button>
                <button onClick={ (event) => userInput(event)} value = "politics">POLITICS</button>
                <button onClick={ (event) => userInput(event)} value = "entertainment">ENTERTAINMENT</button>
                <button onClick={ (event) => userInput(event)} value = "business">BUSINESS</button>
                <button onClick={ (event) => userInput(event)} value = "technology">TECHNOLOGY</button>
        </div>

        {/* display the card component */}
        <div>
            { newsData? <Card data={newsData} /> : <div>Looks like you've got no news!!</div>}
        </div>
    </div>
  )
}

export default Newsapp