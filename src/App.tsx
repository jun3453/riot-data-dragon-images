import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import axios from 'axios';
import {champions, champion} from 'riot-api-json-ts-wrapper/src/champion';

const url = "http://ddragon.leagueoflegends.com/cdn/9.24.2/data/en_US/champion.json";
const imageUrl = "http://ddragon.leagueoflegends.com/cdn/9.24.2/img/champion/";

const App: React.FC = () => {
  
  useEffect(() => {
    const getChampions = async() => {
      const result = await axios.get(url);
      const champions: champions = result.data;
      setChampions(champions);
    }
    getChampions();
  }, [])

  const [champions, setChampions] = useState<champions>({
    type: "",
    format: "",
    version: "",
    data: {},
  });

  const [filterInput, setFilterInput] = useState<string>("");

  const images = useMemo(() => {
    return Object.values(champions.data)
      .filter((c: champion) => {
        return c.name.toLowerCase().indexOf(filterInput.toLowerCase()) > -1
      })
      .map((c: champion) => {
        const imgUrl = imageUrl + c.image.full;
        const imgKey = c.id;
        return (
            <img src={imgUrl} key={imgKey}/>
        )
      });
    }, [champions, filterInput]);

  return (
    <div className="App">
      <div>
        <input 
          type="text"
          onChange={e => setFilterInput(e.target.value)}
        />
      </div>
      {images}
    </div>
  );
}

export default App;