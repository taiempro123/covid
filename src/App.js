import Highlight from "./components/Highlight";
import CountrySelector from "./components/CountrySelector";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import {getCountries, getReportByCountry} from './apis'
import _ from 'lodash';
import moment from "moment";
import {Container, Typography } from "@material-ui/core";
import  'moment/locale/vi' ;
import '@fontsource/roboto';





function App() {

  const [countries , setCountries]= useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState(''); 
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries()
        .then((res) => {
          setCountries(_.sortBy(res.data, [function(o) { return o.Country}]));
          setSelectedCountryID('vn');
        }
      )
  }, []);

  const handleOnChange = (e) => {

      setSelectedCountryID(e.target.value);
  }

  useEffect(() => {
   if(selectedCountryID){
    const {Slug} = countries.find(country => country.ISO2.toLowerCase() === selectedCountryID)

    getReportByCountry(Slug).then((res) => {
    setReport(res.data);
    })
   }
  },[countries, selectedCountryID])


  return (
    <Container>
    <Typography component = 'h2' variant = 'h2'>Số liệu thống kê COVID-19</Typography>
    <Typography >{moment().format('LLL')}</Typography>
    
      <CountrySelector countries = {countries} handleOnChange = {handleOnChange} value = {selectedCountryID}/>
      <Highlight report = {report}/>
      <Summary selectedCountryId={selectedCountryID} report = {report}/>
      <Typography>Author: Tấn Tài , Tutorial by: HoleTex Youtube channel  </Typography>
    </Container>
  );
}

export default App;
