class MediaFactory {
    constructor(data, type) {
        if (type === 'img') {
            return new Picture(data)
        } else if (type === 'video') {
            return new Video(data)
        } else {
            throw 'Unknown type format'
        }
    }
 }

 function mediasFactory(data){
    const media = new Media(data);
    const body = document.querySelector('.photograph-body');
    const figure = document.createElement('div');
    figure.classList.add('card');
    const a = document.createElement('a');
    const caption = document.createElement('div');
    caption.classList.add('caption');
    const p = document.createElement('p');
    const likes = document.createElement('p');
    likes.textContent = media._likes;
    const i = document.createElement('i');
    i.classList.add('fa-regular', 'fa-heart');
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.append(likes);
    heart.append(i);

    function increment(){
        likes.textContent++;
        i.classList.remove('fa-regular', 'fa-heart');
        i.classList.add('fa-solid', 'fa-heart');
    }
    function decrement(){
        likes.textContent--;
        i.classList.remove('fa-solid', 'fa-heart');
        i.classList.add('fa-regular', 'fa-heart');
    }

    i.addEventListener('click', function(e){
        e.preventDefault();
        console.log(i.className);
        if (i.className == "fa-regular fa-heart"){
            return increment();
        }
        if(i.className == "fa-solid fa-heart"){
            return decrement();
        }
    });

    function imgTemplate() {
        const picture = new MediaFactory(data, 'img');
        const img = document.createElement('img');
        p.textContent = picture._title;
        caption.append(p);
        caption.append(heart);
        img.classList.add('thumbnail');
        img.setAttribute("src", picture._imagepath);
        img.setAttribute("alt", picture._title);
        a.classList.add('media-link');
        a.setAttribute("href", picture._imagepath);
        a.appendChild(img);  
        figure.append(img);
        figure.append(caption);
        body.append(figure);
        return(figure);
    }

    function videoTemplate() {
        const vid = new MediaFactory(data, 'video');
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute("src", vid._videopath);
        source.setAttribute("type", "video/mp4");
        video.classList.add('thumbnail');
        video.controls = true;
        video.appendChild(source);
        p.textContent = vid._title;
        caption.append(p);
        caption.append(heart);
        a.classList.add('media-link');
        a.setAttribute("href", vid._videopath);
        a.setAttribute("aria-label", "link");
        a.appendChild(video);
        figure.append(a);
        figure.append(caption);
        body.append(figure);
        return(figure);
    }
return { imgTemplate, videoTemplate }
}