import React, { useState } from "react";
import { Picker } from "react-gmap-picker";

const INITIAL_LOCATION = { lat: 35.6892, lng: 51.389 };

function App() {
  const [location, setLocation] = useState(INITIAL_LOCATION);

  const handleChangeLocation = (lat, lng) => {
    setLocation({ lat, lng });
    console.log("مختصات جدید:", { lat, lng });
  };

  return (
    <div>
      <Picker
        defaultLocation={INITIAL_LOCATION}
        zoom={10}
        apiKey="YOUR_API_KEY_HERE"
        onChangeLocation={handleChangeLocation}
        style={{ height: "500px" }}
      />
      <p>عرض جغرافیایی: {location.lat}</p>
      <p>طول جغرافیایی: {location.lng}</p>
    </div>
  );
}

export default App;
