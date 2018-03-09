//Holds all of the memes
import React, { Component } from 'react';
import Meme from './Meme.js';

import {Button} from 'react-bootstrap';


import axios from 'axios';

const DATA_HOST = 'https://ucbmfet.herokuapp.com/data';

const loadMoreText = 'Click to load more.';


class MemesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
			hasMore: true
        }
    }


    componentDidMount() {
        console.log('Mounted: ' + this.props.selection);
        getPageElements(this.props.selection, this.props.PAGE_SIZE, 0, function (newData) {
            this.setState({ data: newData });
            //this.setState({data:tempData.data});
        }.bind(this));
        //load first page
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selection !== this.props.selection) {
            console.log('Updated: ' + this.props.selection);
            getPageElements(this.props.selection, this.props.PAGE_SIZE, 0, function (newData) {
                this.setState({ data: newData });
            }.bind(this));
            //load first page
        }
    }


    render() {
        var memeComponents = '';
        var newLoadButton = '';
		
        if (this.state.data.length === 0) {
            memeComponents = 'No results. ';
            newLoadButton = 'No more memes.'
        } else {
            console.log('MemesList Rendered');
            //console.log(this.state.data);
            memeComponents = this.state.data.map((memeItem) => (
                <Meme
                    key={memeItem.id}
                    id={memeItem.id}
                    message={memeItem.message}
                    created_time={memeItem.created_time}
                    likes={memeItem.likes}
                    from_id={memeItem.from_id}
                    type={memeItem.type}
                    full_picture={memeItem.full_picture}
                />
            ));

            const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
			
			if(!this.state.hasMore){
				newLoadButton = 'No more memes.'
			} else{
				newLoadButton = (
				<div className="well" style={wellStyles}>
					<Button bsStyle="primary" bsSize="large" block onClick={loadNextPage.bind(this)}>{loadMoreText}</Button>
				</div>
				);
			}
        }

        return (
            <div>
                {memeComponents}
                {newLoadButton}
            </div>

        );
    }
}

//callback of new Data
function getPageElements(selection, number, skip, callback) {
    let url = DATA_HOST + '?time=' + selection + '&count=' + number + '&skip=' + skip;
    //console.log(url);
    axios.get(url)
        .then(res => {
            const data = res.data.data;
            if (typeof callback === 'function') callback(data);
        });
    //TODO ERROR HANDLING
}

//TODO: DISABLE BUTTON UNTIL REQUEST RETURN, DISABLE BUTTON IF NO MORE ITEMS, LOADING ANIMATION
function loadNextPage() {
    console.log('LOADING NEXT PAGE');
    getPageElements(this.props.selection, this.props.PAGE_SIZE, this.state.data.length,
		function (data) {
			if(data.length === 0){
				this.setState({hasMore: false});
			} else{
				this.setState({ data: this.state.data.concat(data) });
			}
		}.bind(this));
}

export default MemesList;