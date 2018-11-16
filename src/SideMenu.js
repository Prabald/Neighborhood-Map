import React,{Component} from 'react'



class SideMenu extends Component{
    
    
   render(){
       
      
       return(<div style={this.props.style}>
              <input tabindex='1' placeholder='Filter Results' onChange={(event)=>this.props.filterPlaces(event.target.value)} style={{width:'80%' ,margin:'5%'}}></input>
              <ul>
              {
                this.props.places.map((place,id)=>(
                <li tabindex={id+2} onClick={(event)=>this.props.animateMarker(event.target.id)} key={place.referralId} id={place.referralId}> 
                {place.venue.name}
                </li>
                ))}
              </ul>
              </div>);
       
       
   
       
}
    
}


export default SideMenu;