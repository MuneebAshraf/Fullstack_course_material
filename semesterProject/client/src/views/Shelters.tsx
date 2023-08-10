import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import GET_ALL from "../graphql/queries/GetAll";
import {Shelter} from "../types";


const Shelters = () => {
    const {data: shelterData} = useQuery(GET_ALL.SHELTERS);
    return (
        <section className="shelters">
            <h3>Shelters</h3>
            {shelterData?.shelters.map( (shelter: Shelter) => (
                <Link key={shelter.id} to={`/shelter/${shelter.id}`}>
                    <div>
                        <p>{shelter.name}</p>
                        <p>{shelter.address}</p>
                        <p>{shelter.email}</p>
                    </div>
                </Link>
            ) )}
        </section>
    )
}
export default Shelters;
