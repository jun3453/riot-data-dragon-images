import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { champions, champion, getChampions, createChampionImageUrl } from 'riot-api-json-ts-wrapper/dist/DataDragon/champion';
import { version, getVersions } from 'riot-api-json-ts-wrapper/dist/DataDragon/version';
import { language, getLanguages } from 'riot-api-json-ts-wrapper/dist/DataDragon/language';

const App: React.FC = () => {

  const [versions, setVersions] = useState<version[]>([]);
  const [languages, setLanguages] = useState<language[]>([]);
  const [currentVersion, setCurrentVersion] = useState<version>("");
  const [currentLanguage, setCurrentLanguage] = useState<language>("");

  useEffect(() => {
    let version: version = "";
    let language: language = "";
    getVersions().then((v: version[]) => {
      setVersions(v);
      setCurrentVersion(v[0]);
      version = v[0];
      console.log(version);
    })

    getLanguages().then((l: language[]) => {
      setLanguages(l)
      setCurrentLanguage(l[0]);
      language = l[0];
    })
  }, [])

  useEffect(() => {
    if (currentVersion != "" && currentLanguage != "") {
      getChampions(currentVersion, currentLanguage).then((c: champions) => {
        setChampions(c);
      });
    }
  }, [currentVersion, currentLanguage])

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
        const imgUrl = createChampionImageUrl(c, currentVersion);
        const imgKey = c.id;
        return (
          <img src={imgUrl} key={imgKey} />
        )
      });
  }, [champions, filterInput]);

  const versionsPullDown = useMemo(() => {
    const options = versions.map((v: version) => {
      return (
        <option key={v} value={v}>
          {v}
        </option>
      );
    })
    return (
      <select
        onChange={(e) => setCurrentVersion(e.target.value)}
      >
        {options}
      </select>
    );
  }, [versions]);

  const languagesPullDown = useMemo(() => {
    const options = languages.map((l: language) => {
      return (
        <option key={l} value={l}>
          {l}
        </option>
      );
    })
    return (
      <select
        onChange={(e) => setCurrentLanguage(e.target.value)}
      >
        {options}
      </select>
    );
  }, [languages]);

  const hoge = () => {
    return (
      <div className="App">
        <Link to="fuga">fugalink</Link>
        <div>
          {versionsPullDown}
          {languagesPullDown}
          <input
            type="text"
            onChange={e => setFilterInput(e.target.value)}
          />
        </div>
        {images}
      </div>
    );
  }

  const fuga = () => {
    return (
      <div className="App">
        fugagaufuaguasdfuhasdf
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Route exact path="/" component={hoge}></Route>
      <Route exact path="/fuga" component={fuga}></Route>
    </BrowserRouter>
  );
}

export default App;