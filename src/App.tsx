import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { champions, champion, getChampions, createChampionImageUrl } from 'riot-api-json-ts-wrapper/dist/champion';

const App: React.FC = () => {

  useEffect(() => {
    getChampions().then((c: champions) => {
      setChampions(c);
    });
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
        const imgUrl = createChampionImageUrl(c);
        const imgKey = c.id;
        return (
          <img src={imgUrl} key={imgKey} />
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