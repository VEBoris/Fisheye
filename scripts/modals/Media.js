class Media{
    constructor(data){
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
    }

    get id(){
        return this._id
    }
    get photographerId(){
        return this._photographerId
    }
    get title() {
        return this._title
    }
    get likes(){
        return this._likes
    }
    get date(){
        return this._date
    }
    get price(){
        return this._price
    }
}

class Picture extends Media{
    constructor(data){
        super(data)
        this._type = 'img'
        this._image = data.image
        this._imagepath = `./assets/photographers/thumbnails/${this._image}`
    }
    get type(){
        return this._type
    }
    get image(){
        return this._image
    }
    get path(){
        return this._imagepath
    }
}
class Video extends Media{
    constructor(data){
        super(data)
        this._type = 'video'
        this._video = data.video
        this._videopath = `./assets/photographers/thumbnails/${this._video}`
    }
    get type(){
        return this._type
    }
    get video(){
        return this._video
    }
    get path(){
        return this._videopath
    }
} 