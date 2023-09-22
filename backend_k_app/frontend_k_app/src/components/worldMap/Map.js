import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { activeLanguage as getActiveLanguage } from '../../actions/languageActions';

import { getLanguageByName } from '../../selectors/languageSelectors';

import LanguageList from '../LanguageList';

import geoData from '../../../src/geojson_data.geojson'

const Map = () => {

  // const geoPath =   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  // const [countryFlag, setCountryFlag] = useState(null);

  // const getCountryFlag = (geo) => {
  //   var countryCode = geo.properties.ISO_A2_EH.toString().toLowerCase();
  //   var src = `https://flagcdn.com/256x192/${countryCode}.png`;
  //   var width = '256';
  //   var height = '192';
  //   var alt = geo.properties.NAME;

  //   setCountryFlag(src);
  //   console.log(countryFlag);

  // }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [languageAvailable, setLanguageAvailable] = useState(false);

  const[isHovering, setIsHovering] = useState(false);

  // THESE ARE LANGUAGE NAMES NOT COUNTRY NAMES --- DOH
  const languageList = useSelector(state => state.languageList);
  const { languages } = languageList;

  const activeLanguage = useSelector(state => state.activeLanguage);
  // const { language } = activeLanguage;
  // FOR SAKE OF LIMITTING CONFUSION - I THINK I WILL ACCESS IT VIA activeLanguage.language

  // const supportedCountries = ['Spain', 'Mexico', 'Italy', 'France', 'United Kingdom'];
  const supportedLanguages = {
    'spanish': {
      'country': ['Spain', 'Mexico']
    },
    'italian': {
      'country': ['Italy']
    },
    'french': {
      'country': ['France']
    },
    'english': {
      'country': ['United Kingdom', 'United States of America']
    }
  }
  
  const findLanguageByCountry = (targetCountry) => {
    for (const l in languages) {
      const countries = languages[l].countries;
      for (const c in countries) {
        if (countries[c].name.includes(targetCountry)) {
          return languages[l]
        }
      }
    }
    // for (const language in supportedLanguages) {
    //   if (supportedLanguages[language].country.includes(targetCountry)) {
    //     return language
    //   }
    // }
  }

  const languageObject = useSelector(state => state.activeLanguage);
  console.log('language obj = ', languageObject);

  const handleClick = (geo) => {
    // console.log(geo.properties.NAME, geo.properties.ISO_A2_EH);
    // console.log(e, e.target);
    // if (supportedCountries.includes(geo.properties.NAME)) {
    //   dispatch(activeLanguage(geo.properties.NAME));
    // }

    const country = geo.properties.NAME;
    const language = findLanguageByCountry(country);
    console.log('country ', country, 'language ', language, 'languages', languages);
    // dispatch(getActiveLanguage(language));

    navigate(`/languages/${ language.language }`)



    
    // if (isHovering) {
    //   handleMouseOut()
    // } else {
    // handleMouseOver()
    // }
  }

  const isCountrySupported = (country) => {
    // console.log(languages)
    for (const l in languages) {
      // console.log(languages[l].countries)
      const countries = languages[l].countries
      for (const c in countries) {
        if (countries[c].name.includes(country)) {
          // console.log('true')
          return true
        }
      }

    }
    // console.log('false');
    return false;
    // for (const language in languages) {
    //   console.log('isCountrySuppored lang ', language.id)
    //   if (language.countries.name.includes(country)) {
    //     return true;
    //   }
    // }
    // return false;
  }

  // const isCountrySupported = (country) => {
  //   for (const language in supportedLanguages) {
  //     if (supportedLanguages[language].country.includes(country)) {
  //       return true
  //     }
  //   }
  //   return false;
  // }

  const getFlag = () => {
    // console.log('HOVER');
  }

  const handleMouseOver = (geo) => {
    setIsHovering(true);
    const country = geo.properties.NAME;
    // const language = findLanguageByCountry(country).charAt(0).toUpperCase() + findLanguageByCountry(country).slice(1);
    const language = findLanguageByCountry(country);
    // language = language.charAt(0).toUpperCase() + language.slice(1); 
    // const lang_name = language.language.charAt(0).toUpperCase() + language.language.slice(1);
    dispatch(getActiveLanguage(language));

  };

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (

    <div>

    {/* <h1>{ languages.countries }</h1> */}

    <div style={{ position: 'relative', left: 0, top: -50 }}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{
          // rotate: [97, -40, 0],
          scale: 200,
          // center: [8, 0],
        }}
        style={{
          // maxHeight: '500'
          // width: '800',
        }}
        // width={1000}
        // height={800}
      >
        <Geographies geography={ geoData }>
          {({ geographies }) => 
            geographies.map((geo) => {
              // console.log('geo ', geo.properties.NAME, geo);
              // if (supportedCountries.includes(geo.properties.NAME)) {
                // for (geo.properties.NAME in supportedCountries) {
                // setLanguageAvailable(true)
                //   console.log('YES ', geo.properties.NAME, supportedCountries)
                // }              
              // <Geography key={ geo.rsmKey } geography={ geo } />
              // for (const lang in supportedLanguages) {
              //   if (supportedLanguages[lang].country.includes(geo.properties.NAME)) {
                  
              if (isCountrySupported(geo.properties.NAME)) {
              
                return <Geography 
                  className='rsm-geography'
                  key={ geo.rsmKey } 
                  geography={ geo } 
                  name={ geo.properties.name }
                  // onMouseEnter={() => {
                  //   getFlag()
                  // }}
                  onMouseOver={ () => handleMouseOver(geo) }
                  onMouseOut={ handleMouseOut }
                  onClick={ () => handleClick(geo) }
                  style={{
                    // hover: { outline: 'none', fill: 'lightgrey', backgroundImage: `url('https://flagcdn.com/256x192/${ geo.properties.ISO_A2_EH.toString().toLowerCase() }.png')` },
                    // backgroundColor: languageAvailable ? 'black' : 'white',
                    // default: { backgroundImage: 'url("https://flagcdn.com/256x192/mx.png")' },
                    hover: { fill: 'lightslategrey', cursor: 'pointer' },
                    pressed: { outline: 'none'}
                  }}
                />
                } else {
                  return <Geography 
                  key={ geo.rsmKey } 
                  geography={ geo } 
                  name={ geo.properties.name }
                  stroke='black'
                  strokeWidth={.1}
                  // onMouseEnter={() => {
                  //   getFlag()
                  // }}
                  onClick={ () => handleClick(geo) }
                  style={{
                    // hover: { outline: 'none', fill: 'lightgrey', backgroundImage: `url('https://flagcdn.com/256x192/${ geo.properties.ISO_A2_EH.toString().toLowerCase() }.png')` },
                    // backgroundColor: languageAvailable ? 'black' : 'white',
                    default: { fill: 'none' },
                    hover: { fill: 'none' },
                    pressed: { fill: 'none' }
                    // hover: { outlilne: 'none', fill: 'none' },
                    // pressed: { outline: 'none'}
                  }}
                />
              }
            
            })
          }

        </Geographies>
      </ComposableMap>




    </div>
    { isHovering && activeLanguage && (
        <div className='country-hover flex-col justify-content-center'>
         
          <h2>{ activeLanguage.language.language.charAt(0).toUpperCase() + activeLanguage.language.language.slice(1) }</h2>
          {/* <h4>{ languageObject.image }</h4> */}
          {/* <h4>{ languages[activeLanguage.language] }</h4> */}
          { languageObject.language.image && (
            <img src={ languageObject.language.image } style={{ maxWidth: '200px' }}></img>
          )}
        </div>
      )}

    </div>

  )
}

export default Map