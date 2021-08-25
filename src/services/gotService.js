export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

   getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if ( !res.ok ) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    };

    getAllCharacters = async () => {
        const result = await this.getResource('/characters?page=15&pageSize=10');
        return result.map((char) => this._transformCharacter(char));
    }

   getCharacter = async(id) => {
      const character = await this.getResource(`/characters/${id}`);
      return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const result = await this.getResource('/houses/');
        return result.map((house) => this._transformHouse(house));
    }

    getHouse = async(id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map((book) => this._transformBook(book));
    }

    getBook = async (id) => {
        const book = await this.getResource(`/book/${id}`);
        return this._transformBook(book);
    }

    isSet = (data) => {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }

    _extractId(item){
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }



    _transformCharacter(char) {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse(house){
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestraWeapons: this.isSet(house.ancestraWeapons)
        }
    }

    _transformBook(book){
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}

// const got = new GotService();
// got.getAllCharacters()
//     .then(res => {
//         res.forEach( item => console.log(item.name));
//     });
//
// got.getCharacter(130)
//     .then(res => console.log(res));

//const got = new GotService();
