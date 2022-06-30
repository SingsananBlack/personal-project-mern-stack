import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "../css/sellHomePage.css";
// Components
import LoadingPage from "./loading/loading.Page";
import HomePageCard from './productCard/homePageCard'
// Function
import { productOrderBy } from '../functions/product.Function'

const BestSeller = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  
  /* Load data from server */  
  useEffect(()=>{
    const loadData = () => {
      setLoading(true)
      productOrderBy(10,'sold','desc')
      .then(res=>{
        setProducts(res.data);
        setLoading(false)
      })
      .catch(err=>{
        console.log(err);
        setLoading(false)
      })
    }
    loadData()
  },[])
  /* End of load data from server */

  return (
    <>
      <div className="best-selling" id="best-selling">
        <h1 className="heading">
          <span>Best Seller</span>
        </h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            430: {
              width: 430,
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              width: 768,
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              width: 1024,
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              width: 1440,
              slidesPerView: 4,
              spaceBetween: 30,
            },
            2560: {
              width: 2560,
              slidesPerView: 6,
              spaceBetween: 40,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="best-slider"
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LoadingPage loading={loading} />
            </div>
          ) : (
            <div className="wrapper">
              {products.map((values, index) => {
                return (
                  <SwiperSlide className="box" key={values._id}>
                    <HomePageCard products={values} />
                  </SwiperSlide>
                );
              })}
            </div>
          )}
        </Swiper>
      </div>
    </>
  );
}

export default BestSeller