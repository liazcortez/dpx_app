import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem, TopNavigationAction, OverflowMenu, MenuItem, Text } from "@ui-kitten/components";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isMarketing, isRockstar, isSuper, isUser } from './../utils/Authroles';
import useStore from '../hooks/useStore';
import { CapitalizeNames } from "../utils/Capitalize";
import SelectStore from "./SelectStore";
import SelectCarType from "./SelectCarType";
import SelectDate from "./SelectDate";

 


const Filters = ({filters, setQuery, type='select'}) => {
	const [date, setDate] = useState(
		`&createdAt[gte]=${moment()
		  .startOf("year")
		  .format()}&createdAt[lt]=${moment().endOf("year").format()}`
	      );


	      
 	const [selectedStores, setSelectedStores] = useState(false);
	const { user } = useAuth();

 	const [carType, setCarType] = useState(false);

	 const [custom, setCustom] = useState({
		date: `&createdAt[gte]=${moment()
		  .startOf("year")
		  .format()}&createdAt[lt]=${moment().endOf("month").format()}`,
		filter: "MMM",
	      });

		useFocusEffect(
			React.useCallback(() => {
			  
			}, [user])
		);


	const generateQuery = ()=>{
		let car = 'nuevo';

		if(user && user.carType){
			if(user.carType === 'ambos' || user.carType === 'nuevo') car ='nuevo'
			if(user.carType === 'seminuevo') car ='seminuevo'
		}
		


		let newQuery = '';
		newQuery += (date)?date:'';
		newQuery += `&carType=${car}`;
		newQuery += (selectedStores)?`&store[in]=${selectedStores}`:'';

		setQuery((newQuery.length>=1)?newQuery:false);
	};

	useFocusEffect(
		React.useCallback(() => {
		  if(carType && selectedStores && selectedStores.length>=1)generateQuery();
		}, [date,carType,selectedStores])
	      );


	return(<>
	{filters.includes('stores') &&
          <SelectStore setSelectedStores={setSelectedStores}/>
	}
	{filters.includes('date') &&
          <SelectDate setDate={setDate} getFilter={setCustom} />
	}
	{filters.includes('carType') &&
          <SelectCarType carType={carType} setCarType={setCarType} />
	}
	
          {/* <SelectMake/> */}
        
	</>)
}
export default Filters;
