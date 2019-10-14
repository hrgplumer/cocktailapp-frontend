import { Injectable } from "@angular/core";

@Injectable()
export class UtilitiesService {
    joinList<T>(list: Array<T>, char: string, mapper): string {
        return list.map(mapper).join(char);
    }
}