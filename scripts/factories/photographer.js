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