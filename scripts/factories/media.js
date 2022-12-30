class MediaFactory {
    constructor(data, type) {
        if (type === 'img') {
            return new Picture(data);
        } else if (type === 'video') {
            return new Video(data);
        } else {
            throw 'Unknown type format';
        }
    }
}

function mediasFactory(data){
    const media = new Media(data);
    const lightbox = new Lightbox(data);
    const body = document.querySelector('.photograph-body');
    const figure = document.createElement('div');
    figure.classList.add('card');
    const a = document.createElement('a');
    a.classList.add('media-link');
    const caption = document.createElement('div');
    caption.classList.add('caption');
    const p = document.createElement('p');
    const likes = document.createElement('p');
    likes.classList.add('counter');
    likes.textContent = media._likes;
    const i = document.createElement('i');
    likes.setAttribute('aria-label', 'likes');
    i.classList.add('fa-regular', 'fa-heart');
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.append(likes);
    heart.append(i);
    const totLikes = document.querySelector('.photograph-likes');
    const icon = document.createElement('i');
    icon.classList.add('tot-likes-icon' ,'fa-solid', 'fa-heart');
    
    function increment(){
        likes.textContent++;
        totLikes.textContent++;
        totLikes.append(icon);
        i.classList.remove('fa-regular', 'fa-heart');
        i.classList.add('fa-solid', 'fa-heart');
    }
    function decrement(){
        likes.textContent--;
        totLikes.textContent--;
        totLikes.append(icon);
        i.classList.remove('fa-solid', 'fa-heart');
        i.classList.add('fa-regular', 'fa-heart');
    }
    i.addEventListener('click', function(e){
        e.preventDefault();
        if (i.className == 'fa-regular fa-heart'){
            return increment();
            
        }
        else{
            return decrement();
        }
    });

    function imgTemplate() {
        const picture = new MediaFactory(data, 'img');
        const img = document.createElement('img');
        p.textContent = picture._title;
        img.setAttribute('tabindex', '0');
        caption.append(p);
        caption.append(heart);
        img.classList.add('thumbnail');
        img.setAttribute('src', picture._imagepath);
        img.setAttribute('alt', picture._title);
        a.addEventListener('click', function(e){
            e.preventDefault();
            lightbox.createImgLightbox();
        });
        a.appendChild(img);      
        figure.append(a);
        figure.append(caption);
        body.append(figure);
        return figure;
    }
    function videoTemplate() {
        const vid = new MediaFactory(data, 'video');
        const video = document.createElement('video');
        const source = document.createElement('source');
        video.setAttribute('tabindex', '0');
        source.setAttribute('src', vid._videopath);
        source.setAttribute('type', 'video/mp4');
        video.classList.add('thumbnail');
        video.appendChild(source);
        p.textContent = vid._title;
        caption.append(p);
        caption.append(heart);
        a.setAttribute('href', vid._videopath);
        a.setAttribute('aria-label', 'link');
        a.addEventListener('click', function(e){
            e.preventDefault();
            lightbox.createVidLightbox();
        });
        a.appendChild(video);
        figure.append(a);
        figure.append(caption);
        body.append(figure);
        return figure;
    }
    return { imgTemplate, videoTemplate };
}