import React from 'react';

const ViewName = ( { name } : { name: string }) => {

    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
};

export default ViewName;
