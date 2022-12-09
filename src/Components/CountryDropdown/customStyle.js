export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'blue' : 'grey',
      padding: 10,
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: '48px',
      height: '48px',
      fontSize: '16px',
  
      borderRadius: '37px',
      width: '100%',
      boxShadow: state.isFocused ? null : null,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
  
      padding: 20,
    }),
  
    valueContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      marginLeft: '9px',
      padding: '0 6px',
    }),
  
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
      paddingTop: '13px',
      marginRight: '2px',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'
  
      return { ...provided, opacity, transition }
    },
  }
  