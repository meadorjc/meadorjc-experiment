<template>
  <div class="about">
    <h1>Map Testing</h1>
    <p>This will attempt to map customer addresses</p>
  <label>
    <!-- <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete> -->
    <button @click="addLocationMarker">Add</button>
  </label>
  <br/>
  <gmap-map
    :zoom="5"
    :center="center"
    style="width:100%; height: 600px;"
    >
  <gmap-marker
    :key="index"
    v-for="(m, index) in locationMarkers"
    :position="m.position"
    @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import { server } from "../helper";
import axios from "axios";

export default {
  name: "AddGoogleMap",
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      customers: [],
      service: null,
      map: null
    };
  },

  mounted() {
    this.locateGeoLocation();
  },
  created() {
    this.fetchCustomers();
  },
  computed: {
    google: gmapApi
  },
  methods: {
    fetchCustomers() {
      axios
        .get(`${server.baseURL}/customer/customers`)
        .then(data => (this.customers = data.data));
    },
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      let locs = [];

      if (this.customers) {

       this.map = new this.google.maps.Map(document.getElementsByClassName('vue-map'), {center: this.center, zoom: 7 });

       this.service = new this.google.maps.places.PlacesService(this.map);

       for (var i = 0; i < this.customers.length; i++){
         let request = { 
           query: this.customers[i].address,
           fields: ['name', 'geometry']
         };
         
         this.service.findPlaceFromQuery(request, function(results, status){
              console.log("status: " + status);
              if (status === "OK"){ //this.google.maps.PlacesServiceStatus.OK
                for (var i = 0; i < results.length; i++) {
                   locs.push( { position : { lat: results[i].geometry.location.lat(), lng: results[i].geometry.location.lng()} } );
                }
              }
         });
       }
       this.locationMarkers = locs;
      } 
    },
    
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
    lat: res.coords.latitude,
    lng: res.coords.longitude
        };
      });
   } 
  } 
};
</script>
