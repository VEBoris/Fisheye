function photographerFactory(data) {
    const photographer = new Photographer(data);
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute('href', './photographer.html?id='+ photographer.id);
        link.classList.add('link');
        const img = document.createElement( 'img' );
        img.setAttribute('src', photographer.portrait);
        img.setAttribute('alt', photographer.name);
        const h2 = document.createElement( 'h2' );
        h2.classList.add('name');
        h2.textContent = photographer.name;
        const ville = document.createElement('div');
        ville.classList.add('city');
        ville.textContent = photographer.city + ', ' + photographer.country;
        const region = document.createElement('div');
        const slogan = document.createElement('div');
        slogan.classList.add('tagline');
        slogan.textContent = photographer.tagline;
        const photographerPrice = document.createElement('div');
        photographerPrice.classList.add('price');
        photographerPrice.textContent = photographer.price + '€/Jour';
        link.appendChild(img);
        link.appendChild(h2);
        article.append(link);
        article.appendChild(ville);
        article.appendChild(region);
        article.appendChild(slogan);
        article.appendChild(photographerPrice);
        return (article);
    }
    function user(){
        const header = document.querySelector('.photograph-header');
        const btn = document.querySelector('.contact_button');
        const headerContent = document.createElement('div');
        const priceCard = document.createElement('div');
        const modal = document.querySelector('.modal-header');
        const modalH3 = document.querySelector('h3');
        modalH3.textContent = photographer.name;
        modal.appendChild(modalH3);
        priceCard.classList.add('price-block');
        const prix = document.createElement('div');
        prix.classList.add('photograph-price');
        prix.textContent = photographer.price + '€/Jour';
        const totLikes = document.createElement('div');
        totLikes.classList.add('photograph-likes');
        priceCard.append(totLikes, prix);
        headerContent.classList.add('header-content');
        const h1 = document.createElement('h1');
        const slogan = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('alt', photographer.name);
        img.setAttribute('src', photographer.portrait);
        slogan.classList.add('tagline');
        slogan.textContent = photographer.tagline;
        const bio = document.createElement('div');
        bio.classList.add('photographer-label');
        h1.classList.add('h1');
        const country = document.createElement('div');
        country.classList.add('country');
        country.textContent = photographer.city + ', ' + photographer.country;
        h1.setAttribute('aria-label', photographer.name);
        h1.textContent = photographer.name;
        bio.append(h1);
        bio.append(country);
        bio.append(slogan);
        headerContent.append(priceCard);
        headerContent.appendChild(bio);
        headerContent.append(img);
        headerContent.append(btn);
        header.appendChild(headerContent);
        return (headerContent);
    }

    return { getUserCardDOM, user };
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