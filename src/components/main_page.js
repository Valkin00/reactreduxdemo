import React, { Component } from 'react';
import { Map, Marker, Icon } from '2gis-maps-react';
import { connect } from 'react-redux';
import * as actions from '../actions';

 class MainPage extends Component {

    placeMarker(e){
        this.props.addMarker(e.latlng);
    }
    removeMarker(e)
    {
        this.props.removeMarker(e.latlng);
    }

    renderMarkers(){
        var key = 0;
        return this.props.markers.map(marker => {
            
            return(
                <Marker onclick={this.removeMarker.bind(this)} pos={[marker.lat, marker.lng]} key = {key++}/>
            );
        });
    }

    saveMarkers(){
        const { markers, userId } = this.props;

        this.props.saveMarkers(markers, userId);
    }


    renderMessage(){
        if(this.props.message){
            return (
                <div className='alert alert-warning message'>
                    {this.props.message}
                </div>
            );
        }

    }




    render(){
        const markers = this.props.markers;
        return(
            
                <div className='container'>
                    <div className='map'>
                        <Map onclick={this.placeMarker.bind(this)} id='map' style={{width: "100%", height: "500px"}}
                            center={[46.386133, 30.724397]}
                            zoom={15}>
                            {!markers? '' : this.renderMarkers.bind(this)()}                    
                        </Map>
                    </div>
                    <button onClick={this.saveMarkers.bind(this)} className='btn btn-primary save'>Save markers</button>
                    {this.renderMessage()}
                </div>
                
            
        );
    }
}

function mapStateToProps(state){
    return {
        userId: state.auth.userId,
        markers: state.auth.markers,
        message: state.auth.message
    }
}


export default connect(mapStateToProps, actions)(MainPage);