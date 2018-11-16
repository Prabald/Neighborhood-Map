import React, {Component} from 'react';
import {Map,InfoWindow, Marker,  GoogleApiWrapper} from 'google-maps-react';
import SideMenu from './SideMenu.js'
import axios from 'axios';

class MapContainer extends Component{
   
    state={
        places:[],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        styleList: {
                    width:'25%',
                    height:'100vh',
                    backgroundColor:'grey',
                    float:'left',
                    zIndex:'10',
                    color:'white',
                    position:'absolute',
                    overflowY:'scroll'
                    },
        filteredPlaces:[],
        animatedKey:''
    };
        changeFilteredPlaces=(newFiltered)=>{
            
            this.setState({filteredPlaces:newFiltered});
            
            
            
        }
     filterPlaces=(item)=>{
         console.log(item);
         let x=this.state.places.filter(place => place.venue.name.includes(item));
         console.log(x);
         console.log(this.state.filteredPlaces);
         
         this.changeFilteredPlaces(x);
        
         
     }
    
    /*To fetch the list of places using FourSquare API*/
    GetPlaces = () => {

  const endPoint = "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id : "JYCYQ21FCUIY0D5QSCRVXJF2KEUYL1PVUMBZL2VBUIVMTNRD",
    client_secret : "UMO42ZAAEI25U5YZJIP2A2VNY5ZSHLYSKX4DZ5JYUHLZK1MM",
    near : "Dehradun",
    v: "20182507"
  }
  return(axios.get(endPoint + new URLSearchParams(parameters))
  .then( (response,Temp) => {
      console.log(response);
    this.setState({places:response.data.response.groups[0].items,filteredPlaces:response.data.response.groups[0].items });
   })

  );
  }
   MarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  MapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  findMarker=(name)=>{
      return document.getElementById(name+'z');
  }
  animateMarker=(key)=>{
      console.log(key);
     
      this.setState({animateKey:key})
      
  }
componentDidMount(){
    this.GetPlaces();
    
  }
    render(){
    const mapStyle={height:'100%',width:'75%',marginLeft:'25%',marginRight:'0',position:'relative',zIndex:'9'};
    
    return(
    <div className='container'>
     <SideMenu animateMarker={this.animateMarker} filterPlaces={this.filterPlaces} places={this.state.filteredPlaces} style={this.state.styleList}/>
     
     <Map  style ={mapStyle} google={this.props.google} onClick={this.MapClick} initialCenter = {{ lat: 30.3165,lng: 78.0322 }} >
        
    { 
        this.state.filteredPlaces.map((place)=>
        <Marker onClick={this.MarkerClick} 
             key={place.referralId}
              
              position = {{ lat: place.venue.location.lat, lng: place.venue.location.lng }}
              title={place.venue.name} 
              animation={(this.state.animateKey===place.referralId)?4:null} />
 )
        
    }
    {
                <InfoWindow
                marker={this.state.activeMarker}
                 visible={this.state.showingInfoWindow}>
                  <React.Fragment><div>
                    <h2>{this.state.selectedPlace.title}</h2>
                  </div>
                  </React.Fragment>
              </InfoWindow> 
          }
        </Map>
     
     </div>
    
    
    );
    
    }
    
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyB-GYp9y4YPOTrPGnPiUHpWMJWvJYst6A0")
})(MapContainer)