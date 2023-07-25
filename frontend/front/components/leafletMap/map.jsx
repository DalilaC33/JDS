import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./mapContainer'), {
  ssr: false
});

export default Map;