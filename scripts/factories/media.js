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
    function imgTemplate() {
        const picture = new MediaFactory(data, 'img');
        const body = document.querySelector('.photograph-body');
        const figure = document.createElement('div');
        const a = document.createElement('a');
        figure.classList.add('card');
        const img = document.createElement('img');
        const caption = document.createElement('div');

        caption.classList.add('caption');
        const p = document.createElement('p');
        p.textContent = picture._title;
        const likes = document.createElement('p');
        likes.textContent = picture._likes;
        const heart = document.createElement('span');
        const i = document.createElement('i');
        i.classList.add('fa-regular');
        i.classList.add('fa-heart');
        heart.append(likes);
        heart.append(i);
        caption.append(p);
        caption.append(heart);
        img.classList.add('thumbnail');
        img.setAttribute("src", picture._imagepath);
        img.setAttribute("alt", picture._title);
        figure.append(img);
        figure.append(caption);
        body.append(figure);
        return(figure);
    }

    function videoTemplate() {
        const vid = new MediaFactory(data, 'video');
        const body = document.querySelector('.photograph-body');
        const figure = document.createElement('div');
        const a = document.createElement('a');
        figure.classList.add('card');
        const caption = document.createElement('div');
        const video = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute("src", vid._videopath);
        source.setAttribute("type", "video/mp4");
        video.classList.add('thumbnail');
        video.controls = true;
        video.appendChild(source);
        caption.classList.add('caption');
        const p = document.createElement('p');
        p.textContent = vid._title;
        const likes = document.createElement('p');
        likes.textContent = vid._likes;
        const heart = document.createElement('span');
        const i = document.createElement('i');
        i.classList.add('fa-regular');
        i.classList.add('fa-heart');
        heart.append(likes);
        heart.append(i);
        caption.append(p);
        caption.append(heart);
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