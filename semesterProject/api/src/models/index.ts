import User, {IUser} from './User';
import Pet, {IPet} from './Pet';
import AdoptionRequest, {IAdoptionRequest} from './AdoptionRequest';
import Shelter, {IShelter} from './Shelter';

const models = {
    User,
    Pet,
    AdoptionRequest,
    Shelter
};

export interface IModels extends IUser, IPet, IAdoptionRequest, IShelter{
}

export default models;

