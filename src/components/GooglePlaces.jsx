import { useRef, useEffect, useState } from "react";




function GooglePlaces() {

    const [address, setAddress] = useState();

    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const options = {
        fields: ["name"],
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
            const place = await autoCompleteRef.current.getPlace();
            setAddress(place.name);
        });
    }, []);


    console.log(address)

    return (
        <div>
            <label>Enter address :</label>
            <input ref={inputRef} value={address} type="text" />
            {address}
        </div>
    );
};

export default GooglePlaces;