import {Link} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import GET_ALL from "../graphql/queries/GetAll";
import {Shelter} from "../types";
import DELETE from "../graphql/mutations/Delete";


const Shelters = () => {
    const {data: shelterData} = useQuery(GET_ALL.SHELTERS);
    const [deleteShelter] = useMutation(DELETE.SHELTER, {
        fetchPolicy: 'no-cache',
    })

    async function handleDeleteShelter(id: string) {
        try {
            await deleteShelter({
                variables: {id: id}
            });
        } catch (err: any) {
            console.error("Error deleting the adoption request:", err.message);
        }
    }

    return (
        <section className="shelters">
            <h3>Shelters</h3>
            {shelterData?.shelters.map( (shelter: Shelter) => (
                <Link key={shelter.id} to={`/shelter/${shelter.id}`}>
                    <div>
                        <p>{shelter.name}</p>
                        <p>{shelter.address}</p>
                        <p>{shelter.email}</p>
                        <button className={'btn-delete'} onClick={() => {handleDeleteShelter(shelter.id)}}>Delete</button>
                    </div>
                </Link>
            ) )}
        </section>
    )
}
export default Shelters;
