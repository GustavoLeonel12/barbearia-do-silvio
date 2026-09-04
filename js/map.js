export function initMapStyles() {
  window.initMap = function() {
    try {
      const coords = { lat: -23.5045, lng: -46.8625 }; // Endereço Av. Batatais, 263 - Barueri
      
      const darkPremiumTheme = [
        { elementType: "geometry", stylers: [{ color: "#212121" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
        { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
        { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
        { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
        { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
        { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
        { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
        { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
        { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
        { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] }
      ];

      const mapOptions = {
        center: coords,
        zoom: 16,
        styles: darkPremiumTheme,
        disableDefaultUI: true,
        zoomControl: true,
      };

      const mapElement = document.getElementById('map');
      
      if (!mapElement) return;

      const map = new google.maps.Map(mapElement, mapOptions);

      // Custom Marker Elegante
      new google.maps.Marker({
        position: coords,
        map: map,
        title: "Barbearia do Sílvio",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#D4AF37", // Gold
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: "#FFFFFF"
        }
      });

    } catch (e) {
      console.warn('Erro ao inicializar Google Maps. Mantendo o mapa estático como fallback:', e);
    }
  };
}
