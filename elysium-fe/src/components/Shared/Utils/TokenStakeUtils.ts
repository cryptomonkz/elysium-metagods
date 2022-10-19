import {EditOperation} from "../State/GreatHall/EditState";
import {StakeGod} from "../Models/Staking/StakeGod";
import {getStakeTypeForArea} from "../State/GreatHall/AreaType";
import {findOperationsByType, getPairedAreaToken, isPairedAreaOperation} from "../State/GreatHall/EditService";
import {StakePairing} from "../Models/Staking/StakePairing";
import {ItemType} from "../State/GreatHall/ItemType";

export const buildStakedGods = (operations: EditOperation[] = []): StakeGod[] => findOperationsByType(operations, ItemType.GOD)
    .map(operation => new StakeGod(operation.token.tokenId, getStakeTypeForArea(operation.destination.area)))

export const buildWeaponsPairings = (operations: EditOperation[] = []): StakePairing[] => findOperationsByType(operations, ItemType.WEAPON)
    .filter(operation => isPairedAreaOperation(operation))
    .map(operation => new StakePairing(getPairedAreaToken(operation).tokenId, operation.token.tokenId))