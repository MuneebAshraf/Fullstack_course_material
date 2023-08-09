import React from 'react';

const InputName = ({name, setName}: {name:string,  setName: React.Dispatch<React.SetStateAction<string>>}) => {

    return (
        <input type="text" placeholder="Enter your name" value={name} onChange={setName} />
    );
};

export default InputName;
