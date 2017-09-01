import React, {Component} from 'react';
import { Wrapper, MenuItem} from 'react-aria-menubutton';

class MySingleButton extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const button = (
            //<Menu className='MyMenuButton-menu'>
               <MenuItem className='MySingleButton-menuItem'>
                    {this.props.buttonName}
                </MenuItem>
            //</Menu>

        );

        return(
            <Wrapper
                className='MySingleButton'
                onSelection={handleSelection.bind({onSelect:this.props.onSelect})}
            >
                {/* <Button className='MySingleButton-button'>
                    {this.props.buttonName}
                </Button> */}
                 {button} 
            </Wrapper>
        );
    }

}

function handleSelection(value, event) {
    event.stopPropagation();
    this.onSelect(value);
}

export default MySingleButton;