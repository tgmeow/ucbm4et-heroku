//Holds all of the memes
import React, { Component } from 'react';
import Meme from './Meme.js';
import MySingleButton from './MySingleButton.js';

import axios from 'axios';

const DATA_HOST = 'http://dnrm.herokuapp.com/data';

const PAGE_SIZE = 20;
const loadMoreText = 'Click to load more.';


class MemesList extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    

    componentDidMount(){
        console.log('Mounted: ' + this.props.selection);
        getPageElements(this.props.selection, PAGE_SIZE, 0, function(newData){
            this.setState({data:newData});
            //this.setState({data:tempData.data});
        }.bind(this));
        //load first page
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.selection !== this.props.selection){
            console.log('Updated: ' + this.props.selection);
            getPageElements(this.props.selection, PAGE_SIZE, 0, function(newData){
                this.setState({data:newData});
            }.bind(this));
            //load first page
        }
    }


    render(){
        var memeComponents = '';
        var loadMoreButton = '';
        if(this.state.data.length === 0){
            memeComponents = 'No results.';
            loadMoreButton = 'No more memes.'
        } else{
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

            loadMoreButton =
                // <Button
                //     onPress={loadNextPage}
                //     title={loadMoreText}
                //     color='#444'
                //     accessibilityLabel='Click here to load more memes.'
                // />;
                <MySingleButton
                    buttonName={loadMoreText}
                    onSelect={loadNextPage.bind(this)}
                />;
        }

        

        
        return (
            <div>
                {memeComponents}
                {loadMoreButton}
            </div>
            
        );
    }
}

//callback of new Data
function getPageElements(selection, number, skip, callback){
    let url = DATA_HOST + '?time=' + selection + '&count=' + number + '&skip=' + skip;
    //console.log(url);
    axios.get(url)
        .then(res => {
            const data = res.data.data;
            if(typeof callback === 'function') callback(data);
        });
        //TODO ERROR HANDLING
}

//TODO: DISABLE BUTTON UNTIL REQUEST RETURN, DISABLE BUTTON IF NO MORE ITEMS, LOADING ANIMATION
function loadNextPage(){
    console.log('LOADING NEXT PAGE');
    getPageElements(this.props.selection, PAGE_SIZE, this.state.data.length, function(data){
        this.setState({data: this.state.data.concat(data)} );
    }.bind(this));
}

export default MemesList;