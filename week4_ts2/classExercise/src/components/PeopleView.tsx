import React, {useState} from 'react';
import PropTypes from 'prop-types';

const PeopleView = ({}) => {
    const [people, setPeople] = useState()

    fetch(" http://localhost:3008/person")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))


    return (
        <div>

        </div>
    );
};

PeopleView.propTypes = {

};

export default PeopleView;
