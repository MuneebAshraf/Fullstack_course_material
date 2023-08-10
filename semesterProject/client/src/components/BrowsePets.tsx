import {Pet} from "../types";
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import GET_ALL from "../graphql/queries/GetAll";

const BrowsePets = () => {
    const {data: PetsData} = useQuery(GET_ALL.PETS);

    return (
        <section className="browse-pets">
            <h3 className={'browse-pets-title'}>Browse Pets</h3>
            {PetsData?.pets.map((pet: Pet) => (
                <div key={pet.id}>
                    <Link to={`/pet/${pet.id}`}>
                        <p>Name: {pet.name}</p>
                    </Link>
                    <p>Species: {pet.species}</p>
                    <p><Link to={`/shelter/${pet.shelter.id}`}>{pet.shelter.name}</Link></p>

                </div>
            ))}
        </section>
    );
}

export default BrowsePets;
