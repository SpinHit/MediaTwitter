import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TwitterHead from "./TwitterHead";
import TweetLocal from "./TweetLocal";
import TweetApp from "./TweetApp";
import Footer from "./Footer";
import MailNous from "./MailNous";
import { useForm } from 'react-hook-form';
import Mediavenir from "./images/mediavenir.jpg";
import Cerfia from "./images/cerfia.jpg";
import Mediapart from "./images/mediapart.jpg";
import Parisien from "./images/parisien.jpg";
import Search from "./images/search.svg";



export default function App() {
  const [showResults, setShowResults] = React.useState(false);
  const [showResults2, setShowResults2] = React.useState(false);
  const [showResults3, setShowResults3] = React.useState(false);
  const [showResults4, setShowResults4] = React.useState(false);
  const [showResults5, setShowResults5] = React.useState(false);
  const [showResults6, setShowResults6] = React.useState(false);
  const [dataSearch, setDataSearch] = React.useState([]);
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    setShowResults(false);
    setShowResults2(false);
    setShowResults3(false);
    setShowResults4(false);
    setShowResults6(false);
    setDataSearch(data.Search);
    setShowResults5(false);
    setShowResults5(true);
    reset();

  }




  return (
    <>
      <Router>
        <TwitterHead />
        <Switch>
          <Route exact path="/">

            <div className="Racourcis">
              <button onClick={() => { setShowResults(!showResults); setShowResults2(false); setShowResults3(false); setShowResults4(false); setShowResults5(false); setShowResults6(false); }} ><img src={Cerfia} alt='logo cerfia' /></button>
              <button onClick={() => { setShowResults2(!showResults2); setShowResults(false); setShowResults3(false); setShowResults4(false); setShowResults5(false); setShowResults6(false); }} ><img src={Mediavenir} alt='logo cerfia' /></button>
              <button id='boutonVert' onClick={() => { setShowResults6(!showResults6); setShowResults(false); setShowResults2(false); setShowResults4(false); setShowResults5(false); setShowResults3(false); }} >Afficher les tweets enregistrer</button>
              <button onClick={() => { setShowResults3(!showResults3); setShowResults2(false); setShowResults(false); setShowResults4(false); setShowResults5(false); setShowResults6(false); }} ><img src={Parisien} alt='logo cerfia' /></button>
              <button onClick={() => { setShowResults4(!showResults4); setShowResults2(false); setShowResults3(false); setShowResults(false); setShowResults5(false); setShowResults6(false); }} ><img src={Mediapart} alt='logo cerfia' /></button>

            </div>
            <form className="SearchZone" onSubmit={handleSubmit(onSubmit)}>
              <div className="Column">
                <input id='SearchBar' type="text" placeholder="Entre le pseudo du media que vous cherchez" {...register("Search", { required: true, max: 15, maxLength: { message: "Un pseudo twitter ne peu dépasser 15 characteres", value: 15 }, /* pattern: { message: "Veuillez saisir un pseudo conforme", value: /^([^0-9]*)$/i } */ })} />
                {/*on affiche l'erreur en fonction de l'erreur faite*/}
                {errors.Search && <span>{errors.Search.message}</span>}
              </div>
              <input id='SearchButton' type="image" src={Search} alt='logo cerfia' />
            </form>

            <div className="Tweets">
              {showResults ? <TweetApp nom="cerfiaFR" /> : null}
              {showResults2 ? <TweetApp nom="Mediavenir" /> : null}
              {showResults3 ? <TweetApp nom="le_Parisien" /> : null}
              {showResults4 ? <TweetApp nom="Mediapart" /> : null}
              {showResults5 ? <TweetApp nom={dataSearch} /> : null}
              {showResults6 ? <TweetLocal /> : null}

            </div>

            {/*             <div className="midleZone">
              <TweetApp nom='cerfiafr' />
              <TweetApp nom='Mediavenir' />
            </div> */}
            <MailNous />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

