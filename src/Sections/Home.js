import React from 'react';
import Product from './Product';

import './styles/Home.css';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const SlidShow = () => {
    const slideImages = [
        { url: '/images/hommy.jpg' },
        { url: '/images/hommy2.jpg' },
        { url: '/images/hommy5.jpg' },
        { url: '/images/hommy4.jpg' },
        { url: '/images/Home.jpg' },
    ];

    return (
        <Slide>
            {slideImages.map((slideImage, index) => (
                <div className="each-slide" key={index}>
                    <img
                        className="home__image"
                        src={slideImage.url}
                        alt={'slide-${index}'}
                        loading="lazy"
                    />
                </div>
            ))}
        </Slide>
    );
};

function Home() {
    return (
        <div className="home">
            <div className="slide-container">
                <SlidShow />
            </div>

            <div className="home__container">
                <div className="home__row">
                    <Product
                        id={1}
                        title="Samsung 34-inch (86.42cm) Odyssey G5 Ultra WQHD 3440 x 1440 Resolution 1000R Curved VA Gaming Monitor"
                        price={11333}
                        rating={5}
                        imgUrl="samsung.jpg"
                    />
                    <Product
                        id={2}
                        title="Acer ALG Intel Core i5-13th Gen 13420H Processor, NVIDIA GeForce RTX 3050-6GB DDR6(16 GB RAM/512GB SSD) FHD, 15.6"
                        price={63999}
                        rating={4}
                        imgUrl="acer.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id={3}
                        title="BLACKBERRYS Formal Navy Textured Blazer"
                        price={9999}
                        rating={4}
                        imgUrl="blazer2.jpg"
                    />
                    <Product
                        id={4}
                        title="Navy Blue Textured Hooded Sweatshirt"
                        price={1800}
                        rating={4}
                        imgUrl="mypiccy2.jpg"
                    />
                    <Product
                        id={5}
                        title="SNITCH Red Overshirt Cotton Slim Fit Shirt"
                        price={1500}
                        rating={4}
                        imgUrl="snitch2.jpg"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id={6}
                        title="Sony New SA-D40M2 4.1ch Home Theatre Speaker with 100W Power-Black"
                        price={9489}
                        rating={5}
                        imgUrl="sony.jpg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;
