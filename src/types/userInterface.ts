export type Igeo = {
    lat: string;
    lng : string;
}

export type Iaddress = {
    street : string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Igeo
}

export type Icompany = {
    name : string;
    catchPhrase : string;
    bs : string;
}

export type Iuser = {
    id : number;
    name : string;
    username : string | null;
    email : string | null;
    address : Iaddress | null;
    phone : string | null;
    website : string | null;
    company : Icompany | null;
}