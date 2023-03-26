import * as React from 'react';
import ReactDOM from "react-dom";
import Select from 'react-select';

const options = [
    { value: "PH", label: 'PH' },
    { value: 'Temp_C', label: 'Temp' },
    { value: 'AVG_Humidity__', label: 'Humidity' },
    { value: 'AVG_Light__', label: 'Average Light' }
  ];
  
  class CreatePreferences extends React.Component {
    constructor(props) {
      super();
      this.state = {
        selectedOptions: []
      };
    }
  
    handleChange = (selectedOption) => {
      const state = this.state;
      state.selectedOptions = [];
      selectedOption.forEach((option) => {
        state.selectedOptions.push(option.value);
      });
      this.setState(state);
      console.log(`Options selected:`, JSON.stringify(state, null, 4));
    };
    render() {
      return <Select isMulti onChange={this.handleChange} options={options} />;
    }
  }
  
  export default function OptionSelect(){
    return <CreatePreferences/>
  }