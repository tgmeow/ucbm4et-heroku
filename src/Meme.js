//Holds one meme

import React, { Component } from 'react';

const wholeDivS = {
    width:'100%',
    clear: 'both',
    backgroundColor: '#f8f8f8',
    border: 'solid 1px #e7e7e7',
    display: 'inline-block',
    marginBottom: '1em'
};

const left = {
    //float: 'left',
    marginTop: '1em',
};

const textblock = {
    margin:'1em 0px 1em'
}

const imgDiv = {
    clear: 'both'
};
const imgSty = {
    marginLeft:'auto',
    marginRight:'auto'
};


class Meme extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let image = '';
        if (this.props.full_picture) {
            image = <img
                className= 'img-responsive'
                style={imgSty}
                src={this.props.full_picture}
                alt={'Meme.'}
            />
        }

        let video = this.props.type === 'video' ? (<strong>You can view this video in Facebook.</strong>) : '';

        let today = new Date();
        let postDT = this.props.created_time.split('.')[0].split('T');
        let postDate = postDT[0].split('-');
        let postTime = postDT[1].split(':');

        //UTC date construction needs a month on 0 based indexing
        let postActualDate = new Date(Date.UTC(postDate[0], postDate[1] - 1, postDate[2], postTime[0], postTime[1], postTime[2]));

        //create a string for the time 
        var stringDiff = '';
        const DIFF_STRING_PRE = '';
        const DIFF_STRING_POST = ' ago on '
        let diffHours = Math.round((today - postActualDate) / 3600000);
        if (diffHours <= 24) stringDiff = diffHours + ' hours'
        else stringDiff = Math.round(diffHours/24) + ' days'
        stringDiff = DIFF_STRING_PRE + stringDiff + DIFF_STRING_POST;

        let link = 'https://www.facebook.com/' + this.props.id;

        return (
            <div className='' style={wholeDivS}>
                <div className='col-xs-1' style={left}>
                    <h4 style={{margin:'0px'}} ><b>{this.props.likes}</b></h4>
                </div>
                <div className="clearfix visible-xs-block"></div>
                <div className='col-sm-11'>
                    <div style={textblock}>
                        <span>
                            <a href={link} rel='noopener noreferrer' target='_blank'>Open in Facebook</a>
                        </span>
                        <p className='lead'>
                            {this.props.message}
                        </p>
                        <span>{stringDiff} {postActualDate.toString().split(' GMT')[0]}</span>
                        <br/>
                        {video}
                    </div>
   
                </div>
                <div style={imgDiv}>
                    {image}
                </div>

            </div>
        );
    }

}

export default Meme;