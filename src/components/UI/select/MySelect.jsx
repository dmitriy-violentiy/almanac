import React from "react";

const MySelect = ({options, defaultValue, value, onChange}) => {
   return (
      <select
         value={value} 
         onChange={event => onChange(event.target.value)}
      >
         <option disabled >{defaultValue}</option>
         {options.map((option, index) => 
            <option key={index} value={option.value}>
               {option.name}
            </option>  
         )}
      </select>
   );
}
export default MySelect;