import {Pet} from "../types";
import {Link} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import GET_ALL from "../graphql/queries/GetAll";
import {useCurrentUser} from "../contexts/UserContext";
import DELETE from "../graphql/mutations/Delete";

const BrowsePets = () => {
    const {data: PetsData} = useQuery(GET_ALL.PETS);
    const currentUser = useCurrentUser();
    const [deletePet] = useMutation(DELETE.PET, );

    //delete pet mutation
    const handleDeletePet = async (petId: string) => {
        //call grapql delete mutation DELETE
        try {
             await deletePet({
                variables: {id: petId},
                 refetchQueries: [{query: GET_ALL.PETS}],
            });
        } catch (err: any) {
            console.error("Error deleting the pet:", err.message);
        }
    }

    return (
        <section className="browse-pets">
            <h3 className={'browse-pets-title'}>Browse Pets</h3>
            {PetsData?.pets.map((pet: Pet) => (
                pet.shelter && <div key={pet.id}>
                    <Link to={`/pet/${pet.id}`}>
                        <p>Name: {pet.name}</p>
                    </Link>
                    <p>Species: {pet.species}</p>
                    <p><Link to={`/shelter/${pet.shelter.id}`}>{pet.shelter.name}</Link></p>

                    {currentUser?.isAdmin &&
                        <button className={'btn-delete'} onClick={() => {handleDeletePet(pet.id)}}>Delete</button>}
                </div>
            ))}
        </section>
    );
}

export default BrowsePets;
